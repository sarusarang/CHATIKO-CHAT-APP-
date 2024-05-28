import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import { BrowserRouter } from 'react-router-dom'
import './bootstrap.min.css'
import { Provider } from 'react-redux'
import { Store } from '../REDUX STORE/Store.js'

ReactDOM.createRoot(document.getElementById('root')).render(


  <React.StrictMode>

    <BrowserRouter>

      <Provider store = {Store}>

        <App />

      </Provider>



    </BrowserRouter>


  </React.StrictMode>

)
