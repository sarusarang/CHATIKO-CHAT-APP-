import React, { useState, useEffect } from 'react'
import './Auth.css'
import { Row, Col, Button } from 'react-bootstrap'
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import { Toaster, toast } from 'sonner';
import { userResgister } from '../Services/AllApi';




function Auth() {


    // STATE TO CHECK IF IT IS LOGIN OR CREATE AC
    const [createstatus, setcreatestatus] = useState(true)



    // GET DATA FROM THE INPUT FEILD
    const [data, setdata] = useState({

        username: "", email: "", password: "", image: ""

    })


    // TO GET THE PREVIEW OF THE PROFILE PICTURE
    const [preview, setpreview] = useState("")



    // TO SET MESSAGE TO USER IF THE IMAGE IS VAILD OR NOT
    const [imagestatus, setimagestatus] = useState(false)



    // Checking the image type is vaild or not
    useEffect(() => {

        if (data.image.type == "image/jpg" || data.image.type == "image/jpeg" || data.image.type == "image/png") {

            setpreview(URL.createObjectURL(data.image))
            setimagestatus(false)


        }
        else {

            setpreview("")
            setimagestatus(true)

        }

    }, [data.image])



    // Handel CreateAccount
    const submit = async () => {

        const { username, email, password, image } = data

        if (!username || !email || !password) {

            toast.warning("Invaild Inputs..! Enter Vaild Input")

        }
        else {


            const formdata = new FormData()

            formdata.append('username', username)
            formdata.append('email', email)
            formdata.append('password', password)
            preview ? formdata.append('image', image) : formdata.append('image', data.image)


            if (preview) {

                const reqheader = {

                    "Content-Type": "multipart/form-data"

                }

                const result = await userResgister(formdata, reqheader)


                if (result.status == 200) {

                    toast.success("Account Created Successfully")
                }
                else {

                    toast.warning(result.response.data)
                }

            }

            else {


                const reqheader = {

                    "Content-Type": "application/json"

                }

                const result = await userResgister(formdata, reqheader)


                if (result.status == 200) {

                    toast.success("Account Created Successfully")
                }
                else {

                    toast.warning(result.response.data)
                }

            }

        }

    }


    // TO PREVENT DEFAULT BEHAVIOUR OF FORM 
    const formsubmit = (e) => {

        e.preventDefault()

    }


    // Create Account status
    const createaccount = () => {

        setcreatestatus(!createstatus)

    }



    return (

        <>

            {/* LOGIN AND ACCOUNT CREATION */}


            <section className='Auth-main d-flex justify-content-center align-items-center'>



                <div className=' login'>

                    <Row className='justify-content-center'>

                        <Col md={6} sm={6} className='images'>

                            {
                                createstatus ?

                                    <img src="/Add_a_heading__1_-removebg-preview.png" className='img-fluid' alt="image" />

                                    :

                                    <img src={preview ? preview : "/Defualt-profile.jpg"} className='img-fluid profile-img' alt="image" />




                            }

                            {

                                !createstatus && imagestatus &&

                                <p className='text-danger text-center'>Invaild Image Format</p>

                            }

                        </Col>


                        <Col md={6} sm={12}>


                            {
                                createstatus ?

                                    <h1 className='text-center text-white'>Login</h1>

                                    :

                                    <h1 className='text-center text-white'>Sign Up</h1>
                            }



                            <div>

                                <div>

                                    <Form onSubmit={(e) => { formsubmit(e) }}>


                                        {
                                            !createstatus &&

                                            <FloatingLabel className='mb-3 lable' controlId="user" label="UserName">

                                                <Form.Control type="text" onChange={(e) => { setdata({ ...data, username: e.target.value }) }} placeholder="Username" />

                                            </FloatingLabel>

                                        }



                                        <FloatingLabel className='mb-3 lable' controlId="user" label="Email">

                                            <Form.Control type="email" onChange={(e) => { setdata({ ...data, email: e.target.value }) }} placeholder="Email" />

                                        </FloatingLabel>



                                        <FloatingLabel className='mb-3 lable' controlId="user" label="password">

                                            <Form.Control type="password" onChange={(e) => { setdata({ ...data, password: e.target.value }) }} placeholder="Password" />

                                        </FloatingLabel>


                                        {

                                            !createstatus &&

                                            <div>

                                                <label for="formFile" class="form-label">Profile Picture</label>



                                                <Form.Control type="file" onChange={(e) => { setdata({ ...data, image: e.target.files[0] }) }} className='lable mb-3' />




                                            </div>




                                        }



                                        {
                                            createstatus ?

                                                <Button type='submit' className='login-btn w-100 mb-2'>Login</Button>

                                                :

                                                <Button type='submit' onClick={submit} className='login-btn w-100 mb-2'>Create Account</Button>

                                        }


                                    </Form>


                                    <Button className='login-btn w-100' onClick={createaccount}>{createstatus ? "Create An Account" : "Already A User?"}</Button>

                                </div>




                            </div>


                        </Col>

                    </Row>


                </div>

                <Toaster richColors position='bottom-center' />

            </section>

        </>







    )
}

export default Auth