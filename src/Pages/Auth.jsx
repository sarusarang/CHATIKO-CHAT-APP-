import React, { useState } from 'react'
import './Auth.css'
import { Row, Col, Button } from 'react-bootstrap'
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';





function Auth() {

    // STATE TO CHECK IF IT IS LOGIN OR CREATE AC
    const [createstatus, setcreatestatus] = useState(true)

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

                        <Col md={6} sm={6}  className='images'>

                            {
                                createstatus ?

                                    <img src="/Add_a_heading__1_-removebg-preview.png" className='img-fluid' alt="image" />

                                    :

                                    <img src="/Defualt-profile.jpg" className='img-fluid profile-img' alt="image" />


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

                                    <Form>


                                        {
                                            !createstatus &&

                                            <FloatingLabel className='mb-3 lable' controlId="user" label="UserName">

                                                <Form.Control type="email" placeholder="Username" />

                                            </FloatingLabel>

                                        }



                                        <FloatingLabel className='mb-3 lable' controlId="user" label="Email">

                                            <Form.Control type="email" placeholder="Email" />

                                        </FloatingLabel>



                                        <FloatingLabel className='mb-3 lable' controlId="user" label="password">

                                            <Form.Control type="password" placeholder="Password" />

                                        </FloatingLabel>


                                        {

                                            !createstatus &&

                                            <div>

                                                <label for="formFile" class="form-label">Profile Picture</label>

                                               

                                                    <Form.Control type="file" className='lable mb-3' />

                                                


                                            </div>




                                        }



                                        {
                                            createstatus ?

                                                <Button type='submit' className='login-btn w-100 mb-2'>Login</Button>

                                                :

                                                <Button type='submit' className='login-btn w-100 mb-2'>Create Account</Button>

                                        }


                                    </Form>


                                    <Button className='login-btn w-100' onClick={createaccount}>{createstatus ? "Create An Account" : "Already A User?"}</Button>

                                </div>




                            </div>


                        </Col>

                    </Row>


                </div>

            </section>

        </>







    )
}

export default Auth