import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'

import {BrowserRouter} from 'react-router-dom'
import UserProvider from './context/UserProvider'

ReactDOM.createRoot(document.getElementById('root')).render(
//Paso 1 importacion de  BrowserRouter
//paso 2 importamos UserProvider
  <UserProvider>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </UserProvider>

)
