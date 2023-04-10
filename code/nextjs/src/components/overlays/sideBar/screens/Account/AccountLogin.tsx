import Logo from "@/components/fields/Logo";
import TextInput from "@/components/fields/TextInput";
import Button, {buttonColourBlue} from "@/components/clickeable/Button";
import {Action} from "@/components/clickeable/types";
import {useDispatch} from "react-redux";
import {addToStack, clearThenAddToStack, sideBarStatesEnum} from "@/components/slice/sideBar";
import LocalRedirect from "@/components/clickeable/LocalRedirect";
import SmallRight from "@/components/clickeable/SmallRight";
import {Hoist} from "@/components/fields/types";
import {useState} from "react";
import {login, User} from "@/components/slice/user";
import axios from 'axios'
import FormWrapper from "@/components/fields/FormWrapper";
import {Required, WTest} from "@/validation/fields/text";
import {middlewareOptions} from "@/middleware/types";
import * as process from "process";
import {getMiddleWare, postMiddleware} from "@/middleware/middleware";
import {addNoti, createNoti, notiType} from "@/components/slice/notification";
import {addFav, clearFav} from "@/components/slice/favtoilet";
import {ToiletInfo} from "@/components/mapbox/Markers/toilet";

export async function sendLogin(email:string, password:string, onErrorCallback=()=>{}):Promise<User|any> {

  // const res = await axios.get('https://jsonplaceholder.typicode.com/users/2')
  // const data = await res.data

  const options:middlewareOptions = {
    endpoint: `${process.env.NEXT_PUBLIC_BACKEND}/accounts/login/`,
    headers: {
      'Content-Type': 'multipart/form-data',
    },
    params: {
      'emailAddress': email,
      'password': password
    },
  }

  const checkForError = (val:any) => {
    if(val?.error_status == "401") throw "Incorrect Email"
  }

  let mRes={
    userName: "",
    userEmail: "",
    userID: "",
    sessionID:""
  }

  try{
    mRes = await postMiddleware(options, true)
    checkForError(mRes)
  } catch (e:any) {
    return false
  }

  return {
    name: mRes?.userName,
    email: mRes?.userEmail,
    id: mRes?.userID,
    cookie: mRes?.sessionID,
  }
}


const AccountLoginScreen = () => {

  const dispatch = useDispatch()

  const [email, setEmail] = useState<string>("")
  const [password, setPassword] = useState<string>("")

  const [emailErr, setEmailErr] = useState<string>("")
  const [passwordErr, setPasswordErr] = useState<string>("")
  const [formErr, setFormErr] = useState<string>("")


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

  // useEffect(()=>{
  //   setFormErr("")
  // }, [email, password])

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
      const errCallback = () => {
        dispatch(addNoti(createNoti(
          "Error logging in",
          "Something bad happened, I hope our grades are not affected",
          notiType.Warning
        )))
      }
      sendLogin(email, password, errCallback)
        .then((e:User|false)=>{
          if(e){
            setFormErr("")
            dispatch(login(e))
            dispatch(clearThenAddToStack(sideBarStatesEnum.Account))
            const options: middlewareOptions = {
              endpoint: `${process.env.NEXT_PUBLIC_BACKEND}/toilets/retrievefavourite/`,
              params: {
                userID: e.id
              }
            };

            getMiddleWare(options, )
              .then(r=>{
                console.log(r)
                dispatch(clearFav())
                r?.favourite_toilets.map((toilet:ToiletInfo) => {
                  dispatch(addFav(toilet))
                })
              })
              .catch(e=>{
                console.error(e)
              })
          } else {
            dispatch(addNoti(createNoti(
              "Error logging in",
              "Incorrect login credentials!",
              notiType.Warning
            )))
          }
        })
        .catch(e=>{
          console.error(e)
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
      <div className={"pt-[56px] w-full"}>
        <Logo />
        <TextInput placeholder={"Email"} required={true} validateTests={emailValidation} hoist={emailHoist}/>
        <TextInput placeholder={"Password"} type={"password"} required={true} validateTests={passValidation} hoist={passwordHoist}/>
        <Button text={"Log in"} colour={buttonColourBlue} allowed={email.length>0 && password.length>0}/>
        <span className={"flex flex-row justify-center items-center w-full text-center text-sm text-red-500"}>{formErr}</span>
        <LocalRedirect preText={"Create an account"} actionText={"here!"} action={createAcc} />
      </div>
    </FormWrapper>
  )
}




export default AccountLoginScreen