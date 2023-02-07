import ItemClickable from "@/components/clickeable/Item";
import Tab from "@/components/clickeable/Tab";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "@/store";
import {logout, User} from "@/components/slice/user";
import Button, {buttonColourRust} from "@/components/clickeable/Button";
import {Action} from "@/components/clickeable/types";


const AccountScreen = () => {

  const user:User = useSelector((state:RootState) => state.user)
  const dispatch = useDispatch()

  const logoutAction:Action = () => {
    // TODO logout action
    dispatch(logout())
  }

  return(
    <div>
      <Tab itemName={"Name"} placeholder={user.name} />
      <Tab itemName={"Email"} placeholder={user.email} />
      <Tab itemName={"Password"} placeholder={"Change password"} />
      <Button text={"Log out"} colour={buttonColourRust} action={logoutAction} />
    </div>
    )
}

export default AccountScreen