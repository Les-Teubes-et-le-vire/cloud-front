import { useEffect, useState } from 'react'
import './App.css'

/**
 * Cloud TP - Frontend
 *
 * Groupe :
 *  - Killian BELLOUARD
 *  - Théo BOUTROUX
 *  - Mathéo DELAUNAY
 *  - Mathieu CROSNIER
 */

interface HealthStatus {
  status: string
}

function App() {
  const [greeting, setGreeting] = useState<string | null>(null)
  const [health, setHealth] = useState<HealthStatus | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [greetingRes, healthRes] = await Promise.all([
          fetch('/api/'),
          fetch('/api/health'),
        ])

        setGreeting(await greetingRes.text())
        setHealth(await healthRes.json())
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch data')
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  return (
    <div className="container">
      <header>
        <h1>Cloud TP - Frontend</h1>
        <p className="subtitle">Fetching a lot of data from the backend API</p>
      </header>

      <main>
        {loading && <div className="card loading">Loading...</div>}

        {error && <div className="card error">Error: {error}</div>}

        {!loading && !error && (
          <>
            <div className="card">
              <h2>API Response</h2>
              <code>GET /</code>
              <p className="response">{greeting}</p>
            </div>

            <div className="card">
              <h2>Health Check</h2>
              <code>GET /health</code>
              <pre className="response">{JSON.stringify(health, null, 2)}</pre>
            </div>
          </>
        )}
      </main>

      <footer>
        <h3>Groupe</h3>
        <ul>
          <li>Killian BELLOUARD</li>
          <li>Théo BOUTROUX</li>
          <li>Mathéo DELAUNAY</li>
          <li>Mathieu CROSNIER</li>
        </ul>
      </footer>
    </div>
  )
}

export default App
