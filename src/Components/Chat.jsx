import React, { useState } from 'react'
import './Chat.css'
import Editprofile from './Editprofile'



function Chat() {


    const [data, setdata] = useState([


        { name: "SARANG" }, { name: "SUGU" }, { name: "Vishnu" }, { name: "Ragnga" }, { name: "yadhu" }, { name: "Adrash" }, { name: "Aswanth" }, { name: "Sanju" }

    ])

    // STATE FOR STATUS OF  PROFILE EDIT
    const [editpro, seteditpro] = useState(false)




    return (

        <>


            <section className='chat-main'>

                <div className='container-fluid'>

                    <div className='row'>



                        {/* Users  */}
                        <div className='col-md-3 p-3 users'>


                            {/* User Profile */}
                            <div className='d-flex justify-content-between align-items-center w-100'>

                                <div className='frnd-profile'>

                                    <p>S</p>

                                </div>


                                <div className='add-groups'>

                                    <button><i class="fa-solid fa-user-group"></i> <i class="fa-solid fa-plus fa-2xs"></i></button>

                                </div>


                            </div>


                            {/* USER SEARCH */}
                            <div className='serach-user d-flex align-items-center  w-100 mt-3'>

                                <i class="fa-solid fa-magnifying-glass fa-xl" style={{ color: '#000' }}></i>
                                <input type="search" name='search' className='' placeholder='Serach Your Friend' />

                            </div>


                            {/* USERS IN CHAT APP  */}
                            <div className='chat-scroll w-100 mt-3'>


                                {
                                    data ?

                                        data.map(item => (



                                            <div className='w-100 mt-3 d-flex align-items-center frnd'>

                                                <div className='frnd-profile position-relative'>


                                                    <p>{item.name[0]}</p>

                                                    <i class="fa-solid fa-circle fa-2xs "></i>

                                                </div>

                                                <h5 className=' mt-3 ms-3'>{item.name}</h5>

                                            </div>




                                        ))



                                        :

                                        <h1>Search Your Friend</h1>

                                }

                            </div>

                        </div>






                        {/* USER AND GROUP CHATS */}
                        <div className='col-md-9 chats'>


                            {/* Default Chat */}
                            {/* <div className='w-100 d-flex justify-content-center align-items-center h-100'>

                                <img src="/Add_a_heading__1_-removebg-preview.png" className='img-fluid' alt="" />

                            </div> */}

                            {/* profle edit */}
                            <Editprofile />


                        </div>



                    </div>

                </div>

            </section>



        </>






    )




}

export default Chat