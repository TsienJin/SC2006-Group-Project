import Logo from "@/components/fields/Logo";
import TextInput from "@/components/fields/TextInput";
import PasswordGroup from "@/components/fields/PasswordGroup";
import Button, {buttonColourBlue} from "@/components/clickeable/Button";
import {Action} from "@/components/clickeable/types";
import {useDispatch} from "react-redux";
import {addToStack, popLatest, popStack, sideBarStatesEnum} from "@/components/slice/sideBar";
import LocalRedirect from "@/components/clickeable/LocalRedirect";
import FormWrapper from "@/components/fields/FormWrapper";
import {useState} from "react";
import {Hoist} from "@/components/fields/types";
import {middlewareOptions} from "@/middleware/types";
import {postMiddleware} from "@/middleware/middleware";
import * as process from "process";
import {addNoti, createNoti} from "@/components/slice/notification";
import {login} from "@/components/slice/user";


async function sendCreate(option:middlewareOptions):Promise<any> {
  return await postMiddleware(option)
}


const AccountCreateScreen = () => {

  const dispatch = useDispatch()

  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [nameValid, setNameValid] = useState(false)
  const [emailValid, setEmailValid] = useState(false)
  const [passwordValid, setPasswordValid] = useState(false)

  const nameHoist:Hoist<string> = value => {
    setName(value)
  }
  const emailHoist:Hoist<string> = value => {
    setEmail(value)
  }
  const passwordHoist:Hoist<string> = value => {
    setPassword(value)
  }

  const redirectLogin:Action = () => {
    dispatch(popStack())
  }

  const checkSubmittable = ():boolean => {
    return(name.length!=0 && nameValid && email.length!=0 && emailValid && password.length!=0 && passwordValid)
  }

  const formSubmit:Action = () => {
    if(checkSubmittable()){
      const options:middlewareOptions = {
        endpoint: `${process.env.NEXT_PUBLIC_BACKEND}/accounts/create`,
        params: {
          "name": name,
          "emailAddress": email,
          "password": password,
        },
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      }

      dispatch(addNoti(createNoti(
        `Hello ${name}!`,
        "Your account has been created!"
      )))

      sendCreate(options).then(r=>{
        console.log(r)
        if(r?.usrEmail){
          dispatch(login(
            {
              name: r?.usrName,
              email: r?.usrEmail,
              id: r?.usrID,
              cookie: r?.sessionID
            }
          ))
          dispatch(popLatest(sideBarStatesEnum.AccountCreate))
          dispatch(addToStack(sideBarStatesEnum.Account))
        }
      })
    }
  }

  return(
    <FormWrapper action={formSubmit}>
      <div className={"pt-[56px]"}>
        <Logo />
        <TextInput placeholder={"Name"} required={true} hoist={nameHoist} hoistValid={setNameValid}/>
        <TextInput placeholder={"Email"} required={true} hoist={emailHoist} hoistValid={setEmailValid}/>
        <PasswordGroup hoist={passwordHoist} hoistValid={setPasswordValid}/>
        <Button text={"Create account"} colour={buttonColourBlue} />
        <LocalRedirect preText={"Already have an account?"} actionText={"Login here!"} action={redirectLogin} />
      </div>
    </FormWrapper>
  )
}


export default AccountCreateScreen