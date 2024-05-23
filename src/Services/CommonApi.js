import axios from "axios";


export const CommponApi = async(reqmethod,apiurl,reqbody,reqheaders)=>{


    const config={

        method:reqmethod,
        url:apiurl,
        data:reqbody,
        headers: reqheaders? reqheaders :{"Content-Type":"application/json"}


    }

    return await axios(config).then(res=>{return res}).catch(err=>{return err})


}