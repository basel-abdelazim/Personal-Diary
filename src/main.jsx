import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'

import Chatbot from './components/Chatbot'; // Import Chatbot component
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
    <Chatbot /> {/* Add the Chatbot component here */}
  </StrictMode>,
)

