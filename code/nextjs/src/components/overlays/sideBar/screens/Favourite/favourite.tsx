import {useDispatch, useSelector} from "react-redux";
import {RootState} from "@/store";
import {useEffect, useState} from "react";
import {middlewareOptions} from "@/middleware/types";
import * as process from "process";
import {getMiddleWare, postMiddleware} from "@/middleware/middleware";
import {addToStack, popLatest, sideBarStatesEnum} from "@/components/slice/sideBar";
import {addNoti, createNoti, notiType} from "@/components/slice/notification";
import AccountLoginScreen from "@/components/overlays/sideBar/screens/Account/AccountLogin";


const FavouriteScreen = () => {

  const userState = useSelector((state:RootState) => state.user)
  const sidebarState = useSelector((state:RootState) => state.sideBar.stack)
  const [userLatch, setUserLatch] = useState<typeof userState>(userState)
  const dispatch = useDispatch()




  useEffect(()=>{
    if(userState.name){
      const options: middlewareOptions = {
        endpoint: `${process.env.NEXT_PUBLIC_BACKEND}/toilets/retrievefavourite/`,
        params: {
          userID: userState.id
        }
      };

      getMiddleWare(options, )
        .then(r=>{
          console.log(r)
        })
        .catch(e=>{
          console.error(e)
        })
    }
  },[]) //eslint-disable-line




  useEffect(()=>{
    if(userState!=userLatch && userState.id){
      dispatch(popLatest(sideBarStatesEnum.Account))
      dispatch(addToStack(sideBarStatesEnum.Favourites))
      setUserLatch(userState)
    }
  }, [userState]) //eslint-disable-line


  if(!userState.name && sidebarState.slice(-1)[0] == sideBarStatesEnum.Favourites){

    dispatch(addNoti(createNoti(
      "You need to be logged in!",
      "Unable to view favourites if you're not logged in.",
      notiType.Warning
    )))

    return(
      <AccountLoginScreen />
    )
  }





  return(
    <></>
  )
}


export default FavouriteScreen