import {middlewareOptions} from "@/middleware/types";
import axios from "axios";
import {setCookie, getCookies} from "cookies-next";


export async function postMiddleware(options:middlewareOptions, sendCredential:boolean=true, OnErrorCallback=()=>{}):Promise<any> {

  try {
    const {data} = await axios.post(
      options.endpoint,
      {...options.params},
      {
        headers:
          {
            'Content-Type': 'multipart/form-data',
            // 'Access-Control-Allow-Credentials': true,
            ...options.headers,
          },
        withCredentials: sendCredential,
      }
    )

    console.log(data)
    // setCookie("session_id", data?.sessionID)

    return data
  } catch (e) {
    console.error(e)
  }

  return null
}