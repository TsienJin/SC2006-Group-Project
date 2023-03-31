import FormWrapper from "@/components/fields/FormWrapper";
import TextInput from "@/components/fields/TextInput";
import Button, {buttonColourBlue} from "@/components/clickeable/Button";
import SelectInput, {ratingOptions} from "@/components/fields/SelectInput";
import FieldWrapper from "@/components/fields/FieldWrapper";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "@/store";
import {addNoti, createNoti, notiType} from "@/components/slice/notification";
import AccountLoginScreen from "@/components/overlays/sideBar/screens/Account/AccountLogin";
import {useEffect, useState} from "react";
import {addToStack, popLatest, sideBarStatesEnum} from "@/components/slice/sideBar";


const ReviewScreen = () => {

  const toilet = useSelector((state:RootState) => state.toiletInterest)
  const userState = useSelector((state:RootState) => state.user)

  const [userLatch, setUserLatch] = useState<typeof userState>(userState)

  const dispatch = useDispatch()



  useEffect(()=>{
    if(userState!=userLatch && userState.id){
      dispatch(popLatest(sideBarStatesEnum.Account))
      dispatch(addToStack(sideBarStatesEnum.Review))
      setUserLatch(userState)
    }
  }, [userState]) //eslint-disable-line



  if(!userState.name){
    dispatch(addNoti(createNoti(
      "You need to be logged in!",
      "To prevent spam, we require you to be logged in before you write a review.",
      notiType.Warning
    )))

    return(
      <AccountLoginScreen />
    )
  }

  return(
    <FormWrapper>
      <FieldWrapper>
        <span className={"font-medium text-xl"}>{toilet.Address.name || toilet.Address.address}</span>
      </FieldWrapper>
      <SelectInput placeholder={"Rating"} options={ratingOptions} />
      <TextInput placeholder={"Review"} type={"textarea"} />
      <Button text={"Submit"} colour={buttonColourBlue} />
    </FormWrapper>
  )
}

export default ReviewScreen