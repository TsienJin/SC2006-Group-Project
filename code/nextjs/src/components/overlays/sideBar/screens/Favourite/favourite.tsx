import {useDispatch, useSelector} from "react-redux";
import {RootState} from "@/store";
import {useEffect, useState} from "react";
import {middlewareOptions} from "@/middleware/types";
import * as process from "process";
import {getMiddleWare, postMiddleware} from "@/middleware/middleware";
import {addToStack, popLatest, sideBarStatesEnum} from "@/components/slice/sideBar";
import {addNoti, createNoti, notiType} from "@/components/slice/notification";
import AccountLoginScreen from "@/components/overlays/sideBar/screens/Account/AccountLogin";
import toilet, {ToiletInfo} from "@/components/mapbox/Markers/toilet";
import {AutofillSuggestion} from "@mapbox/search-js-core";
import {FindCallback} from "@/components/mapbox/Find";
import {v4} from "uuid";
import {setToiletInterest} from "@/components/slice/toiletInterest";
import {update} from "@/components/slice/location";
import {addFav} from "@/components/slice/favtoilet";
import Toilet from "@/components/mapbox/Markers/toilet";




const ToiletFavourite = ({item, callback=()=>{}}:{item:ToiletInfo, callback?:any}) => {

  const dispatch = useDispatch()

  const clicked = () => {
    console.log(item)
    dispatch(update({...item.Address.coordinates, found:true}))
  }

  return(
    <div onClick={clicked}
         className={`transition flex flex-row m-1 p-2 cursor-pointer
      text-shadow rounded-md
      md:hover:shadow md:hover:bg-gray-300 md:hover:text-shadow`}>
      <div className={"flex flex-col justify-items-start items-start"}>
        <span className={"font-normal"}>{item.Address.name}</span>
        <span className={"text-sm font-light opacity-50"}>{item.Address.address}</span>
      </div>
    </div>
  )
}


const FavouriteScreen = () => {

  const userState = useSelector((state:RootState) => state.user)
  const sidebarState = useSelector((state:RootState) => state.sideBar.stack)
  const [userLatch, setUserLatch] = useState<typeof userState>(userState)
  const dispatch = useDispatch()

  // const [favToilet, setFavToilet] = useState<ToiletInfo[]>([])

  const favToilet = useSelector((state:RootState) => state.favToilet.favourites)


  useEffect(()=>{
    if(userState.name.length>0){
      const options: middlewareOptions = {
        endpoint: `${process.env.NEXT_PUBLIC_BACKEND}/toilets/retrievefavourite/`,
        params: {
          userID: userState.id
        }
      };

      getMiddleWare(options, )
        .then(r=>{
          console.log(r)
          r?.favourite_toilets.map((toilet:ToiletInfo) => {
            dispatch(addFav(toilet))
          })
        })
        .catch(e=>{
          console.error(e)
        })
    }
  }, [userState]) //eslint-disable-line




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
    <>
      {
        favToilet.map(toilet=>{
          return(
            <ToiletFavourite item={toilet} key={v4()} />
          )
        })
      }
    </>
  )
}


export default FavouriteScreen