import {MinPassLength, PassMinCharNum, ValidateInputText} from "@/validation/fields/text"
import { useEffect, useState } from "react"
import TextInput from "./TextInput"
import { Hoist } from "./types"




const PasswordGroup = ({validateTest=[], hoist=(value)=>{}, hoistValid=()=>{}}:{validateTest?:ValidateInputText[], hoist?:Hoist<string>, hoistValid?:Hoist<boolean>}) => {

  const [passVal, setPassVal] = useState<string>("")
  const [cPassVal, setCPassVal] = useState<string>("")
  const [passErr, setPassErr] = useState<string>("")

  const passHoist:Hoist<string> = value => {
    setPassVal(value)
  }

  const cPassHoist:Hoist<string> = value => {
    setCPassVal(value)
  }

  useEffect(()=>{

    // ensure that passwords are the same
    if((passVal!=cPassVal) && passVal.length>0 && cPassVal.length>0){
      setPassErr("Passwords do not match!")
      hoistValid(false)
    } else {
      setPassErr("")
      hoist(passVal)
      hoistValid(true)
    }

  },[passVal, cPassVal])


  return(
    <>
      <TextInput placeholder="Password" forceErrorMessage={passErr} required={true} type="password" hoist={passHoist} validateTests={validateTest} />
      <TextInput placeholder="Confirm Password" forceErrorMessage={passErr} required={true} type="password" hoist={cPassHoist} validateTests={[]} />
    </>
  )
}


export default PasswordGroup