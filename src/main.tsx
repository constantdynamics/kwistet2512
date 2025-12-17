import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App'
import { GameProvider } from './contexts/GameContext'
import { UserProvider } from './contexts/UserContext'
import './styles/index.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter basename="/kwistet2512">
      <UserProvider>
        <GameProvider>
          <App />
        </GameProvider>
      </UserProvider>
    </BrowserRouter>
  </React.StrictMode>,
)
