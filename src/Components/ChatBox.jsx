import React from 'react'
import './Chatbox.css'
import UserMessage from './UserMessage'
import OtherMessage from './OtherMessage'



function ChatBox() {





    return (

        <>



            <section className='w-100 h-100 chat-box'>



                {/* CHAT HEADER */}
                <div className='chat-header d-flex justify-content-between align-items-center'>


                    <div className='d-flex justify-content-around align-items-center'>


                        {/* User profile */}
                        <div className='userporifle'>

                            <p>S</p>

                        </div>



                        {/* user profile and status */}
                        <div className='ms-2 mt-2 username'>


                            <h5>SARANG A </h5>

                            <p>online</p>


                        </div>


                    </div>


                    <div className='chat-dele'>

                        <button><i class="fa-solid fa-trash-can"></i></button>

                    </div>


                </div>




                {/* CHAT AREA */}
                <div className='chat-area w-100'>


                    <OtherMessage />

                    <UserMessage />


                </div>


                {/* CHAT INPUT AREA */}
                <div className=' w-100 chat-area2'>

                    <form>

                        <div className='chat-input w-100'>

                            <input type="text" placeholder='Type a Message' />

                            <button><i className="fa-regular fa-paper-plane"></i></button>

                        </div>


                    </form>


                </div>




            </section>




        </>


    )



}

export default ChatBox


