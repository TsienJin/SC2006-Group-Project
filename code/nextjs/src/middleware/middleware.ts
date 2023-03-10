import {middlewareOptions} from "@/middleware/types";
import axios from "axios";
import {setCookie, getCookies} from "cookies-next";


export async function postMiddleware(options:middlewareOptions):Promise<any> {

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
        withCredentials: true,
      }
    )

    console.log(data)
    // setCookie("session_id", data?.sessionID)

      if (data?.sessionID) {
        // console.log(data?.sessionID)
        // setCookie("sessionid", data?.sessionID)
        // console.log(getCookies())
      }

    return data
  } catch (e) {
    console.error(e)
  }

  return null
}