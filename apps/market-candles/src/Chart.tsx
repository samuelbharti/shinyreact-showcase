import {
  CandlestickSeries,
  createChart,
  HistogramSeries,
  type IChartApi,
  type ISeriesApi,
  type Time,
} from "lightweight-charts";
import { useEffect, useRef } from "react";

import { indexAt, toCandles, toVolume, type Bars } from "@/series";

type ChartProps = {
  bars: Bars;
  /** Called when the visible range changes, with bar indices. */
  onRange: (first: number, last: number) => void;
  /** Called on every crosshair move, with a bar index or null. */
  onHover: (index: number | null) => void;
};

/**
 * lightweight-charts, holding the whole series.
 *
 * The chart is given every bar once. Panning, zooming and the crosshair are
 * then its own work over data it already has, which is why none of them
 * reach the server. React tells it what series to hold; it decides what to
 * draw.
 */
export default function Chart({ bars, onRange, onHover }: ChartProps) {
  const hostRef = useRef<HTMLDivElement | null>(null);
  const chartRef = useRef<IChartApi | null>(null);
  const candlesRef = useRef<ISeriesApi<"Candlestick"> | null>(null);
  const volumeRef = useRef<ISeriesApi<"Histogram"> | null>(null);
  const live = useRef({ onRange, onHover, bars });
  live.current = { onRange, onHover, bars };

  // Built once. Rebuilding on a data change would reset the viewport, which
  // is the thing the reader is holding on to.
  useEffect(() => {
    const host = hostRef.current;
    if (!host) return;

    const chart = createChart(host, {
      layout: {
        background: { color: "#ffffff" },
        textColor: "#5c6370",
        fontSize: 11,
      },
      grid: {
        vertLines: { color: "#eef0f3" },
        horzLines: { color: "#eef0f3" },
      },
      rightPriceScale: { borderColor: "#e3e6ea" },
      timeScale: { borderColor: "#e3e6ea", timeVisible: true, secondsVisible: false },
      crosshair: { mode: 1 },
      autoSize: true,
    });
    chartRef.current = chart;

    candlesRef.current = chart.addSeries(CandlestickSeries, {
      upColor: "#26a69a",
      downColor: "#ef5350",
      borderVisible: false,
      wickUpColor: "#26a69a",
      wickDownColor: "#ef5350",
    });

    volumeRef.current = chart.addSeries(HistogramSeries, {
      priceFormat: { type: "volume" },
      priceScaleId: "volume",
    });
    chart.priceScale("volume").applyOptions({
      scaleMargins: { top: 0.82, bottom: 0 },
    });

    chart.timeScale().subscribeVisibleTimeRangeChange((range) => {
      if (!range) return;
      const current = live.current.bars;
      live.current.onRange(
        indexAt(current, Number(range.from)),
        indexAt(current, Number(range.to)),
      );
    });

    chart.subscribeCrosshairMove((param) => {
      if (param.time === undefined) {
        live.current.onHover(null);
        return;
      }
      live.current.onHover(indexAt(live.current.bars, Number(param.time)));
    });

    return () => {
      chart.remove();
      chartRef.current = null;
      candlesRef.current = null;
      volumeRef.current = null;
    };
  }, []);

  // New symbol: hand over the whole series and fit the view to the last
  // session, which is where a reader starts.
  useEffect(() => {
    const chart = chartRef.current;
    const candles = candlesRef.current;
    const volume = volumeRef.current;
    if (!chart || !candles || !volume) return;

    candles.setData(toCandles(bars) as never);
    volume.setData(toVolume(bars) as never);

    const total = bars.time.length;
    const from = Math.max(0, total - 390);
    chart.timeScale().setVisibleRange({
      from: bars.time[from] as Time,
      to: bars.time[total - 1] as Time,
    });
  }, [bars]);

  return <div className="chart" ref={hostRef} />;
}
