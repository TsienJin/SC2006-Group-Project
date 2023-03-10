import FieldWrapper from "../fields/FieldWrapper"
import { Action } from "./types"



const Tab = ({itemName, placeholder, action=()=>{}}:{itemName:string, placeholder?:string, action?:Action}) => {


  const handleClick = () => {
    action()
  }

  return (
    <FieldWrapper>
      <div className="flex flex-row justify-between items-center gap-x-2">
        <span className="text-shadow first-letter:capitalize">{itemName}</span>
        <button onClick={handleClick} className="transition-all pl-2 py-2 flex flex-row justify-end items-center rounded md:hover:bg-gray-50">
          <span className="opacity-60 text-shadow text-right first-letter:capitalize">{placeholder}</span>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5 opacity-60">
            <path fillRule="evenodd" d="M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z" clipRule="evenodd" />
          </svg>
        </button>
      </div>
    </FieldWrapper>
  )
}


export default Tab