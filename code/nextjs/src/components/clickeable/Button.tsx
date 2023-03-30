import FieldWrapper from "../fields/FieldWrapper"
import { Action, btnColour } from "./types"



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


const Button = ({text, colour, padding=true, action=()=>{}}:{text:string, colour:btnColour, padding?:boolean, action?:Action}) => {


  // TODO waiting state

  return(
    <FieldWrapper xSpace={padding} ySpace={padding}>
      <button className={`w-full h-full p-2 rounded shadow transition-all ring-inset ${colour.bg} ${colour.text} ${colour.bgHover} ${colour.textHover}`} onClick={action}>
        <span className={`first-letter:capitalize`}>{text}</span>
      </button>
    </FieldWrapper>
  )
}


export default Button