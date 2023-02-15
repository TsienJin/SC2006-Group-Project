import Button, {buttonColourGreen} from "@/components/clickeable/Button";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "@/store";
import {useState} from "react";
import {updateEmail, User} from "@/components/slice/user";
import TextInput from "@/components/fields/TextInput";
import {Hoist} from "@/components/fields/types";
import {Action} from "@/components/clickeable/types";
import {popLatest, sideBarStatesEnum} from "@/components/slice/sideBar";
import FormWrapper from "@/components/fields/FormWrapper";


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
      id: globalUser.id,
      cookie: globalUser.cookie,
    }

    if(isValid){
      // TODO update db
      dispatch(updateEmail(newUsr))
      dispatch(popLatest(sideBarStatesEnum.AccountEditEmail))
    }
  }

  return(
    <FormWrapper action={submit}>
      <div className={"pt-2"}>
        <TextInput placeholder={"Update email"} hoist={hoistEmail} defaultVal={globalUser.email} hoistValid={hoistValid} required={true} />
        <Button text={"Save changes"} colour={buttonColourGreen} action={submit}/>
      </div>
    </FormWrapper>
  )
}

export default AccountEditEmail