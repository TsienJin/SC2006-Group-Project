import Logo from "@/components/fields/Logo";
import TextInput from "@/components/fields/TextInput";
import PasswordGroup from "@/components/fields/PasswordGroup";
import Button, {buttonColourBlue} from "@/components/clickeable/Button";
import {Action, btnColour} from "@/components/clickeable/types";
import {useDispatch} from "react-redux";
import {popStack} from "@/components/slice/sideBar";
import LocalRedirect from "@/components/clickeable/LocalRedirect";


const AccountCreateScreen = () => {

  const dispatch = useDispatch()

  const buttonColour:btnColour = {
    bg: "bg-violet",
    bgHover: "md:hover:bg-blue-600",
    text: "text-offwhite",
    textHover: "md:hover:text-offwhite"
  }

  const redirectLogin:Action = () => {
    dispatch(popStack())
  }

  return(
    <div className={"pt-[56px]"}>
      <Logo />
      <TextInput placeholder={"Name"} required={true} />
      <TextInput placeholder={"Email"} required={true} />
      <PasswordGroup />
      <Button text={"Create account"} colour={buttonColourBlue} />
      <LocalRedirect preText={"Already have an account?"} actionText={"Login here!"} action={redirectLogin} />
    </div>
  )
}


export default AccountCreateScreen