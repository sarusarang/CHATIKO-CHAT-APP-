import React, { useEffect, useState } from 'react'
import './Profile.css'
import { Button } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import { getUser } from '../Services/AllApi'
import { Base_url } from '../Services/AllApi'

function Editprofile({ editpro, chatdefault }) {


    const [userdata, setuserdata] = useState({})

    // to get the token form sessionStorage
    const token = sessionStorage.getItem("token")


    // to get the userdata when it mounts
    useEffect(() => {


        const auth = {

            "Authorization": `Bearer ${token}`

        }

        const getuserdata = async () => {

            const res = await getUser(auth)

            setuserdata(res.data)

        }

        getuserdata()

    }, [])

    const navigate = useNavigate()


    // Logout 
    const logout = () => {

        sessionStorage.removeItem("token")
        sessionStorage.removeItem("username")
        navigate('/')

    }


    return (



        <>


            <section className=' w-100 h-100 edit'>


                <div className='w-100 back-btn'>

                    <i class="fa-solid fa-arrow-left fa-xl" onClick={() => { editpro(false), chatdefault(true) }}></i>


                    {/* PROFILE EDIT */}

                    <div className='profile-edit w-100 mt-4'>


                        <form className='d-flex flex-column justify-content-center align-items-center pro-bg'>


                            <label className='pro-img'>

                                <input type="file" style={{ display: 'none' }} />

                                <img src={userdata.image? `${Base_url}/uploads/${userdata.image}`:"/Defualt-profile.jpg"} className='img-fluid' alt="profileimage" />

                            </label>

                            <h5 className='text-white mt-2'>Edit Profile Picture</h5>


                            <div className=" mt-2 eidt-name">

                                <i className="fa-solid fa-pen ms-3"></i>

                                <input type="text" value={userdata.username}   placeholder='Edit your name' />

                            </div>

                            <Button type='submit' className='btn-save mt-2'>SAVE</Button>

                            <Button className='btn-save mt-2' onClick={logout}> LOG OUT <i class="fa-solid fa-right-from-bracket"></i>  </Button>


                        </form>





                    </div>


                </div>

            </section>



        </>





    )





}

export default Editprofile