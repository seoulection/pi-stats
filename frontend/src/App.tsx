import { useEffect, useState } from 'react'
import { CpuCard } from './components/CpuCard'
import './App.css'

type Stats = {
  boot_time: string,
  uptime_seconds: number,
  temperature: number | null,
  cpu_percent: number[]
}

function formatUptime(s: number) {
  const d = Math.floor(s / 86400)
  const h = Math.floor((s % 86400) / 3600)
  const m = Math.floor((s % 3600) / 60)
  return d > 0 ? `${d}d ${h}h ${m}m` : `${h}h ${m}m`
}

function tempLevel(f: number | null) {
  if (f === null) return 'na'
  if (f >= 176) return 'hot'   // ~80°C, Pi starts throttling
  if (f >= 140) return 'warm'  // ~60°C
  return 'ok'
}

function App() {
  const [stats, setStats] = useState<Stats | null>(null)
  const [error, setError] = useState(false)

  useEffect(() => {
    const load = () => {
      fetch('/api/stats')
        .then(res => res.json())
        .then(data => {
          setStats(data)
          setError(false)
        })
        .catch(err => console.error(err))
    }

    load()
    const id = setInterval(load, 2000)
    return () => clearInterval(id)
  }, [])

  return (
    <main className="dashboard">
      <header className="header">
        <h1>Raspberry Pi</h1>
        <span className={`status ${error ? 'offline' : 'online'}`}>
          <span className="dot" />
          {error ? 'Offline' : 'Live'}
        </span>
      </header>

      {stats && (
        <section className="grid">
          <CpuCard cpuPercent={stats.cpu_percent} />

          <article className={`card temp-${tempLevel(stats.temperature)}`}>
            <h2>Temperature</h2>
            <p className="value">
              {stats.temperature === null ? 'N/A' : stats.temperature}
              {stats.temperature !== null && <span className="unit">°F</span>}
            </p>
          </article>

          <article className="card">
            <h2>Uptime</h2>
            <p className="value small">{formatUptime(stats.uptime_seconds)}</p>
          </article>

          <article className="card">
            <h2>Booted</h2>
            <p className="value small">
              {new Date(stats.boot_time).toLocaleString([], {
                dateStyle: 'medium',
                timeStyle: 'short',
              })}
            </p>
          </article>
        </section>
      )}
    </main>
  )
}

export default App
