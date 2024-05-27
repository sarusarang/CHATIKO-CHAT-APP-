import React from 'react'
import './Messages.css'



function OtherMessage({item,time}) {


    const date =  new Date(time)

    const hours = date.getHours();
    const minutes = date.getMinutes();
   

    const formattedTime = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
    

    return (

        <>

            <section className='othermessage mt-5'>



                <div className='frnd-mesg ms-4'>


                    {/* <h5>SARANG</h5> */}

                    <p className='mesg'>{item}</p>


                    <div className='d-flex justify-content-end'>

                        <p className='mb-0 text-white mesg'>{formattedTime}</p>

                    </div>

                </div>


            </section>


        </>






    )







}

export default OtherMessage