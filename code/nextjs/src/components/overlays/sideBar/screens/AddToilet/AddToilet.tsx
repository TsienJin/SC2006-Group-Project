import FieldContainer from "@/components/fields/FieldContainer";
import TextInput from "@/components/fields/TextInput";
import {useEffect, useState} from "react";
import {Address} from "@/Structs/toilet";
import {Hoist} from "@/components/fields/types";
import SelectInput, {Option, ratingOptions, SelectInputOptions} from "@/components/fields/SelectInput";
import Checkbox from "@/components/clickeable/Checkbox";




const Address = ({hoist=()=>{}}: {hoist?:Hoist<Address|undefined>}) => {

  const [address, setAddress] = useState<Address>()

  const [locName, setLocName] = useState("")
  const [country, setCountry] = useState("")
  const [addrLine1, setAddrLine1] = useState("")
  const [addrLine2, setAddrLine2] = useState("")
  const [postal, setPostal] = useState<number>()
  const [floor, setFloor] = useState<number>()
  const [unit, setUnit] = useState<number>()

  useEffect(()=>{
    setAddress({
      name: locName,
      country: country,
      addrLineOne: addrLine1,
      addrLineTwo: addrLine2,
      postal: postal,
      floorNumber: floor,
      unitNumber: unit,
    })
  }, [locName, country, addrLine1, addrLine2, postal, floor, unit])

  useEffect(()=>{
    hoist(address)
  }, [address, hoist])

  return(
    <FieldContainer name={"Address"}>
      <TextInput placeholder={"Location Name"} required={true}/>
      <TextInput placeholder={"Country"} required={true}/>
      <TextInput placeholder={"Address Line 1"} required={true}/>
      <TextInput placeholder={"Address Line 2"} required={false}/>
      <TextInput placeholder={"Postal Code"} required={true} type={"number"}/>
      <TextInput placeholder={"Floor Number"} type={"number"} />
      <TextInput placeholder={"Unit Number"} type={"number"} />
    </FieldContainer>
  )
}

const Location = () => {

  // TODO Hoist

  const locationOptions:SelectInputOptions = {
    options: [
      {
        value: "busInterchange",
        text: "Bus Interchange"
      },
      {
        value: "mrtStation",
        text: "MRT Station"
      },
    ],
    default: {
      value: "",
      text: "Select",
      disabled: false,
    }
  }

  return(
      <FieldContainer name={"Location"}>
        <SelectInput placeholder={"Location Type"} options={locationOptions} />
        <Checkbox preText={"Location is publicly accessible."} />
        <TextInput placeholder={"Description"} type={"textarea"} />
      </FieldContainer>
    )
}



const Review = () => {

  // TODO Hoist

  return(
    <FieldContainer name={"Review"}>
      <SelectInput placeholder={"Rating"} options={ratingOptions} />
      <TextInput placeholder={"Comments"} type={"textarea"} />
    </FieldContainer>
  )
}




const AddToilet = () => {

  // TODO Hoists
  // TODO Submit button

  const [address, setAddress] = useState<Address>()


  const addressHoist:Hoist<Address> = (value) => {
    setAddress(value)
  }

  return(
    <>
      <Address />
      <Location />
      <Review />
    </>
  )
}

export default AddToilet