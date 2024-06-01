import React from 'react'
import './Messages.css'
import { useEffect, useRef, useState } from 'react'
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { Deleteonechat } from '../Services/AllApi';
import { useDispatch } from 'react-redux';
import { DeleteOne } from '../../REDUX STORE/User';
import { Base_url } from '../Services/AllApi';

function UserMessage({ item, sendid , chatid }) {


  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);


  const dispatch = useDispatch()


  const [deleteid, setdeleteid] = useState("")

  const token = sessionStorage.getItem("token")



  // Scroll effect
  const scroll = useRef()
  const scroll2 = useRef()
  useEffect(() => {

    scroll.current?.scrollIntoView({ behavior: "smooth" });

    scroll2.current?.scrollIntoView({ behavior: "smooth" });


  }, [item])




  // MODAL OPEN
  const DeleteChat = (_id) => {

    setdeleteid(_id)
    handleShow()

  }



  // DELETE ONE CHAT
  const deleteonechat = async () => {

    const auth = {

      "Authorization": `Bearer ${token}`
    }

    const res = await Deleteonechat(deleteid, auth ,chatid)

    if (res.status == 200) {

      dispatch(DeleteOne(res.data))
      handleClose()

    }
    else {

      console.log("error");
    }

  }

  return (

    <>


      {

        item.map(mesg => (

          mesg.sender == sendid ?

            <div>

              <section className='usermessages mt-2' ref={scroll}>


                <div className='frnd-mesg bg ms-4'>


                  {
                    mesg.text &&


                    <p className='mesg'>{mesg.text}</p>


                  }




                  <div className='d-flex justify-content-end delete-chat'>

                    <p className='mb-0 mesg'>{new Date(mesg.timestamp).toLocaleString('en-IN', { timeZone: 'Asia/Kolkata', hour: 'numeric', minute: 'numeric', hour12: true })}</p>

                    <i class="fa-solid fa-trash-can text-danger mt-1 ms-2" onClick={() => { DeleteChat(mesg._id) }}></i>

                  </div>


                </div>

              </section>


              {
                mesg.image &&

                <div className='d-flex justify-content-end'>

                  <a href={`${Base_url}/uploads/${mesg.image}`} download className='d-flex justify-content-end'>

                    <img src={`${Base_url}/uploads/${mesg.image}`} width={"80%"} className='img-fluid me-2 mt-3 send-img' alt="" />

                  </a>

                </div>


              }


            </div>




            :


            <div>

              <section className='othermessage mt-5' ref={scroll2}>


                <div className='frnd-mesg ms-4'>


                  {/* <h5>SARANG</h5> */}

                  <p className='mesg'>{mesg.text}</p>


                  <div className='d-flex justify-content-end delete-chat'>

                    <p className='mb-0 text-white mesg'>{new Date(mesg.timestamp).toLocaleString('en-IN', { timeZone: 'Asia/Kolkata', hour: 'numeric', minute: 'numeric', hour12: true })}</p>

                    <i class="fa-solid fa-trash-can text-danger mt-1 ms-2" onClick={() => { DeleteChat(mesg._id) }}></i>


                  </div>

                </div>

              </section>


              {
                mesg.image &&


                <div className='d-flex justify-content-start'>

                  <a href={`${Base_url}/uploads/${mesg.image}`} download>

                    <img src={`${Base_url}/uploads/${mesg.image}`} width={"80%"} className='img-fluid ms-3 mt-3 send-img' alt="" />


                  </a>


                </div>

              }

            </div>



        ))

      }


      <Modal

        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
        aria-labelledby="contained-modal-title-vcenter"
        centered
        className='text-danger'

      >


        <Modal.Header closeButton>

        </Modal.Header>
        <Modal.Body className='text-center'>
          Are You Sure You Want To Delete This Message For Both...
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" className='modal-btn' onClick={handleClose}>
            No
          </Button>
          <Button variant="primary" className='modal-btn' onClick={deleteonechat}>Yes</Button>
        </Modal.Footer>

      </Modal>


    </>

  )






}

export default UserMessage