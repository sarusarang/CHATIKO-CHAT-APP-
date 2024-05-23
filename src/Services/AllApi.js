import { CommponApi } from "./CommonApi";

const Base_url = "http://localhost:3000" 


export const userResgister = async(data,headers)=>{


    return await CommponApi('POST',`${Base_url}/register`,data,headers)

}