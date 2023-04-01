import FieldContainer from "@/components/fields/FieldContainer";
import TextInput from "@/components/fields/TextInput";
import {useCallback, useEffect, useState} from "react";
import {Address, AddToilet, Description, Review} from "@/Structs/toilet";
import {Hoist} from "@/components/fields/types";
import SelectInput, {Option, ratingOptions, SelectInputOptions} from "@/components/fields/SelectInput";
import Checkbox from "@/components/clickeable/Checkbox";
import Find, {FindCallback} from "@/components/mapbox/Find";
import Tab from "@/components/clickeable/Tab";
import {Coordinates, emptyCoords} from "@/components/slice/location";
import {MinNumberZero} from "@/validation/fields/text";
import Button, {buttonColourBlue, buttonColourGreen} from "@/components/clickeable/Button";
import {Action} from "@/components/clickeable/types";



const AddressInput = ({hoist=()=>{}}:{hoist?:Hoist<Coordinates>}) => {

  const [activeSelect, setActiveSelect] = useState<boolean>(false)
  const [coords, setCoords] = useState<Coordinates>(emptyCoords)


  const addrCallback:FindCallback = res => {
    setCoords(res)
    setActiveSelect(false)
  }

  useEffect(()=>{
    hoist(coords)
  }, [coords, hoist])


  return(
    <>
      {
        activeSelect?
          <Find label={"Location"} topPad={false} callback={addrCallback} defaultVal={coords.address}/>
          :
          <Tab itemName={"Set address"} placeholder={coords.name || "Choose a location"} action={()=>{setActiveSelect(true)}}/>
      }
    </>
  )
}


const Address = ({hoist=()=>{}}: {hoist?:Hoist<Address|undefined>}) => {

  const [address, setAddress] = useState<Address>()

  const [coords, setCoords] = useState<Coordinates>(emptyCoords)
  const [floor, setFloor] = useState<number>(NaN)
  const [unit, setUnit] = useState<number>(NaN)



  const coordsHoist:Hoist<Coordinates> = value => {
    setCoords(value)
  }


  const floorHoist:Hoist<number> = value => {
    setFloor(value)
  }

  const unitHoist:Hoist<number> = value => {
    setUnit(value)
  }

  useEffect(()=>{
    hoist({
      coordinates: {
        lat: coords.latitude,
        long: coords.longitude,
      },
      name: coords.name,
      address: coords.address,
      postal: coords.postal,
      floorNumber: floor,
      unitNumber: unit
    })
  }, [coords, floor, unit])

  return(
    <FieldContainer name={"Address"}>
      <AddressInput hoist={coordsHoist} />
      <TextInput placeholder={"Floor Number"} type={"number"} hoist={floorHoist} />
      <TextInput placeholder={"Unit Number"} type={"number"} hoist={unitHoist} validateTests={[MinNumberZero]}/>
    </FieldContainer>
  )
}

const Description = ({hoist=()=>{}}:{hoist?:Hoist<Description>}) => {



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
      {
        value: "mall",
        text: "Shopping Mall"
      },
      {
        value: "others",
        text: "Others"
      }
    ],
  }

  const [locationType, setLocationType] = useState<Option>(locationOptions.options[0])
  const [isPublic, setIsPublic] = useState<boolean>(true)
  const [description, setDescription] = useState<string>("")



  const updateHoist = () => { // prevents infinite recursion
      hoist({
        locationType: locationType,
        isPublic: isPublic,
        description: description
      })
  }

  useEffect(()=>{
    updateHoist()
  },[locationType, isPublic, description]) //eslint-disable-line

  const locationHoist:Hoist<Option> = value => {
    setLocationType(value)
  }

  const isPublicHoist:Hoist<boolean> = value => {
    if(value!=isPublic){
      setIsPublic(value)
    }
  }

  const descriptionHoist:Hoist<string> = value => {
    setDescription(value)
    updateHoist()
  }




  return(
      <FieldContainer name={"Description"}>
        <SelectInput placeholder={"Location Type"} options={locationOptions} hoist={locationHoist} />
        <Checkbox preText={"Location is publicly accessible."} checked={isPublic} hoist={isPublicHoist}/>
        <TextInput placeholder={"Description"} type={"textarea"} hoist={descriptionHoist}/>
      </FieldContainer>
    )
}



const Review = ({hoist=()=>{}}:{hoist?:Hoist<Review>}) => {

  const [rating, setRating] = useState<Option>(ratingOptions.options[0])
  const [comment, setComment] = useState<string>("")


  const updateHoist = () => {
    hoist({
        rating: rating,
        comment: comment
      })
  }

  useEffect(()=>{}, [rating, comment])

  const optionHoist:Hoist<Option> = value => {
    setRating(value)
    updateHoist()
  }

  const commentHoist:Hoist<string> = value => {
    setComment(value)
    updateHoist()
  }

  return(
    <FieldContainer name={"Review"}>
      <SelectInput placeholder={"Rating"} options={ratingOptions} hoist={optionHoist}/>
      <TextInput placeholder={"Comments"} type={"textarea"} hoist={commentHoist}/>
    </FieldContainer>
  )
}




const AddToilet = () => {

  const [address, setAddress] = useState<Address>()
  const [description, setDescription] = useState<Description>()
  const [review, setReview] = useState<Review>()

  const addressHoist:Hoist<Address|undefined> = (value) => {
    setAddress(value)
  }

  const descriptionHoist:Hoist<Description|undefined> = value => {
    setDescription(value)
  }

  const reviewHoist:Hoist<Review|undefined> = value => {
    setReview(value)
  }

  const sendForm:Action = () => {
    const info:AddToilet = {
      address: address,
      description: description,
      initialReview: review,
    }

    console.log(info)
  }

  return(
    <>
      <Address hoist={addressHoist}/>
      <Description hoist={descriptionHoist}/>
      <Review hoist={reviewHoist}/>
      <Button text={"Add Toilet"} colour={buttonColourGreen} action={sendForm} />
    </>
  )
}

export default AddToilet