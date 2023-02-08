import Button, {buttonColourGreen} from "@/components/clickeable/Button";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "@/store";
import {useState} from "react";
import {updateEmail, updateName, User} from "@/components/slice/user";
import TextInput from "@/components/fields/TextInput";
import {Hoist} from "@/components/fields/types";
import {Action} from "@/components/clickeable/types";
import {popStack} from "@/components/slice/sideBar";




const AccountEditEmail = () => {

  const globalUser:User = useSelector((state:RootState) => state.user)
  const dispatch = useDispatch()

  const [email, setEmail] = useState<string>("")
  const [isValid, setIsValid] = useState<boolean>(false)

  // TODO email valid tests

  const hoistEmail:Hoist<string> = (value) => {
    setEmail(value)
  }

  const hoistValid:Hoist<boolean> = (value) => {
    setIsValid(value)
  }

  const submit:Action = () => {

    const newUsr = {
      name: globalUser.name,
      email: email,
      id: globalUser.id
    }

    if(isValid){
      // TODO update db
      dispatch(updateEmail(newUsr))
      dispatch(popStack())
    }
  }

  return(
    <div className={"pt-2"}>
      <TextInput placeholder={"Update email"} hoist={hoistEmail} hoistValid={hoistValid} required={true} />
      <Button text={"Save changes"} colour={buttonColourGreen} action={submit}/>
    </div>
  )
}

export default AccountEditEmail