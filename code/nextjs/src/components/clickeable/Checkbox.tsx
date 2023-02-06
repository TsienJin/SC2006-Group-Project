import Link from "next/link"
import {useCallback, useState} from "react"
import FieldWrapper from "../fields/FieldWrapper"
import {Hoist} from "../fields/types"
import {link} from "./types"


const Checkbox = ({preText, link, checked=false, hoist=()=>{}}:{preText:string, link?:link, checked?:boolean, hoist?:Hoist<boolean>}) => {

  const [isChecked, setChecked] = useState<boolean>(checked)

  const toggle = () => {
    setChecked(!isChecked)
  }

  useCallback(()=>{
    hoist(isChecked)
  }, [isChecked, hoist])


  return(
    <FieldWrapper>
      <div className="flex flex-row justify-start items-center gap-x-2">
        <button className="BOX relative" onClick={toggle}>
          <div className={`w-4 h-4 flex flex-col justify-center items-center border-shadow border-[1.5px] p-[2px] rounded-sm hover:border-shadow`}>
            <div className={`w-full h-full transition-all ${isChecked?"bg-shadow":"bg-white"}`}/>
          </div>
        </button>
        <div className="TEXT">
          <span className={"first-letter:capitalize"}>{preText+" "}</span>
          {link &&
          <Link href={link.url} target={link.target} className="text-violet decoration-1 decoration-solid underline underline-offset-2 decoration-violet">
            {link.text}
          </Link>}
        </div>
      </div>
    </FieldWrapper>
  )
} 


export default Checkbox