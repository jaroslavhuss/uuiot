import { GLOBAL_URL } from "../GLOBAL_URL"
import { FetchMethods } from "../interface/methods.enum";


/**
 * 
 * @param url API URLS coming from Nest. List of APIS can be found in MD document
 * @param method one of POST, GET, PATCH and DELETE
 * @param data OPTIONAL param - Interface of any object we want
 */
export const fetchAPI = async <Type>(url:string, method:FetchMethods, data?:object):Promise<Type> =>{
    //Look for a token
    const token: string | null = localStorage.getItem("token"); 

    const response:Response = await fetch(GLOBAL_URL+url,{
        method,
        headers: {
            "Content-type": "application/json",
            Authorization: `Bearer ${token}`,
        },
        body:JSON.stringify(data) 
    })

  
  
    //Get the object based on the interface or get the Error
    const dataResponse:Type= await response.json();
 
    /**
     * Logic for the refresh token
     */

    return dataResponse;
}
