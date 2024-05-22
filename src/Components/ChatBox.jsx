import React from 'react'
import './Chatbox.css'

function ChatBox({ chatdefault,setchatstatus}) {





    return (



        <div onClick={()=>{chatdefault(true),setchatstatus(false)}}>ChatBox</div>


    )



}

export default ChatBox


