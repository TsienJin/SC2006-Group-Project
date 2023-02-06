import {ValidateInputText} from "@/validation/fields/text"
import {ChangeEvent, useEffect, useState} from "react"
import FieldWrapper from "./FieldWrapper"
import {Hoist} from "./types"


const TextInput = ({placeholder, defaultVal, required=false, type="text", forceErrorMessage="", validateTests=[], hoist=()=>{}}:{placeholder:string, defaultVal?:string|number|any, required?:boolean, type?:"text"|"password"|"textarea", forceErrorMessage?:string, validateTests?:ValidateInputText[], hoist?:Hoist<string>}) => {

  const [usrVal, setUsrVal] = useState<string>("")
  const [hasClicked, setClicked] = useState<boolean>(false)
  const [errMessage, setErrMessage] = useState<string>("")

  const valid = () => (forceErrorMessage.length==0 && errMessage.length==0)

  const _validate = (val:string) => {
    setUsrVal(val)
    hoist(val) // update parent state
  }


  const validate = (e:ChangeEvent<HTMLInputElement>) => {
    _validate(e.target.value)

  }

  const validateArea = (e:ChangeEvent<HTMLTextAreaElement>) => {
    _validate(e.target.value)
  }

  const usrClicked = () => {
    if(!hasClicked){
      setClicked(true)
    }
  }

  const testInput = ():string|void => {
    // iterates all the tests provided to the element
    // first error will be set as error message
    for(let i=0; i<validateTests.length; i++){
      const output = validateTests[i](usrVal)
      if(output){
        return(output)
      }
    }
  }


  useEffect(()=>{

    const err = testInput()

    if(usrVal.length==0 || !err){
      setErrMessage("")
    }

    if (required && usrVal.length==0 && hasClicked){
      setErrMessage("this field is required")
    }

    if(err && usrVal.length>0){
      setErrMessage(err)
    }

    if(forceErrorMessage){
      setErrMessage(forceErrorMessage)
    }
  },[usrVal, valid, hasClicked, forceErrorMessage, required])



  const inputClassName = `transition peer w-full bg-transparent rounded-none border-b-[1px] p-1 ${valid()?"border-shadow text-shadow":"pr-6 border-rust text-rust"} focus:outline-none focus:bg-gray-50`

  return(
    <FieldWrapper>
      <div className="relative">
        {
        type == "textarea"?
          <textarea className={inputClassName+" min-h-[48px]"}
          onChange={e=>validateArea(e)} onBlur={()=>usrClicked()} defaultValue={defaultVal} name={placeholder} placeholder=" "/>
          :
          <input className={inputClassName}
          onChange={e=>validate(e)} onBlur={()=>usrClicked()} defaultValue={defaultVal} type={type} name={placeholder} placeholder=" "/>
        }
        <label className={`
              transition-all absolute text-shadow opacity-100 -top-4 left-0 -z-10 font-light text-sm first-letter:uppercase
              peer-placeholder-shown:top-1 peer-placeholder-shown:left-0 peer-placeholder-shown:opacity-50
              peer-placeholder-shown:font-normal peer-placeholder-shown:text-base
              peer-focus:-top-4  peer-focus:left-0 peer-focus:opacity-100 peer-focus:font-light peer-focus:text-sm
              ${valid()?"":"text-rust"}
        `} htmlFor={placeholder}>{placeholder}</label>
        <span className={`transition absolute right-0 top-2 text-rust ${valid()?"opacity-0 display-none":"opacity-100"}`}>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5">
            <path fillRule="evenodd" d="M8.485 2.495c.673-1.167 2.357-1.167 3.03 0l6.28 10.875c.673 1.167-.17 2.625-1.516 2.625H3.72c-1.347 0-2.189-1.458-1.515-2.625L8.485 2.495zM10 5a.75.75 0 01.75.75v3.5a.75.75 0 01-1.5 0v-3.5A.75.75 0 0110 5zm0 9a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd" />
          </svg>
        </span>
        <div className="flex flex-row justify-end items-center">
          <span className={`pt-1 transition-all text-right first-letter:uppercase overflow-hidden text-rust ${valid()?"max-h-0":"max-h-[50px]"}`}>
            {errMessage}
          </span>
        </div>
      </div>
    </FieldWrapper>
  )
}


export default TextInput