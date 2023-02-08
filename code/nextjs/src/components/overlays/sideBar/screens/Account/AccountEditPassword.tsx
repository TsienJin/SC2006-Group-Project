import Button, {buttonColourGreen} from "@/components/clickeable/Button";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "@/store";
import {popStack, sideBarStatesEnum} from "@/components/slice/sideBar";
import {useState} from "react";
import {updateName, User} from "@/components/slice/user";
import TextInput from "@/components/fields/TextInput";
import {Hoist} from "@/components/fields/types";
import {Action} from "@/components/clickeable/types";
import PasswordGroup from "@/components/fields/PasswordGroup";




const AccountEditPassword = () => {

  const globalUser:User = useSelector((state:RootState) => state.user)
  const dispatch = useDispatch()

  const [password, setPassword] = useState<string>("")
  const [isValid, setIsValid] = useState<boolean>(false)

  const hoistPassword:Hoist<string> = (value) => {
    setPassword(value)
  }

  const hoistValid:Hoist<boolean> = (value) => {
    setIsValid(value)
  }

  const submit:Action = () => {

    if(isValid){
      // TODO update DB
      dispatch(popStack())
    }
  }

  return(
    <div className={"pt-2"}>
      <PasswordGroup hoist={hoistPassword} hoistValid={hoistValid}/>
      <Button text={"Save changes"} colour={buttonColourGreen} action={submit}/>
    </div>
  )
}

export default AccountEditPassword