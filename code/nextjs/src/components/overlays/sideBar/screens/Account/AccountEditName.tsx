import Button, {buttonColourGreen} from "@/components/clickeable/Button";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "@/store";
import {popLatest, sideBarStatesEnum} from "@/components/slice/sideBar";
import {useState} from "react";
import {updateName, User} from "@/components/slice/user";
import TextInput from "@/components/fields/TextInput";
import {Hoist} from "@/components/fields/types";
import {Action} from "@/components/clickeable/types";
import FormWrapper from "@/components/fields/FormWrapper";
import {middlewareOptions} from "@/middleware/types";
import * as process from "process";
import {postMiddleware} from "@/middleware/middleware";
import {addNoti, createNoti, notiType} from "@/components/slice/notification";

// async function sendEdit(option:middlewareOptions):Promise<any> {
//   return await postMiddleware(option)
// }

const AccountEditName = () => {

  const globalUser:User = useSelector((state:RootState) => state.user)
  const dispatch = useDispatch()

  const [name, setName] = useState<string>("")
  const [isValid, setIsValid] = useState<boolean>(false)

  const hoistName:Hoist<string> = (value) => {
    setName(value)
  }

  const hoistValid:Hoist<boolean> = (value) => {
    setIsValid(value)
  }

  const submit:Action = () => {

    const newUsr = {
      name: name,
      email: globalUser.email,
      id: globalUser.id,
      cookie: globalUser.cookie,
    }

    if(isValid){
      const options:middlewareOptions = {
        endpoint: `${process.env.NEXT_PUBLIC_BACKEND}/accounts/editname/`,
        params: {
          name: newUsr.name
        },
        headers: {
        }
      }

    postMiddleware(options, true)
      .then(r=>{console.log(r)})
      .catch(e => {
        console.error(e)
        dispatch(addNoti(createNoti(
          "Error changing name!",
          "Something bad happened while attempting to change your name.",
          notiType.Warning
        )))
      })


      dispatch(updateName(newUsr))
      dispatch(popLatest(sideBarStatesEnum.AccountEditName))
    }
  }

  return(
    <FormWrapper action={submit}>
      <div className={"pt-2"}>
        <TextInput placeholder={"Update name"} defaultVal={globalUser.name} hoist={hoistName} hoistValid={hoistValid} required={true} />
        <Button text={"Save changes"} colour={buttonColourGreen}/>
      </div>
    </FormWrapper>
  )
}

export default AccountEditName