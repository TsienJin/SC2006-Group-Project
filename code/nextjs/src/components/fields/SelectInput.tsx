import { useRef } from "react"
import FieldWrapper from "./FieldWrapper"
import { Hoist } from "./types"




type Option = {
  key: string,
  value: string|0|1|2|3|4|5,
  disabled?: boolean
}

export type SelectInputOptions = {
  options: Option[],
  default?: Option
}


const SelectInput = ({placeholder, options, hoist=()=>{}}:{placeholder:string, options:SelectInputOptions, hoist?:Hoist<string|number>}) => {


  const selectRef = useRef<HTMLSelectElement>(null)


  const hanldeClick = () => {
    selectRef.current?.click()
  }



  return(
    <FieldWrapper>
      <div className="SELECTOR_ELEMENT w-full flex flex-row justify-center items-center gap-x-2">
        <label htmlFor={placeholder}>{placeholder}</label>
        <select name={placeholder} className="w-full focus:outline-none rounded-sm border-[1px] border-shadow p-1">
          {options.default != undefined && <option value={options.default.key} disabled={options.default.disabled}>{options.default.value}</option>}
          {
            options.options.map(item => {
              return(
                <option value={item.key} disabled={item.disabled} key={item.key}>{item.value}</option>
              )
            })
          }
        </select>
      </div>
    </FieldWrapper>
  )
}


export default SelectInput