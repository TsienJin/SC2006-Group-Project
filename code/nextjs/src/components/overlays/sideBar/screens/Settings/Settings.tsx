import FieldContainer from "@/components/fields/FieldContainer";
import SelectInput, {Option, SelectInputOptions} from "@/components/fields/SelectInput";
import Checkbox from "@/components/clickeable/Checkbox";
import {Hoist} from "@/components/fields/types";
import {useDispatch, useSelector} from "react-redux";
import {setToilet, setTraffic} from "@/components/slice/system";
import {RootState} from "@/store";
import {Action, link} from "@/components/clickeable/types";
import TabLink from "@/components/clickeable/TabLink";
import Button, {buttonColourRust} from "@/components/clickeable/Button";
import {useState} from "react";
import {middlewareOptions} from "@/middleware/types";
import {getMiddleWare} from "@/middleware/middleware";
import {addNoti, createNoti, notiType} from "@/components/slice/notification";


const SettingScreen = () => {

  const systemState = useSelector((state:RootState) => state.system)
  const dispatch = useDispatch()

  const [updateToiletButtonText, setUpdateToiletButtonText] = useState<string>("EXPENSIVE! Update Toilets")
  const [allowUpdateToilet, setAllowUpdateToilet] = useState<boolean>(true)

  const langOptions:SelectInputOptions = {
    options: [],
    default: {
      value: 'english',
      text: 'English'
    }
  }

  const langHoist:Hoist<Option> = (value) => {
    // TODO cant think of the best way to do this
  }

  const toiletHoist:Hoist<boolean> = (value) => {
    dispatch(setToilet(value))
  }

  const trafficHoist:Hoist<boolean> = (value) => {
    dispatch(setTraffic(value))
  }

  const bugLink:link = {
    url: 'https://forms.gle/v6TMgK1sYvVrrDj37',
    target: '_blank',
    text: 'Report them here'
  }

  const updateToilet:Action = () => {
    if(allowUpdateToilet){
      const options:middlewareOptions = {
        endpoint: `${process.env.NEXT_PUBLIC_BACKEND}/settings/updatetoilet/`
      }

      dispatch(addNoti(createNoti(
        "Fetching updated toilets!",
        "This might take a while...",
        notiType.Notification
      )))

      setAllowUpdateToilet(false)
      setUpdateToiletButtonText("Loading...")

      getMiddleWare(options)
        .then(r=>{
          console.log(r)
          dispatch(addNoti(createNoti(
            "Updated toilets!",
            "Refresh to view updates! There goes ~1000 API calls :(",
            notiType.Notification
          )))
        })
        .catch(e=>{
          console.error(e)
          dispatch(addNoti(createNoti(
            "Error updating toilets!",
            "Something went wrong fetching the toilet data from the backend",
            notiType.Warning
          )))
        })
        .finally(()=>{
          setAllowUpdateToilet(true)
          setUpdateToiletButtonText("EXPENSIVE! Update Toilets")
        })
    }
  }



  return(
    <div>
      <FieldContainer name={"Global"}>
        <SelectInput placeholder={"Language"} options={langOptions} />
      </FieldContainer>
      <FieldContainer name={"Filter"}>
        <Checkbox preText={"Show toilets"} checked={systemState.showToilet} hoist={toiletHoist}/>
        <Checkbox preText={"Show traffic incidents"} checked={systemState.showTraffic} hoist={trafficHoist}/>
      </FieldContainer>
      <FieldContainer name={"Get in Touch"} >
        <TabLink itemName={"Found a bug?"} link={bugLink} />
      </FieldContainer>
      <FieldContainer name={"Demo"} defaultExpand={false}>
        <Button text={updateToiletButtonText} colour={buttonColourRust} action={updateToilet} allowed={allowUpdateToilet}/>
      </FieldContainer>
    </div>
  )
}

export default SettingScreen