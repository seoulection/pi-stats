import './CpuCard.css'

interface Props {
  cpuPercent: number[]
}

function loadLevel(load: number) {
  if (load >= 85) return 'hot'
  if (load >= 60) return 'warm'
  return 'ok'
}

export function CpuCard(props: Props) {
  const cores = props.cpuPercent
  const avg = cores.length ? cores.reduce((a, b) => a + b, 0) / cores.length : 0

  return (
    <article className="card card-wide">
      <div className="cpu-head">
        <h2>CPU</h2>
        <span className="cpu-meta">{cores.length} cores</span>
      </div>

      <p className="value">
        {avg.toFixed(1)}<span className="unit">% avg</span>
      </p>

      <div className="cores">
        {cores.map((pct, i) => (
          <div className={`core load-${loadLevel(pct)}`} key={i}>
            <div className="core-label">
              <span>Core {i}</span>
              <span className="core-pct">{pct.toFixed(0)}%</span>
            </div>
            <div className="bar">
              <div className="bar-fill" style={{ width: `${pct}%` }} />
            </div>
          </div>
        ))}
      </div>
    </article>
  )
}
