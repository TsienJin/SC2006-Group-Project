import Tab from "@/components/clickeable/Tab";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "@/store";
import {logout, User} from "@/components/slice/user";
import {Action} from "@/components/clickeable/types";
import {addToStack, sideBarStatesEnum} from "@/components/slice/sideBar";
import Button, {buttonColourRust} from "@/components/clickeable/Button";
import {middlewareOptions} from "@/middleware/types";
import {getMiddleWare, postMiddleware} from "@/middleware/middleware";
import * as process from "process";
import {clearFav} from "@/components/slice/favtoilet";



async function sendLogout(option:middlewareOptions) {
  return await getMiddleWare(option)
}

const AccountScreen = () => {

  const user:User = useSelector((state:RootState) => state.user)
  const dispatch = useDispatch()

  const logoutAction:Action = () => {
    // TODO logout action
    const option:middlewareOptions = {
      endpoint: `${process.env.NEXT_PUBLIC_BACKEND}/sg/v1/accounts/logout/`,
    }
    sendLogout(option).then(r => {})
    dispatch(logout())
    dispatch(clearFav())
  }

  return(
    <div>
      <Tab itemName={"Name"} placeholder={user.name} action={()=>{dispatch(addToStack(sideBarStatesEnum.AccountEditName))}}/>
      <Tab itemName={"Email"} placeholder={user.email}  action={()=>{dispatch(addToStack(sideBarStatesEnum.AccountEditEmail))}} />
      <Tab itemName={"Password"} placeholder={"Change password"}  action={()=>{dispatch(addToStack(sideBarStatesEnum.AccountEditPassword))}} />
      <Button text={"Log out"} colour={buttonColourRust} action={logoutAction} />
    </div>
    )
}

export default AccountScreen