import FieldWrapper from "@/components/fields/FieldWrapper";
import {Action} from "@/components/clickeable/types";


const SmallRight = ({preText, actionText, action=()=>{}}:{preText:string, actionText:string, action?:Action}) => {

  const handleClick = () => {
    action()
  }


  return(
    <FieldWrapper xSpace={true} ySpace={false}>
      <div className="flex flex-row justify-end items-center">
        <span className={"text-xs font-light"}>
          {preText+" "}
          <span onClick={handleClick} className="text-violet cursor-pointer decoration-1 decoration-solid underline underline-offset-2 decoration-violet" >
            {actionText}
          </span>
        </span>
      </div>
    </FieldWrapper>
  )
}


export default SmallRight