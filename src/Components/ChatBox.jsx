import React, { useEffect, useState } from 'react'
import './Chatbox.css'
import UserMessage from './UserMessage'
import { Base_url } from '../Services/AllApi'
import { sendchat } from '../Services/AllApi'
import { getchats } from '../Services/AllApi'
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'
import { RecivedChat } from '../../REDUX STORE/User'
import { io } from 'socket.io-client'
import { clearallchats } from '../Services/AllApi'
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';



function ChatBox({ chatdefault, chatstatus, mobview, chatdata }) {



    const { UserClick, UserRecived, OnlineUsers, DeletedOne } = useSelector((state) => state.users)


    const dispatch = useDispatch()

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);


    // TO GET SENDER ID AND RECIVER ID OF THE CHATS
    const sendid = sessionStorage.getItem("_id")
    const reciveid = chatdata._id
    const sortid = [sendid, reciveid].sort()


    // NEW CHAT ID FOR ONE TO ONE CHAT
    const uniqueChatID = sortid.join('_')


    // SETTING CHAT INPUT FROM USER
    const [message, setMessage] = useState('');



    // for fetching chat messages from DB
    const [mesghistory, setmesghistory] = useState([])


    const token = sessionStorage.getItem("token")
    const [status, setstatus] = useState()



    // Fecth messages
    useEffect(() => {


        const auth = {

            "Authorization": `Bearer ${token}`
        }

        const getmesg = async () => {



            const result = await getchats(uniqueChatID, auth)

            setmesghistory(result.data)


        }
        getmesg()

    }, [status, UserClick, UserRecived, DeletedOne])




    useEffect(() => {

        const socket = io(Base_url)


        socket.on('newMessage', (message) => {

            setmesghistory(...mesghistory.push(message))

        })

        return () => {

            socket.disconnect();

        };


    }, [status, mesghistory])









    // geting new message from the input feild
    const getchat = (e) => {

        setMessage(e.target.value)

    }


    // message sending
    const sendMessage = async () => {

        const auth = {
            "Authorization": `Bearer ${token}`
        }

        const data = { senderid: sendid, receiverid: reciveid, text: message, chatid: uniqueChatID }

        const result = await sendchat(data, auth)

        if (result.status == 200) {

            setMessage('');
            setstatus(data)

            dispatch(RecivedChat(result.data))


        }

    }

    // Deleteing all Chats
    const DeleteAllChats = async () => {

        const auth = {

            "Authorization": `Bearer ${token}`
        }


        const res = await clearallchats(uniqueChatID, auth)

        if (res.status == 200) {

            setstatus(res.data)
            handleClose()

        }


    }

    // sorted chat by time
    const sorted = mesghistory.sort((a, b) => new Date(a.timestamp) - new Date(b.timestamp));


    return (


        <>

            <section className='w-100 h-100 chat-box'>



                {/* CHAT HEADER */}
                <div className='chat-header d-flex justify-content-between align-items-center'>


                    <div className='d-flex  align-items-center'>

                        <i class="fa-solid fa-arrow-left fa-xl me-4 back" onClick={() => { chatdefault(true), chatstatus(false), mobview(true) }}></i>

                        {/* User profile */}
                        <div className='userporifle'>

                            {
                                chatdata.image ?

                                    <img src={`${Base_url}/uploads/${chatdata.image}`} className='img-fluid' alt="" />

                                    :

                                    <img src="/Defualt-profile.jpg" className='img-fluid' alt="" />
                            }


                        </div>



                        {/* user profile and status */}
                        <div className='ms-2 mt-2 username'>


                            <h5>{chatdata.username}</h5>

                            <p className={OnlineUsers.includes(chatdata._id) ? "text-success" : "text-danger"}>{OnlineUsers.includes(chatdata._id) ? "Online" : "Offline"}</p>


                        </div>


                    </div>


                    <div className='chat-dele'>

                        <button onClick={handleShow}><i class="fa-solid fa-trash-can"></i></button>

                    </div>


                </div>



                {/* CHAT AREA */}
                <div className='chat-area w-100'>

                    <UserMessage item={sorted} sendid={sendid} />


                </div>


                {/* CHAT INPUT AREA */}
                <div className=' w-100 chat-area2'>

                    <form onSubmit={(e) => { e.preventDefault() }}>

                        <div className='chat-input w-100'>

                            <input onChange={(e) => { getchat(e) }} value={message} type="text" placeholder='Type a Message' />

                            <button onClick={sendMessage}><i className="fa-regular fa-paper-plane"></i></button>

                        </div>


                    </form>


                </div>


            </section>



            <Modal

                show={show}
                onHide={handleClose}
                backdrop="static"
                keyboard={false}
                aria-labelledby="contained-modal-title-vcenter"
                centered
                className='text-danger'

            >


                <Modal.Header closeButton>

                </Modal.Header>
                <Modal.Body className='text-center'>
                    Are You Sure You Want To Delete All Message For Both...
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" className='modal-btn' onClick={handleClose}>
                        No
                    </Button>
                    <Button variant="primary" className='modal-btn' onClick={DeleteAllChats}>Yes</Button>
                </Modal.Footer>

            </Modal>




        </>


    )



}

export default ChatBox


