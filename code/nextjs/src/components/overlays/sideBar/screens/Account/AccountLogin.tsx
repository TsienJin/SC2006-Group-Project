import Logo from "@/components/fields/Logo";
import TextInput from "@/components/fields/TextInput";
import Button, {buttonColourBlue} from "@/components/clickeable/Button";
import {Action} from "@/components/clickeable/types";
import {useDispatch} from "react-redux";
import {addToStack, sideBarStatesEnum} from "@/components/slice/sideBar";
import LocalRedirect from "@/components/clickeable/LocalRedirect";
import SmallRight from "@/components/clickeable/SmallRight";


const AccountLoginScreen = () => {

  const dispatch = useDispatch()

  const registerAction:Action = () => {
    dispatch(addToStack(sideBarStatesEnum.AccountCreate))
  }

  const forgetAction:Action = () => {
    dispatch(addToStack(sideBarStatesEnum.AccountForget))
  }


  return(
    <div className={"pt-[56px]"}>
      <Logo />
      <TextInput placeholder={"Email"} required={true} />
      <TextInput placeholder={"Password"} type={"password"} required={true} />
      <SmallRight preText={"Forgot password?"} actionText={"Reset here"} action={forgetAction} />
      <Button text={"Log in"} colour={buttonColourBlue} />
      <LocalRedirect preText={"Create an account"} actionText={"here!"} action={registerAction} />
    </div>
  )
}




export default AccountLoginScreen