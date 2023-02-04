import FieldWrapper from "./FieldWrapper"


const Logo = () => {

  return(
    <FieldWrapper>
      <div className="w-full flex flex-col justify-center items-center">
        <img src="/logo/LogoBlack.png" alt="NaviLoo" className="max-w-[175px]" />
      </div>
    </FieldWrapper>
  )
}

export default Logo