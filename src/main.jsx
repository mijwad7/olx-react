import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import {FirebaseContext, AuthProvider} from './store/FirebaseContext'
import { Firebase } from './firebase/config.js'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <FirebaseContext.Provider value={{Firebase}}>
      <AuthProvider>
      <App />
      </AuthProvider>
    </FirebaseContext.Provider>
  </StrictMode>,
)
