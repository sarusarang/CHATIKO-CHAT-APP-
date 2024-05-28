import React, { useEffect, useState } from 'react'
import { Route, Routes } from 'react-router-dom'
import Auth from './Pages/Auth'
import Dashboard from './Pages/Dashboard'
import { io } from 'socket.io-client'
import { Base_url } from './Services/AllApi'


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
