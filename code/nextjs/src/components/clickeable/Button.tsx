import FieldWrapper from "../fields/FieldWrapper"
import { Action, btnColour } from "./types"
import {all} from "axios";



export const buttonColourBlue:btnColour = {
  bg: "bg-violet",
  bgHover: "md:hover:bg-blue-600",
  text: "text-offwhite",
  textHover: "md:hover:text-offwhite"
}

export const buttonColourRust:btnColour = {
  bg: "bg-red-500",
  bgHover: "md:hover:bg-rust",
  text: "text-offwhite",
  textHover: "md:hover:text-offwhite"
}

export const buttonColourBlueOutline:btnColour = {
  bg: "bg-white ring-2 ring-violet",
  bgHover: "md:hover:bg-violet",
  text: "text-violet",
  textHover: "md:hover:text-offwhite"
}

export const buttonColourGreen:btnColour = {
  bg: "bg-green-500",
  bgHover: "md:hover:bg-green-400",
  text: "text-offwhite",
  textHover: "md:hover:text-offwhite"
}


const Button = ({text, colour, padding=true, allowed=true, action=()=>{}}:{text:string, colour:btnColour, padding?:boolean, allowed?:boolean, action?:Action}) => {


  const click = () => {
    if(allowed){
      action()
    }
  }

  return(
    <FieldWrapper xSpace={padding} ySpace={padding}>
      <button className={`w-full h-full p-2 rounded shadow transition-all ring-inset ${colour.bg} ${colour.text} ${colour.bgHover} ${colour.textHover} ${allowed?"":"md:cursor-not-allowed opacity-30"}`} onClick={click}>
        <span className={`first-letter:capitalize`}>{text}</span>
      </button>
    </FieldWrapper>
  )
}


export default Button