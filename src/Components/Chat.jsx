import React, { useEffect, useState } from 'react'
import './Chat.css'
import Editprofile from './Editprofile'
import ChatBox from './ChatBox'
import { getUser } from '../Services/AllApi'
import { Base_url } from '../Services/AllApi'
import { getallusers } from '../Services/AllApi'
import { toast } from 'sonner'
import { useDispatch } from 'react-redux'
import { ClickedUser } from '../../REDUX STORE/User'
import { useSelector } from 'react-redux'


function Chat() {

    const { OnlineUsers, Profile } = useSelector((state) => state.users)


    const dispatch = useDispatch()

    const token = sessionStorage.getItem("token")

    // TO SET USER DATA
    const [userdata, setuserdata] = useState({})

    // TO SET ALL USER
    const [alluser, setalluser] = useState([])

    // Serach Status
    const [searchstatus, setsearchstatus] = useState(false)

    // Serached users
    const [Searchresults, setsearchResults] = useState([])

    // CHATDATA DATA OF THE OTHER PERSON
    const [chatdata, setchatdata] = useState({})


    // const mob-view status
    const [mobview, setmobview] = useState(false)


    useEffect(() => {

        // Check the screen size
        const checkscreensize = () => {

            const issmall = window.matchMedia("(max-width:768px)").matches

            setmobview(issmall)

        }

        checkscreensize()

        window.addEventListener('resize', checkscreensize)


    },[])


    // TO GET USER DATA
    useEffect(() => {


        try {


            const auth = {

                "Authorization": `Bearer ${token}`

            }


            // GET CURRENT USER DAT
            const getuserdata = async () => {

                const res = await getUser(auth)

                setuserdata(res.data)

            }

            // GET ALL USERS
            const result = async () => {

                const res = await getallusers(auth)
                setalluser(res.data)


            }

            result()

            getuserdata()


        }
        catch (err) {


            toast.error("UNABLE TO CONNECT TO SERVER ")

        }

    }, [Profile])


    // SEARCH 
    const search = (e) => {

        setsearchstatus(true)

        const Searchterm = e.target.value

        const result = alluser.filter(item => (item.username.toLowerCase().includes(Searchterm.toLowerCase())))

        setsearchResults(result)

    }



    // CHAT BOX WHEN USER CLICKS
    const userchat = (image, username, _id) => {

        const user = { image, username, _id }

        dispatch(ClickedUser(username))

        setchatstatus(true)
        setdefaultchat(false)
        seteditpro(false)
        setmobview(false)
        setchatdata(user)

    }

    // STATE FOR STATUS OF  PROFILE EDIT
    const [editpro, seteditpro] = useState(false)

    // STATE FOR STATUS OF CHAT
    const [chatstatus, setchatstatus] = useState(false)

    // STATE FOR STATUS OF DEFAULT CHAT
    const [defaultchat, setdefaultchat] = useState(true)




    return (

        <>

            <section className='chat-main'>


                <div className='container-fluid'>


                    <div className='row'>


                        {/* Users  */}
                        <div className={mobview ? `users p-3 col-md-3 ` : `users p-3 col`}>


                            {/* User Profile */}
                            <div className='d-flex justify-content-between align-items-center w-100'>

                                <div className='frnd-profile' onClick={() => { seteditpro(true), setchatstatus(false), setdefaultchat(false), setmobview(false) }}>

                                    {

                                        userdata.image ?

                                            <img src={`${Base_url}/uploads/${userdata.image}`} className='img-fluid' alt="logo" />

                                            :

                                            <img src="/Defualt-profile.jpg" className='img-fluid' alt="" />


                                    }


                                </div>


                                {/* <div className='add-groups'>

                                    <button><i class="fa-solid fa-user-group"></i> <i class="fa-solid fa-plus fa-2xs"></i></button>

                                </div> */}


                            </div>


                            {/* USER SEARCH */}
                            <div className='serach-user d-flex align-items-center  w-100 mt-3'>

                                <i class="fa-solid fa-magnifying-glass fa-xl" style={{ color: '#000' }}></i>

                                <input type="search" onChange={(e) => { search(e) }} name='search' className='' placeholder='Serach Your Friend' />

                            </div>




                            {/* SEARCH USERS */}
                            {

                                searchstatus &&


                                <div className='chat-scroll w-100 mt-3'>


                                    {
                                        Searchresults ?

                                            Searchresults.map(item => (


                                                <div className='w-100 mt-3 d-flex align-items-center frnd' onClick={() => { userchat(item.image, item.username, item._id) }}>

                                                    <div className='frnd-profile'>

                                                        {

                                                            item.image ?

                                                                <img src={`${Base_url}/uploads/${item.image}`} className='img-fluid' alt="" />

                                                                :

                                                                <img src="/Defualt-profile.jpg" className='img-fluid' alt="logo" />


                                                        }


                                                    </div>


                                                    <div className='online-offline'>

                                                        <h5 className=' mt-3 ms-3 mb-0'>{item.username}</h5>

                                                        <p className={OnlineUsers.includes(item._id) ? "text-success" : "text-danger"}>{OnlineUsers.includes(item._id) ? "Online" : "Offline"}</p>

                                                    </div>


                                                </div>

                                            ))

                                            :

                                            <h1 className='text-danger'>No Users Found</h1>

                                    }

                                </div>

                            }




                            {/* USERS IN CHAT APP  */}
                            {
                                !searchstatus &&


                                <div className='chat-scroll w-100 mt-3'>


                                    {
                                        alluser ?

                                            alluser.map(item => (


                                                <div className='w-100 mt-3 d-flex align-items-center frnd' onClick={() => { userchat(item.image, item.username, item._id) }}>

                                                    <div className='frnd-profile position-relative'>

                                                        {

                                                            item.image ?

                                                                <img src={`${Base_url}/uploads/${item.image}`} className='img-fluid' alt="" />

                                                                :

                                                                <img src="/Defualt-profile.jpg" className='img-fluid' alt="logo" />

                                                        }



                                                        {/* <i class="fa-solid fa-circle fa-2xs "></i> */}

                                                    </div>


                                                    <div className='online-offline'>

                                                        <h5 className=' mt-3 ms-3 mb-0'>{item.username}</h5>

                                                        <p className={OnlineUsers.includes(item._id) ? "text-success" : "text-danger"}>{OnlineUsers.includes(item._id) ? "Online" : "Offline"}</p>

                                                    </div>


                                                    
                                                </div>

                                            ))

                                            :

                                            <h1>No Users Found</h1>

                                    }

                                </div>

                            }

                        </div>




                        {/* USER AND GROUP CHATS */}
                        <div className={mobview ? `col chats chatdisplay1` : `col-md-9 chats`} >


                            {/* DEFAULT CHAT */}
                            {

                                defaultchat &&


                                <div className='w-100 d-flex justify-content-center align-items-center h-100'>

                                    <img src="/Add_a_heading__1_-removebg-preview.png" className='img-fluid' alt="" />

                                </div>

                            }


                            {/* CHAT BOX */}
                            {

                                chatstatus &&


                                <ChatBox chatdefault={setdefaultchat} chatstatus={setchatstatus} mobview={setmobview} chatdata={chatdata} />


                            }


                            {/* EDIT PROFILE */}
                            {

                                editpro &&


                                < Editprofile editpro={seteditpro} chatdefault={setdefaultchat} mobview={setmobview} />


                            }



                        </div>


                    </div>

                </div>

            </section>



        </>


    )


}

export default Chat