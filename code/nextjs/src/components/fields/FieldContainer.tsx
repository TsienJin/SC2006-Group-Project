import { useState } from "react"
import FieldWrapper from "./FieldWrapper"


const FieldContainer = ({name, defaultExpand=true, children}:{name:string, defaultExpand?:boolean, children?:any}) => {

  const [isExpand, setExpand] = useState<boolean>(defaultExpand)

  const toggleExpand = () => {
    setExpand(!isExpand)
  }

  return(
    <FieldWrapper xSpace={false} ySpace={false}>
      <div className="transition-all flex flex-row justify-between items-center text-violet p-3 border-y-[1px] border-gray-50 md:hover:shadow-sm">
        <span className="text-3xl font-light capitalize select-none">{name}</span>
        <button onClick={toggleExpand} className="rounded md:hover:bg-gray-100">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={`transition-all ${isExpand?"rotate-0":"rotate-180"} w-6 h-6`}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 15.75l7.5-7.5 7.5 7.5" />
          </svg>
        </button>
      </div>
      <div className={`transition-all overflow-hidden ${isExpand?"max-h-[100vh] opacity-100 pt-2":"max-h-0 opacity-0"}`}>
        {children}
        {isExpand && <div className="h-[1px] w-full bg-gray-100" />}
      </div>
    </FieldWrapper>
  )
}


export default FieldContainer