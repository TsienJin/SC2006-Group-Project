import Checkbox from "@/components/clickeable/Checkbox";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "@/store";
import {Action} from "@/components/clickeable/types";
import {setAvoidMotor, setAvoidTolls} from "@/components/slice/route";
import {Hoist} from "@/components/fields/types";


const RouteOptions = () => {

  const optionState = useSelector((state:RootState) => state.route.options)
  const dispatch = useDispatch()

  const motorHoist:Hoist<boolean> = (value) => {
    dispatch(setAvoidMotor(value))
  }

  const tollHoist:Hoist<boolean> = value => {
    dispatch(setAvoidTolls(value))
  }


  return(
    <>
      <Checkbox preText={"Avoid Motorways"} checked={optionState.avoidMotor} hoist={motorHoist} />
      <Checkbox preText={"Avoid Tolls"} checked={optionState.avoidTolls} hoist={tollHoist}/>
    </>
  )
}

export default RouteOptions