import {useCallback, useRef, useState} from "react"
import FieldWrapper from "./FieldWrapper"
import { Hoist } from "./types"
import {SystemLang} from "@/components/slice/system";




export type Option = {
  value: string,
  text: string|0|1|2|3|4|5,
  disabled?: boolean
}

export type SelectInputOptions = {
  options: Option[],
  default?: Option
}


const SelectInput = ({placeholder, options, hoist=()=>{}}:{placeholder:string, options:SelectInputOptions, hoist?:Hoist<Option>}) => {


  const [val, setVal] = useState<Option>(options?.default || options?.options[0])

  const handleChange = (value:string) => {

    options.options.forEach(item => {
      if(item.text == value){
        setVal(item)
      }
    })

    if(value==options?.default?.text){
      setVal(options.default)
    }
  }


  useCallback(()=>{
    hoist(val)
  },[val])


  return(
    <FieldWrapper>
      <div className="SELECTOR_ELEMENT w-full flex flex-row justify-center items-center gap-x-2">
        <label htmlFor={placeholder}>{placeholder}</label>
        <select name={placeholder} onChange={e=>handleChange(e.target.value)} className="w-full focus:outline-none rounded-sm border-[1px] border-shadow p-1">
          {options.default != undefined && <option value={options.default.value} disabled={options.default.disabled}>{options.default.text}</option>}
          {
            options.options.map(item => {
              return(
                <option value={item.value} disabled={item.disabled} key={item.value}>{item.text}</option>
              )
            })
          }
        </select>
      </div>
    </FieldWrapper>
  )
}


export default SelectInput