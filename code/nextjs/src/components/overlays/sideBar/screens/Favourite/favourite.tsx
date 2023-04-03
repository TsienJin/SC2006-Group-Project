import {useDispatch, useSelector} from "react-redux";
import {RootState} from "@/store";
import {useEffect} from "react";
import {middlewareOptions} from "@/middleware/types";
import * as process from "process";
import {getMiddleWare, postMiddleware} from "@/middleware/middleware";


const FavouriteScreen = () => {

  const userState = useSelector((state:RootState) => state.user)
  const dispatch = useDispatch()


  useEffect(()=>{
    const options: middlewareOptions = {
      endpoint: `${process.env.NEXT_PUBLIC_BACKEND}/toilets/retrievefavourite/`,
    };

    postMiddleware(options, true)
      .then(r=>{
        console.log(r)
      })
      .catch(e=>{
        console.error(e)
      })
  },[])


  return(
    <></>
  )
}


export default FavouriteScreen