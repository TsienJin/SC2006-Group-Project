import FieldContainer from "@/components/fields/FieldContainer";
import SelectInput, {Option, SelectInputOptions} from "@/components/fields/SelectInput";
import Checkbox from "@/components/clickeable/Checkbox";
import {Hoist} from "@/components/fields/types";
import {useDispatch, useSelector} from "react-redux";
import {setLang, setToilet, setTraffic} from "@/components/slice/system";
import {RootState} from "@/store";


const SettingScreen = () => {

  const systemState = useSelector((state:RootState) => state.system)
  const dispatch = useDispatch()

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



  return(
    <div>
      <FieldContainer name={"Global"}>
        <SelectInput placeholder={"Language"} options={langOptions} />
      </FieldContainer>
      <FieldContainer name={"Filter"}>
        <Checkbox preText={"Show toilets"} checked={systemState.showToilet} hoist={toiletHoist}/>
        <Checkbox preText={"Show traffic incidents"} checked={systemState.showTraffic} hoist={trafficHoist}/>
      </FieldContainer>
    </div>
  )
}

export default SettingScreen