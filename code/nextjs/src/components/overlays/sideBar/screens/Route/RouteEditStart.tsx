import TextInput from "@/components/fields/TextInput";
import {sideBarStatesEnum} from "@/components/slice/sideBar";
import {useSelector} from "react-redux";
import {RootState} from "@/store";


const RouteEditStartScreen = () => {

  // TODO handle the click location portion to update state
  // TODO duplicate for end route


  return(
    <div className={"pt-2"}>
      <TextInput placeholder={"Start"}/>
    </div>
  )
}



export default RouteEditStartScreen