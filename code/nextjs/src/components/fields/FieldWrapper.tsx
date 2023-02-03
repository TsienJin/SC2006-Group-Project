


const FieldWrapper = ({children, xSpace=true, ySpace=true}:{children:any, xSpace?:boolean, ySpace?:boolean}) => {

  return(
    <div className="m-3">
      {children}
    </div>
  )
}


export default FieldWrapper