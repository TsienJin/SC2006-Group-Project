import {middlewareOptions} from "@/middleware/types";
import axios from "axios";
import {setCookie, getCookies} from "cookies-next";


export async function postMiddleware(options:middlewareOptions, sendCredential:boolean=true, onErrorCallback=()=>{}):Promise<any> {

  try {
    const {data} = await axios.post(
      options.endpoint,
      {...options.params},
      {
        headers:
          {
            'Content-Type': 'multipart/form-data',
            // 'Access-Control-Allow-Credentials': true,
            // 'Access-Control-Allow-Methods': 'GET, POST, PATCH, PUT, DELETE, OPTIONS',
            ...options.headers,
          },
        // withCredentials: sendCredential,
      }
    )

    return data
  } catch (e) {
    console.error(e)
    onErrorCallback()
    throw new Error("Something wrong happened when fetching from backend.")
  }
}



export async function getMiddleWare(options:middlewareOptions, onErrorCallback=()=>{}):Promise<any> {

  try{
    const {data} = await axios.get(
      options.endpoint,
      {
        params: options.params,
        headers: options.headers
      },
    )

    return data

  } catch (e) {
    console.error(e)
    onErrorCallback()
    throw new Error("Something wrong happened when fetching from backend.")

  }
}