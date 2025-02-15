import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { GoogleOAuthProvider } from '@react-oauth/google'
import { BrowserRouter } from 'react-router-dom';
import { Toaster } from 'react-hot-toast'
import { Provider } from 'react-redux';
import { store } from './store.jsx';

createRoot(document.getElementById('root')).render(

  <GoogleOAuthProvider clientId='1049104831123-j8vnmqk7ags803sqgcvpcfq2vnn3erdf.apps.googleusercontent.com'>
    <Provider store={store}>
      <BrowserRouter>
        <App />
        <Toaster />
      </BrowserRouter>
    </Provider>
  </GoogleOAuthProvider>
)
