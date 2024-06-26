import { CommponApi } from "./CommonApi";

export const Base_url = "https://chat-server-s6h8.onrender.com"



// UserRegister
export const userResgister = async (data, headers) => {


    return await CommponApi('POST', `${Base_url}/register`, data, headers)

}



// userLogin
export const userlogin = async (data) => {

    return await CommponApi('POST', `${Base_url}/login`, data, "")


}

//getUser
export const getUser = async (header) => {

    return await CommponApi('GET', `${Base_url}/getuser`, "", header)

}

//EDIT USERDATA
export const edituser = async (data, header) => {

    return await CommponApi('PUT', `${Base_url}/edituser`, data, header)

}


//GetAllusers
export const getallusers = async (header) => {

    return await CommponApi("GET", `${Base_url}/getallusers`, "", header)


}

// SEND CHAT
export const sendchat = async (data, headers) => {

    console.log(headers);
    return await CommponApi("POST", `${Base_url}/sendchat`, data, headers)
  
}

// Getchats
export const getchats = async (id, headers) => {

    return await CommponApi("GET", `${Base_url}/getchats/${id}`, "", headers)

}

// DELETE ALL CHATS
export const clearallchats = async (id, headers) => {

    return await CommponApi("DELETE", `${Base_url}/deleteAllChats/${id}`,"", headers)

}


// DELETE ONE CHAT
export const Deleteonechat = async (id, headers ,chatid) => {
   

    return await CommponApi("DELETE", `${Base_url}/deleteOneChats/${id}/${chatid}`,"", headers)

}