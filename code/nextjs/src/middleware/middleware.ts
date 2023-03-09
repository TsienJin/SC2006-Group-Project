import {middleware, middlewareOptions} from "@/middleware/types";
import axios from "axios";


export async function postMiddleware(options:middlewareOptions):Promise<any> {

  const {data} = await axios.post(options.endpoint, {...options.params}, {headers: {...options.headers}})
  console.log(data)

  return data
}