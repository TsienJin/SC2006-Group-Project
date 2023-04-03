import Button, {buttonColourGreen} from "@/components/clickeable/Button";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "@/store";
import {popLatest, sideBarStatesEnum} from "@/components/slice/sideBar";
import {useState} from "react";
import {User} from "@/components/slice/user";
import {Hoist} from "@/components/fields/types";
import {Action} from "@/components/clickeable/types";
import PasswordGroup from "@/components/fields/PasswordGroup";
import {middlewareOptions} from "@/middleware/types";
import * as process from "process";
import {postMiddleware} from "@/middleware/middleware";
import {MinPassLength, PassMinCharNum, ValidateInputText} from "@/validation/fields/text";


const AccountEditPassword = () => {

  const globalUser:User = useSelector((state:RootState) => state.user)
  const dispatch = useDispatch()

  const [password, setPassword] = useState<string>("")
  const [isValid, setIsValid] = useState<boolean>(false)

  const hoistPassword:Hoist<string> = (value) => {
    setPassword(value)
  }

  const hoistValid:Hoist<boolean> = (value) => {
    setIsValid(value)
  }

  const submit:Action = () => {

    if(isValid){
      const options:middlewareOptions = {
        endpoint: `${process.env.NEXT_PUBLIC_BACKEND}/accounts/editpassword/`,
        params: {
          password: password
        }
      }

      postMiddleware(options).then(r => {})

      dispatch(popLatest(sideBarStatesEnum.AccountEditPassword))
    }
  }

  const validateTests:ValidateInputText[] = [
    MinPassLength,
    PassMinCharNum,
  ]

  return(
    <div className={"pt-2"}>
      <PasswordGroup hoist={hoistPassword} hoistValid={hoistValid} validateTest={validateTests}/>
      <Button text={"Save changes"} colour={buttonColourGreen} action={submit}/>
    </div>
  )
}

export default AccountEditPassword