import Button, {buttonColourGreen} from "@/components/clickeable/Button";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "@/store";
import {popStack, sideBarStatesEnum} from "@/components/slice/sideBar";
import {useState} from "react";
import {updateName, User} from "@/components/slice/user";
import TextInput from "@/components/fields/TextInput";
import {Hoist} from "@/components/fields/types";
import {Action} from "@/components/clickeable/types";




const AccountEditName = () => {

  const globalUser:User = useSelector((state:RootState) => state.user)
  const dispatch = useDispatch()

  const [name, setName] = useState<string>("")
  const [isValid, setIsValid] = useState<boolean>(false)

  // TODO name valid tests

  const hoistName:Hoist<string> = (value) => {
    setName(value)
  }

  const hoistValid:Hoist<boolean> = (value) => {
    setIsValid(value)
  }

  const submit:Action = () => {

    const newUsr = {
      name: name,
      email: globalUser.email,
      id: globalUser.id
    }

    console.log(isValid)

    if(isValid){
      // TODO update DB
      // TODO error case
      dispatch(updateName(newUsr))
      dispatch(popStack())
    }
  }

  return(
    <div className={"pt-2"}>
      <TextInput placeholder={"Update name"} hoist={hoistName} hoistValid={hoistValid} required={true} />
      <Button text={"Save changes"} colour={buttonColourGreen} action={submit}/>
    </div>
  )
}

export default AccountEditName