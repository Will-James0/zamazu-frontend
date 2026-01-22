import { Link, Outlet } from 'react-router-dom'
import './App.css'

function App() {
  return (
    <div>      
      <main style={{ padding: '20px' }}>
        <Outlet />
      </main>
    </div>
  )
}

export default App
