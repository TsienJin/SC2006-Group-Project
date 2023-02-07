import Logo from "@/components/fields/Logo";
import TextInput from "@/components/fields/TextInput";
import Button from "@/components/clickeable/Button";
import {Action, btnColour, link} from "@/components/clickeable/types";
import {useDispatch} from "react-redux";
import {addToStack, sideBarStatesEnum} from "@/components/slice/sideBar";
import LocalRedirect from "@/components/clickeable/LocalRedirect";


const AccountScreen = () => {

  const dispatch = useDispatch()

  const buttonColour:btnColour = {
    bg: "bg-violet",
    bgHover: "md:hover:bg-blue-600",
    text: "text-offwhite",
    textHover: "md:hover:text-offwhite"
  }

  const registerAction:Action = () => {
    dispatch(addToStack(sideBarStatesEnum.AccountCreate))
  }


  return(
    <div className={"pt-[56px]"}>
      <Logo />
      <TextInput placeholder={"Email"} required={true} />
      <TextInput placeholder={"Password"} type={"password"} required={true} />
      <Button text={"Log in"} colour={buttonColour} />
      <LocalRedirect preText={"Create an account"} actionText={"here!"} action={registerAction} />
    </div>
  )
}




export default AccountScreen