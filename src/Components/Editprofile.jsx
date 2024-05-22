import React from 'react'
import './Profile.css'
import { Button } from 'react-bootstrap'





function Editprofile({editpro,chatdefault}) {



    return (



        <>


            <section className=' w-100 h-100 edit'>


                <div className='w-100 back-btn'>

                    <i class="fa-solid fa-arrow-left fa-xl" onClick={()=>{editpro(false),chatdefault(true)}}></i>


                    {/* PROFILE EDIT */}

                    <div className='profile-edit w-100 mt-5'>


                        <form className='d-flex flex-column justify-content-center align-items-center pro-bg'>


                            <label className='pro-img'>

                                <input type="file" style={{ display: 'none' }} />

                                <img src="/Defualt-profile.jpg" className='img-fluid' alt="profileimage" />

                            </label>

                            <h5 className='text-white mt-2'>Edit Profile Picture</h5>


                            <div className=" mt-2 eidt-name">

                                <i className="fa-solid fa-pen ms-3"></i>

                                <input type="text" placeholder='Edit your name' />

                            </div>

                            <Button type='submit' className='btn-save mt-2'>SAVE</Button>

                            <Button  className='btn-save mt-2'> LOG OUT <i class="fa-solid fa-right-from-bracket"></i>  </Button>


                        </form>

                        



                    </div>


                </div>

            </section>



        </>





    )





}

export default Editprofile