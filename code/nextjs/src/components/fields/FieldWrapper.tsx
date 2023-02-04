


const FieldWrapper = ({children, xSpace=true, ySpace=true}:{children:any, xSpace?:boolean, ySpace?:boolean}) => {

  return(
    <div className={`${xSpace?"px-3":""} ${ySpace?"py-3":""}`}>
      {children}
    </div>
  )
}


export default FieldWrapper