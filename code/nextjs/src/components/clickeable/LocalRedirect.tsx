import FieldWrapper from "../fields/FieldWrapper"
import {Action} from "./types"



const LocalRedirect = ({preText, actionText, action=()=>{}}:{preText:string, actionText:string, action?:Action}) => {


  const handleClick = () => {
    action()
  }

  return(
    <FieldWrapper>
      <div className="w-full flex flex-row justify-center items-center text-shadow">
        <span>
          {preText+" "}
          <span onClick={handleClick} className="text-violet cursor-pointer decoration-1 decoration-solid underline underline-offset-2 decoration-violet">
            {actionText}
          </span>
        </span>
      </div>
    </FieldWrapper>
  )
}


export default LocalRedirect