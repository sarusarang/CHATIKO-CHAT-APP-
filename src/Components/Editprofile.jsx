import React, { useEffect, useState } from 'react'
import './Profile.css'
import { Button } from 'react-bootstrap'
import { useAsyncValue, useNavigate } from 'react-router-dom'
import { getUser } from '../Services/AllApi'
import { Base_url } from '../Services/AllApi'
import { toast } from 'sonner'
import { edituser } from '../Services/AllApi'
import { useDispatch } from 'react-redux'
import { ProfileUpdate } from '../../REDUX STORE/User'


function Editprofile({ editpro, chatdefault,mobview }) {


    const [userdata, setuserdata] = useState({})

    const dispacth = useDispatch()


    // STATE FOR UPDATING THE USER DATA
    const [updatedata, setupdatedata] = useState({

        username: "", image: ""

    })


    // TO DISPLAY PREVIEW OF THE UPDATING IMAGE
    const [imgperview, setimgpreview] = useState("")

    const [status, setstatus] = useState(false)
    const [imagestatus, setimagestatus] = useState(false)


    const navigate = useNavigate()


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

            setupdatedata({ ...updatedata, username: res.data.username })

        }

        getuserdata()

    }, [])



    // TO CHECK THE UPDATED PROFILE PICTURE IS VAILD
    useEffect(() => {

        if (updatedata.image.type == "image/jpg" || updatedata.image.type == "image/jpeg" || updatedata.image.type == "image/png") {

            setimgpreview(URL.createObjectURL(updatedata.image))
            setimagestatus(false)


        }
        else {

            setimgpreview("")
            setimagestatus(true)


        }


    },[updatedata.image])



    // EDIT USER DATA
    const editprofile = async () => {


        try {

            const { username, image } = updatedata

            if (!username) {

                toast.warning("No Data Found To Update")

            } else {


                const formdata = new FormData()

                formdata.append("username", username)
                imgperview ? formdata.append("image", image) : formdata.append("image", userdata.image)

                const token = sessionStorage.getItem("token")


                if (imgperview) {


                    const reqheader = {


                        "Content-Type": "multipart/form-data",
                        "Authorization": `Bearer ${token}`

                    }

                    const res = await edituser(formdata, reqheader)

                    if (res.status == 200) {

                        toast.success("Profile Updated")

                       dispacth(ProfileUpdate(Date.now()))

                    }
                    else {

                        toast.error("ERROR")

                    }

                }
                else {


                    const reqheader = {

                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${token}`

                    }

                    const res = await edituser(formdata, reqheader)

                    if (res.status == 200) {

                        toast.success("Profile Updated")

                    }
                    else {

                        toast.error("error")

                    }

                }


            }

        }
        catch (err) {

          
            console.log(err);

        }


    }

    // Logout 
    const logout = () => {

        sessionStorage.removeItem("token")
        sessionStorage.removeItem("username")
        sessionStorage.removeItem("_id")
        navigate('/')

    }

    
    return (



        <>


            <section className=' w-100 h-100 edit'>


                <div className='w-100 back-btn'>

                    <i class="fa-solid fa-arrow-left fa-xl" onClick={() => { editpro(false), chatdefault(true),mobview(true) }}></i>


                    {/* PROFILE EDIT */}

                    <div className='profile-edit w-100 mt-4'>


                        <form onSubmit={(e) => { e.preventDefault() }} className='d-flex flex-column justify-content-center align-items-center pro-bg'>


                            <label className='pro-img'>

                                <input type="file" onChange={(e) => { setupdatedata({ ...updatedata, image: e.target.files[0] }), setstatus(true) }} style={{ display: 'none' }} />

                                {
                                    imgperview ?

                                        <img src={imgperview} alt="profile-image" className='img-fluid' />

                                        :

                                        <img src={userdata.image ? `${Base_url}/uploads/${userdata.image}` : "/Defualt-profile.jpg"} className='img-fluid' alt="profileimage" />
                                }

                                {
                                    status && imagestatus &&

                                    <p className='text-danger text-center mb-0' style={{ fontSize: '1rem' }}>Invaild File Format</p>

                                }



                            </label>

                            <h5 className='text-white mt-2'>Edit Profile Picture</h5>


                            <div className=" mt-2 eidt-name">

                                <i className="fa-solid fa-pen ms-3"></i>

                                <input type="text" value={updatedata.username} onChange={(e) => { setupdatedata({ ...updatedata, username: e.target.value }) }} placeholder='Edit your name' />

                            </div>

                            <Button type='submit' className='btn-save mt-2' onClick={editprofile}>SAVE</Button>

                            <Button className='btn-save mt-2' onClick={logout}> LOG OUT <i class="fa-solid fa-right-from-bracket"></i>  </Button>


                        </form>





                    </div>


                </div>

            </section>



        </>





    )





}

export default Editprofile