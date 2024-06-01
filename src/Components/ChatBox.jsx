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
import data from '@emoji-mart/data'
import Picker from '@emoji-mart/react'




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

    // FOR IMAGE FILE
    const [imagefile, setimagefile] = useState("")

    // image file status
    const [imagestatus, setimagestatus] = useState(false)

    // image preview
    const [preview, setpreview] = useState("")


    const token = sessionStorage.getItem("token")

    //mesg sent status 
    const [status, setstatus] = useState()

    // mesg delete status
    const [deletestatus, setdeletestatus] = useState("")

    // emoji picker status
    const [ispicker, setispicker] = useState(false)

    // current emoji
    const [currentemoji, setCurrentEmoji] = useState("")


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

    }, [status, UserClick, UserRecived, DeletedOne, deletestatus])




    // TO PUSH SENDED MESG INSTANTLY TO SHOW THE MESG TO  RECIVER USER 
    useEffect(() => {

        const socket = io(Base_url)


        socket.on('newMessage', (message) => {


            if (message.chatid == uniqueChatID) {

                setmesghistory(prevMesgHistory => [...prevMesgHistory, message])

            }

        })

        return () => {

            socket.disconnect();

        };


    }, [status, mesghistory])


    // TO SHOW THE USER AFTER DELETEING THE CHATS
    useEffect(() => {

        const socket = io(Base_url)

        socket.on('afterdelete', (newmessages) => {


            if (newmessages[1] == uniqueChatID) {

                setmesghistory(newmessages[0])
                console.log("succes");


            }

        })

        return () => {

            socket.disconnect();

        };

    }, [deletestatus])




    // TO SHOW USER AFTER DELETEING ONE MESG
    useEffect(() => {

        const socket = io(Base_url)

        socket.on('onedelete', (newMessage) => {


            newMessage.map(item => {

                if (item.chatid == uniqueChatID) {


                    setmesghistory(newMessage)

                    console.log("success");

                }

            })


        })

        return () => {

            socket.disconnect();

        };


    }, [DeletedOne])




    

    // TO CHECK THE IMAGE FILE TYPES
    useEffect(() => {

        if (imagefile.type == "image/jpg" || imagefile.type == "image/jpeg" || imagefile.type == "image/png") {

            setpreview(URL.createObjectURL(imagefile))
            setimagestatus(true)


        } else {

            setimagestatus(false)
            setpreview("")
        }


    }, [imagefile])


    // handle pick emoji 
    const handleemoji = (e) => {

        const sym = e.unified.split("_")

        const arr = []

        sym.forEach((item) => arr.push("0x" + item))

        let emoji = String.fromCodePoint(...arr)

        setMessage(prev => (prev + emoji))

    }


    // geting new message from the input feild
    const getchat = (e) => {

        setMessage(e.target.value)

    }




    // get imgae files
    const getimagefile = (e) => {


        setimagefile(e.target.files[0])


    }




    // message sending
    const sendMessage = async () => {


        const formdata = new FormData()

        formdata.append("senderid", sendid)
        formdata.append("receiverid", reciveid)
        formdata.append("text", message)
        formdata.append("chatid", uniqueChatID)
        formdata.append("image", imagefile)


        if (preview) {

            const auth = {

                "Content-Type": "multipart/form-data",
                "Authorization": `Bearer ${token}`

            }

            const res = await sendchat(formdata, auth)

            if (res.status == 200) {

                setimagefile('')

            }


        }

        else {


            const auth = {

                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            }

            const data = { senderid: sendid, receiverid: reciveid, text: message, chatid: uniqueChatID, image: "" }

            const result = await sendchat(data, auth)

            if (result.status == 200) {

                setMessage('')
                setCurrentEmoji("")
                setstatus(data)
                dispatch(RecivedChat(result.data))
                setispicker(false)


            }

        }


    }



    // Deleteing all Chats
    const DeleteAllChats = async () => {

        const auth = {

            "Authorization": `Bearer ${token}`
        }


        const res = await clearallchats(uniqueChatID, auth)

        if (res.status == 200) {

            setdeletestatus(res.data)
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



                    <UserMessage item={sorted} sendid={sendid} chatid={uniqueChatID} />


                </div>


                {/* CHAT INPUT AREA */}
                <div className=' w-100 chat-area2'>


                    {/* emoji picker */}
                    <div className={ispicker ? 'd-block' : 'd-none'}>

                        <Picker data={data} onEmojiSelect={(e) => { handleemoji(e) }} />

                    </div>



                    {
                        preview &&

                        <div className='d-flex justify-content-center pt-4 pb-4' style={{ backgroundColor: '#000000d1' }}>

                            <img src={preview} className='img-fluid' width={"50%"} alt="" />

                        </div>


                    }




                    <div className='chat-input w-100 d-flex'>

                        {/* EMOJI */}
                        <button className='me-2' onClick={() => { setispicker(!ispicker) }} ><i className="fa-regular fa-face-smile"></i></button>

                        <form onSubmit={(e) => { e.preventDefault() }} className='d-flex w-100'>




                            <input onChange={(e) => { getchat(e) }} value={message} type="text" placeholder='Type a Message' />



                            <div>

                                <label>

                                    <input type="file" onChange={(e) => { getimagefile(e) }} style={{ display: 'none' }} />

                                    <i class="fa-regular fa-image"></i>


                                </label>


                            </div>




                            {

                                (message || imagefile) &&

                                <button id="submitBtn" type='submit' onClick={sendMessage}><i className="fa-regular fa-paper-plane ms-4 me-3"></i></button>

                            }

                        </form>

                    </div>





                </div>


            </section >



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


