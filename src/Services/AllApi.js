import { CommponApi } from "./CommonApi";

 export const Base_url = "http://localhost:3000"



// UserRegister
export const userResgister = async(data,headers)=>{


    return await CommponApi('POST',`${Base_url}/register`,data,headers)

}



// userLogin
export const userlogin = async (data)=>{

    return await CommponApi('POST',`${Base_url}/login`,data,"")
    

}

//getUser
export const getUser = async(header)=>{

    return await CommponApi('GET',`${Base_url}/getuser`,"",header)

}

//EDIT USERDATA
export const edituser = async (data,header)=>{

    
    console.log(header);

    return await CommponApi('PUT',`${Base_url}/edituser`,data,header)

}