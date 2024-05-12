import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Auth from './Pages/Auth'
import Dashboard from './Pages/Dashboard'


function App() {



  return (

    <>

      <Routes>

        <Route path='/' element={<Auth />} />
        
        <Route path='/dash' element={<Dashboard />} />

      </Routes>

    </>



  )
}

export default App
