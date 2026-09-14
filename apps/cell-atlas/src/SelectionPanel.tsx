export type Composition = {
  name: string;
  color: string;
  n: number;
  share: number;
};

export type Marker = {
  gene: string;
  mean: number;
  rest: number;
  lfc: number;
};

export type Summary = {
  n: number;
  composition: Composition[];
  markers: Marker[];
};

type PanelProps = {
  summary: Summary | undefined;
  /** True while the server is recomputing a selection already on screen. */
  recalculating: boolean;
  error: string | null;
};

/**
 * What the server made of the lasso.
 *
 * The client knows which cells were caught the instant the lasso closes.
 * Everything here needs the expression matrix, which only the server holds,
 * so this panel is the half of the app that does cross the wire.
 */
export default function SelectionPanel({ summary, recalculating, error }: PanelProps) {
  if (error) {
    return (
      <aside className="panel">
        <h2>Selection</h2>
        <p className="shiny-output-error">{error}</p>
      </aside>
    );
  }

  if (!summary || summary.n === 0) {
    return (
      <aside className="panel">
        <h2>Selection</h2>
        <p className="hint">
          Hold <kbd>Shift</kbd> and drag to lasso a group of cells, or use the
          handle at the bottom left of the plot. Double click to clear.
        </p>
        <p className="hint">
          Panning and zooming never reach the server. Only a lasso and a change
          of gene do, which is what the round trip counter shows.
        </p>
      </aside>
    );
  }

  return (
    <aside className={recalculating ? "panel recalculating" : "panel"}>
      <h2>Selection</h2>
      <p className="count">
        <strong>{summary.n.toLocaleString()}</strong> cells
      </p>

      <h3>Cluster composition</h3>
      <ul className="composition">
        {summary.composition.map((row) => (
          <li key={row.name}>
            <span className="swatch" style={{ background: row.color }} />
            <span className="label">{row.name}</span>
            <span className="value">{(row.share * 100).toFixed(1)}%</span>
          </li>
        ))}
      </ul>

      <h3>Marker genes</h3>
      <table className="markers">
        <thead>
          <tr>
            <th>Gene</th>
            <th>In</th>
            <th>Out</th>
            <th>log2FC</th>
          </tr>
        </thead>
        <tbody>
          {summary.markers.map((row) => (
            <tr key={row.gene}>
              <td className="gene">{row.gene}</td>
              <td>{row.mean.toFixed(2)}</td>
              <td>{row.rest.toFixed(2)}</td>
              <td className={row.lfc > 0 ? "up" : "down"}>
                {row.lfc > 0 ? "+" : ""}
                {row.lfc.toFixed(2)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </aside>
  );
}
