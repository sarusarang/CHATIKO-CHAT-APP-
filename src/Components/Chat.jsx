import React from 'react'
import './Chat.css'




function Chat() {





    return (


        <>



            <section className='chat-main'>

                <div className='container-fluid'>

                    <div className='row'>



                        {/* Users  */}
                        <div className='col-md-3 p-3 users'>

                            <div className='d-flex justify-content-between align-items-center w-100'>

                                <h2 className='text-white'>Chats</h2>


                                <div className='profile-edit'>

                                    <img src="/Defualt-profile.jpg" className='img-fluid' alt="" />

                                </div>

                            </div>



                            <div className='serach-user w-100'>

                                <input type="search" name='search' className='mt-3' placeholder='Serach Your Friend' />

                            </div>


                        </div>









                        {/* USER AND GROUP CHATS */}

                        <div className='col-md-9 chats'>


                            <div className='w-100 d-flex justify-content-center align-items-center h-100'>

                                <img src="/Add_a_heading__1_-removebg-preview.png" className='img-fluid' alt="" />

                            </div>



                        </div>








                    </div>

                </div>

            </section>



        </>






    )




}

export default Chat