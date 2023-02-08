import Button from "@/components/clickeable/Button"
import Checkbox from "@/components/clickeable/Checkbox"
import ItemClickable, { ItemIcons } from "@/components/clickeable/Item"
import Redirect from "@/components/clickeable/Redirect"
import Tab from "@/components/clickeable/Tab"
import { Action, btnColour, link } from "@/components/clickeable/types"
import BoxTextInput from "@/components/fields/BoxTextInput"
import FieldContainer from "@/components/fields/FieldContainer"
import Logo from "@/components/fields/Logo"
import PasswordGroup from "@/components/fields/PasswordGroup"
import SelectInput, { SelectInputOptions } from "@/components/fields/SelectInput"
import TextInput from "@/components/fields/TextInput"
import { Hoist } from "@/components/fields/types"
import { ValidateInputText } from "@/validation/fields/text"
import { useState } from "react"



const ExampleScreen = () => {


  const [helloVal, setHelloVal] = useState<string>("")


  const helloHoist:Hoist<string> = (value) => {
    setHelloVal(value)
  }


  const exampleInputTest1:ValidateInputText = (input:string) => {
    if(input === "test"){
      return "This test example works!"
    }

    return false
  }

  const selectOptions:SelectInputOptions = {
    options: [
      {
        value: "Key",
        text: "Value"
      },
      {
        value: 'Something new',
        text: 'Hello',
        disabled: true
      },
    ],
    default: {
      value: "Default thing",
      text: "defaultThing",
      disabled: true,
    }
  }


  const tabAction:Action = () => {
    console.log("Example!")
  }

  const reDir:link = {
    text: "World",
    url: "/",
    target: "_blank"
  }

  const btnColour:btnColour = {
    bg: "bg-violet",
    text: "text-offwhite",
    bgHover: "md:hover:bg-blue-600",
    textHover: "md:hover:text-text-offwhite"
  }



  return (
    <>
      <Logo />
      <FieldContainer name="Something">
        <TextInput placeholder="Hello" hoist={helloHoist} required={false} validateTests={[exampleInputTest1]}/>
        <PasswordGroup />
        <TextInput placeholder="Comments" type="textarea" />
        <SelectInput placeholder="Something" options={selectOptions}/>
        <BoxTextInput placeholder="BoxText" />
        <Tab itemName="Item" placeholder="Something Cool" action={tabAction}/>
        <ItemClickable name="Something" icon={ItemIcons.Location} />
        <ItemClickable name="My Fav" icon={ItemIcons.Favourite} />
        <ItemClickable name="Rocket" icon={ItemIcons.Rocket} />
        <Redirect preText="Hello" link={reDir} />
        <Checkbox preText="HELLO" link={reDir}/>
        <Checkbox preText="world" />
        <Button text="This button" colour={btnColour}/>
      </FieldContainer>
    </>
  )
}


export default ExampleScreen