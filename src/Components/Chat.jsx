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


                            {/* User Profile */}
                            <div className='d-flex justify-content-start align-items-center w-100'>


                                <div className='profile-edit'>

                                    <img src="/Defualt-profile.jpg" className='img-fluid' alt="" />

                                </div>

                                <h5 className='text-white mt-3 ms-2'>SARANG A</h5>

                            </div>





                            {/* USER SEARCH */}
                            <div className='serach-user d-flex align-items-center  w-100 mt-3'>

                                <i class="fa-solid fa-magnifying-glass fa-xl" style={{ color: '#000' }}></i>
                                <input type="search" name='search' className='' placeholder='Serach Your Friend' />

                            </div>


                            {/* USERS IN CHAT APP  */}


                            <div className='chat-scroll w-100'>


                                <div className='w-100 mt-3 d-flex align-items-center frnd'>

                                    <div className='frnd-profile position-relative'>

                                        <img src="/Defualt-profile.jpg" className='img-fluid ' alt="" />

                                        <i class="fa-solid fa-circle fa-2xs "></i>

                                    </div>

                                    <h5 className=' mt-3 ms-3'>SARANG A</h5>

                                </div>


                            </div>



                        </div>




                        {/* USER AND GROUP CHATS */}
                        <div className='col-md-9 chats'>


                            {/* Default Chat */}
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