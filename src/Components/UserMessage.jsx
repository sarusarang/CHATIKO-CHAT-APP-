import React from 'react'
import './Messages.css'



function UserMessage({item,time}) {


  
  const date =  new Date(time)

  const hours = date.getHours();
  const minutes = date.getMinutes();
 

  const formattedTime = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;


  return (

    <>

      <section className='usermessages mt-2'>



        <div className='frnd-mesg bg ms-4'>


         

          <p className='mesg'>{item}</p>



          <div className='d-flex justify-content-end'>

            <p className='mb-0 mesg'>{formattedTime}</p>

          </div>



        </div>


      </section>



    </>






  )






}

export default UserMessage