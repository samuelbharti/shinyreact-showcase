// The history the client keeps, because the server does not.
//
// The whole claim rests on this: the server pushes one reading and the client
// appends it. Nothing re-sends the series, so the buffer here is the only
// copy of it.

export type Reading = { tick: number; values: number[] };

/**
 * A fixed size window over the stream.
 *
 * Arrays rather than a typed ring buffer, because uPlot wants a plain array
 * per series and the alternative is copying out of the ring on every frame.
 * Dropping the oldest point with shift() is cheap at these sizes.
 */
export class History {
  readonly ticks: number[] = [];
  readonly series: number[][];

  constructor(
    private readonly channelCount: number,
    private capacity: number,
  ) {
    this.series = Array.from({ length: channelCount }, () => []);
  }

  get length(): number {
    return this.ticks.length;
  }

  push(reading: Reading): void {
    // A reading with the wrong channel count means the server and the client
    // disagree about the panel. Dropping it keeps the chart honest rather
    // than padding a series with undefined.
    if (reading.values.length !== this.channelCount) return;

    this.ticks.push(reading.tick);
    for (let i = 0; i < this.channelCount; i += 1) {
      this.series[i]!.push(reading.values[i]!);
    }
    this.trim();
  }

  /** Change the window without losing what is already inside it. */
  resize(capacity: number): void {
    this.capacity = Math.max(1, capacity);
    this.trim();
  }

  clear(): void {
    this.ticks.length = 0;
    for (const values of this.series) values.length = 0;
  }

  /** What uPlot wants for one channel: the x values, then that channel's y. */
  dataFor(channel: number): [number[], number[]] {
    return [this.ticks, this.series[channel] ?? []];
  }

  private trim(): void {
    const excess = this.ticks.length - this.capacity;
    if (excess <= 0) return;
    this.ticks.splice(0, excess);
    for (const values of this.series) values.splice(0, excess);
  }
}
