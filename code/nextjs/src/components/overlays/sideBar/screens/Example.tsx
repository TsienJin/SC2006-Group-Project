import FieldContainer from "@/components/fields/FieldContainer"
import Logo from "@/components/fields/Logo"
import PasswordGroup from "@/components/fields/PasswordGroup"
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
    console.log(input)
    if(input === "test"){
      return "This test example works!"
    }

    return false
  }



  return (
    <>
      <Logo />
      <FieldContainer name="Something">
        <TextInput placeholder="Hello" hoist={helloHoist} required={true} validateTests={[exampleInputTest1]}/>
        <PasswordGroup />
      </FieldContainer>
    </>
  )
}


export default ExampleScreen