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
import {middlewareOptions} from "@/middleware/types";
import * as process from "process";
import {postMiddleware} from "@/middleware/middleware";
import {ValidateInputText, ValidEmail} from "@/validation/fields/text";
import {addNoti, createNoti, notiType} from "@/components/slice/notification";


const AccountEditEmail = () => {

  const globalUser:User = useSelector((state:RootState) => state.user)
  const dispatch = useDispatch()

  const [email, setEmail] = useState<string>("")
  const [isValid, setIsValid] = useState<boolean>(false)

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
      const options:middlewareOptions = {
        endpoint: `${process.env.NEXT_PUBLIC_BACKEND}/accounts/editemail`,
        params: {
          'emailAddress': newUsr.email,
        }
      }

      try {
        postMiddleware(options).then(r=>{
          dispatch(addNoti(createNoti(
            "Edit Successful!",
            "Your email has been updated!"
          )))
        })
      } catch (e) {
        dispatch(addNoti(createNoti(
          "Server Error",
          "Unable to update your email due to a server fault!",
          notiType.Warning
        )))
      }

      dispatch(updateEmail(newUsr))
      dispatch(popLatest(sideBarStatesEnum.AccountEditEmail))
    }
  }

  const validateTest:ValidateInputText[] = [
    ValidEmail
  ]

  return(
    <FormWrapper action={submit}>
      <div className={"pt-2"}>
        <TextInput placeholder={"Update email"} hoist={hoistEmail} defaultVal={globalUser.email} hoistValid={hoistValid} required={true} validateTests={validateTest} />
        <Button text={"Save changes"} colour={buttonColourGreen}/>
      </div>
    </FormWrapper>
  )
}

export default AccountEditEmail