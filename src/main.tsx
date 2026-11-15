import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import '@fontsource/saira-condensed/latin-700.css'
import '@fontsource/oswald/cyrillic-700.css'
import './styles.css'
import App from './App'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
