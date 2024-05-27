import React, { useEffect, useState } from 'react'
import './Chatbox.css'
import UserMessage from './UserMessage'
import OtherMessage from './OtherMessage'
import { Base_url } from '../Services/AllApi'
import { sendchat } from '../Services/AllApi'
import { getchats } from '../Services/AllApi'




function ChatBox({ chatdefault, chatstatus, mobview, chatdata }) {


    const sendid = sessionStorage.getItem("_id")
    const reciveid = chatdata._id

    const sortid =[sendid,reciveid].sort()

    const uniqueChatID = sortid.join('_')

   

    const [message, setMessage] = useState('');

    // for fetching chat messages
    const [mesghistory,setmesghistory] = useState([])

    const token = sessionStorage.getItem("token")

    const [status,setstatus] = useState()


    // Fecth messages
    useEffect(() => {


        const auth = {

            "Authorization": `Bearer ${token}`
        }

        const getmesg = async () => {

         

            const result = await getchats(uniqueChatID,auth)

            setmesghistory(result.data)


        }
        getmesg()


    },[status,setTimeout(() => {console.log();},1000)])


    // sorted chat by time
   const sorted= mesghistory.sort((a, b) => new Date(a.timestamp) - new Date(b.timestamp));


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

        }

    }



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

                            <p className='text-success'>Online</p>


                        </div>


                    </div>


                    <div className='chat-dele'>

                        <button><i class="fa-solid fa-trash-can"></i></button>

                    </div>


                </div>




                {/* CHAT AREA */}
                <div className='chat-area w-100'>


                    {

                        sorted.map(item=>(

                            item.sender == sendid?

                            <UserMessage item={item.text} time={item.timestamp}/>

                            :

                            <OtherMessage item={item.text }  time={item.timestamp}/>

                        ))
                    }

                    

               
                   


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




        </>


    )



}

export default ChatBox


