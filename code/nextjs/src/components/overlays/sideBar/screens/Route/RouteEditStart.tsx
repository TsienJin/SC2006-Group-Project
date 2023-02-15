import TextInput from "@/components/fields/TextInput";
import {popLatest, sideBarStatesEnum} from "@/components/slice/sideBar";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "@/store";
import Button, {buttonColourBlue} from "@/components/clickeable/Button";
import {useState} from "react";

import {setStart} from "@/components/slice/route"
import {Hoist} from "@/components/fields/types";
import FormWrapper from "@/components/fields/FormWrapper";


const RouteEditStartScreen = () => {

  // TODO handle the click location portion to update state from dropdown
  // TODO duplicate for end route

  const location = useSelector((state:RootState) => state.route)
  const [placeVal, setPlaceVal] = useState<string>("")

  const dispatch = useDispatch()

  const handleUpdate = () => {
    dispatch(setStart(placeVal))
    dispatch(popLatest(sideBarStatesEnum.RouteStart))
  }

  const hoist:Hoist<string> = (value) => {
    setPlaceVal(value)
  }


  return(
  <FormWrapper action={handleUpdate}>
    <div className={"pt-2"}>
      <TextInput placeholder={"Start location"} defaultVal={location.start} hoist={hoist}/>
      <Button text={"Save"} colour={buttonColourBlue} action={handleUpdate}/>
    </div>
  </FormWrapper>
  )
}



export default RouteEditStartScreen