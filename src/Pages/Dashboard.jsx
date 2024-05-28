import React, { useEffect, useState } from 'react'
import Chat from '../Components/Chat'
import { toast, Toaster } from 'sonner'
import { useNavigate } from 'react-router-dom'
import { io } from 'socket.io-client'
import { Base_url } from '../Services/AllApi'
import { useDispatch } from 'react-redux'
import { Online } from '../../REDUX STORE/User'
import { useSelector } from 'react-redux'



function Dashboard() {


  const navigate = useNavigate()


  const { OnlineUsers } = useSelector((state) => state.users)


  const token = sessionStorage.getItem("token")

  const [socket, setsocket] = useState(null)

  const id = sessionStorage.getItem("_id")


  const dispatch = useDispatch()



  // TO GET THE ONLINE USERS
    useEffect(() => {

    if (token) {


      const socket = io(Base_url, {

        query: {

          userId: id

        }

      })

      setsocket(socket)

      socket.on('getOnlineUsers', (users) => {

        dispatch(Online(users))


      })

      return () => {
        socket.disconnect();
      };


    }

  },[token])





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