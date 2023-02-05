import FieldWrapper from "../fields/FieldWrapper"
import { Action, btnColour } from "./types"




const Button = ({text, colour, padding=true, action=()=>{}}:{text:string, colour:btnColour, padding?:boolean, action?:Action}) => {
  return(
    <FieldWrapper xSpace={padding} ySpace={padding}>
      <button className={`w-full h-full p-2 rounded shadow transition-all ${colour.bg} ${colour.text} ${colour.bgHover} ${colour.textHover}`} onClick={action}>
        <span className={`first-letter:capitalize`}>{text}</span>
      </button>
    </FieldWrapper>
  )
}


export default Button