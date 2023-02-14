import {Action} from "@/components/clickeable/types";
import {FormEvent} from "react";


const FormWrapper = ({children, action=()=>{}, enabled=true}:{children:any, action?:Action, enabled?:boolean}) => {


  const submit = (e:FormEvent) => {
    e.preventDefault()
    action()
  }


  return(
    <form onSubmit={e=>submit(e)}>
      {children}
    </form>
  )
}


export default FormWrapper