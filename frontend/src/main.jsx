import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { GoogleOAuthProvider } from '@react-oauth/google'
import {BrowserRouter} from 'react-router-dom';
import { Toaster } from 'react-hot-toast'

createRoot(document.getElementById('root')).render(

  <BrowserRouter>
  <GoogleOAuthProvider clientId='1049104831123-j8vnmqk7ags803sqgcvpcfq2vnn3erdf.apps.googleusercontent.com'>
     <App />
     <Toaster/>
  </GoogleOAuthProvider>
  </BrowserRouter>
)
