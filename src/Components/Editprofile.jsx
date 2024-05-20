import React from 'react'
import './Profile.css'
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';





function Editprofile() {



    return (



        <>


            <section className=' w-100 h-100 edit'>


                <div className='w-100 back-btn'>

                    <i class="fa-solid fa-arrow-left fa-xl"></i>


                    <div className='profile-edit w-100'>


                        <form className='d-flex flex-column justify-content-center align-items-center'>


                            <label className='pro-img'>

                                <input type="file" style={{ display: 'none' }} />

                                <img src="/Defualt-profile.jpg" className='img-fluid' alt="profileimage" />

                            </label>


                          


                        </form>


                    </div>


                </div>


            </section>



        </>





    )





}

export default Editprofile