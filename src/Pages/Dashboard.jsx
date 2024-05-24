import React, { useEffect, useState } from 'react'
import Chat from '../Components/Chat'
import { toast, Toaster } from 'sonner'
import { useNavigate } from 'react-router-dom'

function Dashboard() {


  const navigate = useNavigate()





  // CHECKING IF THE USER IS LOGED OR NOT
  useEffect(() => {

    
    if (!sessionStorage.getItem("token")) {

      toast.error("LOGIN FIRST..!!")


      setTimeout(() => {

        navigate('/')


      }, 2000);

    }

  }, [])






  return (


    <>


      <Chat />

      <Toaster richColors position='bottom-center' />


    </>




  )
}

export default Dashboard