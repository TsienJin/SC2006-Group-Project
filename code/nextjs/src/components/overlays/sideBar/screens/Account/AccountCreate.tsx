import Logo from "@/components/fields/Logo";
import TextInput from "@/components/fields/TextInput";
import PasswordGroup from "@/components/fields/PasswordGroup";
import Button, {buttonColourBlue} from "@/components/clickeable/Button";
import {Action} from "@/components/clickeable/types";
import {useDispatch} from "react-redux";
import {clearThenAddToStack, popStack, sideBarStatesEnum} from "@/components/slice/sideBar";
import LocalRedirect from "@/components/clickeable/LocalRedirect";
import FormWrapper from "@/components/fields/FormWrapper";
import {useState} from "react";
import {Hoist} from "@/components/fields/types";
import {middlewareOptions} from "@/middleware/types";
import {postMiddleware} from "@/middleware/middleware";
import * as process from "process";
import {addNoti, createNoti, notiType} from "@/components/slice/notification";
import {
  MaxPassLen,
  MinPassLength,
  PassMinCharNum,
  ValidAge,
  ValidAgeMax,
  ValidAgeMin,
  ValidEmail
} from "@/validation/fields/text";
import {sendLogin} from "@/components/overlays/sideBar/screens/Account/AccountLogin";
import user, {login, User} from "@/components/slice/user";


async function sendCreate(option:middlewareOptions, onSuccess=()=>{}, onError=(e?:any)=>{}):Promise<any> {
  try{
    const res = await postMiddleware(option)
    console.log(res)
    onSuccess()
    return res
  } catch (e) {
    console.log("fk")
    onError(e)
  }
}


const AccountCreateScreen = () => {

  const dispatch = useDispatch()

  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [age, setAge] = useState<number>(NaN)
  const [nameValid, setNameValid] = useState(false)
  const [emailValid, setEmailValid] = useState(false)
  const [passwordValid, setPasswordValid] = useState(false)
  const [ageValid, setAgeValid] = useState(false)

  const nameHoist:Hoist<string> = value => {
    setName(value)
  }
  const emailHoist:Hoist<string> = value => {
    setEmail(value)
  }
  const passwordHoist:Hoist<string> = value => {
    setPassword(value)
  }

  const ageHoist:Hoist<number> = value =>{
    setAge(Number(value))
    console.log(Number(value), value)
  }

  const redirectLogin:Action = () => {
    dispatch(popStack())
  }

  const checkSubmittable = ():boolean => {
    return(
      name.length!=0 && nameValid &&
      email.length!=0 && emailValid &&
      password.length!=0 && passwordValid && password.length<256 &&
      age>=18 && age<300
    )
  }

  const formSubmit:Action = () => {
    if(checkSubmittable()){
      const options:middlewareOptions = {
        endpoint: `${process.env.NEXT_PUBLIC_BACKEND}/sg/v1/accounts/register/`,
        params: {
          "name": name,
          "emailAddress": email,
          "password": password,
        },
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      }

      const onError = (e?:string) => {
        dispatch(addNoti(createNoti(
          "Error creating account!",
          `${e}` || "Error sending the form. Try again using guest mode!",
          notiType.Warning,
        )))
      }

      const onErrorLogin = (e?:any) => {
        dispatch(addNoti(createNoti(
          "Error logging in",
          e?.error_message || "Not sure why we couldn't log you in, so just try again!",
          notiType.Warning
        )))
      }

      const onSuccess = () => {
        dispatch(addNoti(createNoti(
          `Hello ${name}`,
          "Welcome to NaviLoo!",
          notiType.Notification
        )))

        sendLogin(email, password, onErrorLogin)
          .then((e:User|false)=>{
            if(e){
              dispatch(login(e))
              dispatch(clearThenAddToStack(sideBarStatesEnum.Account))
            } else {
              onErrorLogin()
            }
        })


      }

      // sendCreate(options, onSuccess, onError).then(r => console.log(r))

      postMiddleware(options, true)
        .then(r=>{
          console.log(r)
          if(r?.error_status){
            // throw new Error(r?.error_message)
            onError(r?.error_message)
            throw new Error()
          }

          onSuccess()
        })
        .catch(e=>{
          console.error(e)
          // onError(e)
        })

    }
  }

  return(
    <FormWrapper action={formSubmit}>
      <div className={"pt-[56px]"}>
        <Logo />
        <TextInput placeholder={"Name"} required={true} hoist={nameHoist} hoistValid={setNameValid} />
        <TextInput placeholder={"Email"} required={true} hoist={emailHoist} hoistValid={setEmailValid} validateTests={[ValidEmail]}/>
        <PasswordGroup hoist={passwordHoist} hoistValid={setPasswordValid} validateTest={[PassMinCharNum, MinPassLength, MaxPassLen]} />
        <TextInput placeholder={"Age"} required={true} hoist={ageHoist} hoistValid={setAgeValid} type={"number"} validateTests={[ValidAge, ValidAgeMin, ValidAgeMax]}/>
        <Button text={"Create account"} colour={buttonColourBlue} allowed={checkSubmittable()} />
        <LocalRedirect preText={"Already have an account?"} actionText={"Login here!"} action={redirectLogin} />
      </div>
    </FormWrapper>
  )
}


export default AccountCreateScreen