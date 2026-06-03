import './index.css'
import Jeu from './sections/Jeu'

export default function App() {
  return (
    <main style={{ backgroundColor: 'var(--bg)' }}>
      <Jeu />
      {/* sections coming: miroir → méthode → révélation → candidat → close */}
    </main>
  )
}
