import Logo from "@/components/fields/Logo";
import TextInput from "@/components/fields/TextInput";
import Button, {buttonColourBlue} from "@/components/clickeable/Button";


const AccountForgetPassword = () => {

  return(
    <div>
      <Logo />
      <TextInput placeholder={"Email"} required={true} />
      <Button text={"Reset password"} colour={buttonColourBlue} />
    </div>
  )
}


export default AccountForgetPassword