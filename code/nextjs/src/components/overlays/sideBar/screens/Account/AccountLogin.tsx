import Logo from "@/components/fields/Logo";
import TextInput from "@/components/fields/TextInput";
import Button, {buttonColourBlue} from "@/components/clickeable/Button";
import {Action} from "@/components/clickeable/types";
import {useDispatch} from "react-redux";
import {addToStack, clearThenAddToStack, sideBarStatesEnum} from "@/components/slice/sideBar";
import LocalRedirect from "@/components/clickeable/LocalRedirect";
import SmallRight from "@/components/clickeable/SmallRight";
import {Hoist} from "@/components/fields/types";
import {useEffect, useState} from "react";
import {login, User} from "@/components/slice/user";
import axios from 'axios'
import FormWrapper from "@/components/fields/FormWrapper";
import {Required, WTest} from "@/validation/fields/text";


async function sendLogin(email:string, password:string):Promise<User> {

  const res = await axios.get('https://jsonplaceholder.typicode.com/users/2')
  const data = await res.data

  return {
    name: data?.name,
    email: data?.email,
    id: data?.id,
    cookie: data?.cookie,
  }
}


const AccountLoginScreen = () => {

  const dispatch = useDispatch()

  const [email, setEmail] = useState<string>("")
  const [password, setPassword] = useState<string>("")

  const [emailErr, setEmailErr] = useState<string>("")
  const [passwordErr, setPasswordErr] = useState<string>("")


  const emailHoist:Hoist<string> = (value) => {
    setEmail(value)
  }

  const passwordHoist:Hoist<string> = (value) => {
    setPassword(value)
  }

  const createAcc:Action = () => {
    dispatch(addToStack(sideBarStatesEnum.AccountCreate))
  }
  const forgetAction:Action = () => {
    dispatch(addToStack(sideBarStatesEnum.AccountForget))
  }

  const formSubmit:Action = () => {
    if(!email){
      setEmailErr("this field is required!")
    } else {
      setEmailErr("")
    }

    if(!password){
      setPasswordErr("this field is required!")
    } else {
      setEmailErr("")
    }

    if(email && password){
      sendLogin(email, password).then(e=>{
        dispatch(login(e))
        dispatch(clearThenAddToStack(sideBarStatesEnum.Account))
      })
    }
  }

  const emailValidation = [
    Required,
    WTest
  ]

  const passValidation = [
    WTest
  ]



  return(
    <FormWrapper action={()=>formSubmit()}>
      <div className={"pt-[56px]"}>
        <Logo />
        <TextInput placeholder={"Email"} required={true} validateTests={emailValidation} hoist={emailHoist}/>
        <TextInput placeholder={"Password"} type={"password"} required={true} validateTests={passValidation} hoist={passwordHoist}/>
        <SmallRight preText={"Forgot password?"} actionText={"Reset here"} action={forgetAction} />
        <Button text={"Log in"} colour={buttonColourBlue} action={formSubmit} />
        <LocalRedirect preText={"Create an account"} actionText={"here!"} action={createAcc} />
      </div>
    </FormWrapper>
  )
}




export default AccountLoginScreen