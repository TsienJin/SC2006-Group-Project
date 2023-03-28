import Find, {FindCallback} from "@/components/mapbox/Find";
import {useDispatch} from "react-redux";
import {update} from "@/components/slice/location";


const FindScreen = () => {

  const dispatch = useDispatch()


  const selectCallback:FindCallback = (place) => {
    console.log(place)
    dispatch(update(place))
  }


  return(
    <Find label={"Find Location"} callback={selectCallback}/>
  )
}


export default FindScreen