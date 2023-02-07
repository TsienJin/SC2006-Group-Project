import { RootState } from "@/store"
import { useSelector } from "react-redux"

const MenuItemWrapper = ({children, isTop=false,handler=()=>{console.log("no function added")}}:{children?:any, isTop?:boolean,handler?:any}) => {

  const expState = useSelector((state:RootState) => state.menu.expanded)

  const expanded = ():string => {


    if(isTop){
      return`
        shadow-md
        md:hover:bg-salt
      `
    }

    if(expState==true){
      return `
        shadow-md
        md:hover:bg-rust md:hover:text-offwhite
      `
    }

    return "shadow-none max-h-0 p-0 overflow-hidden opacity-0"
  }

  return(
    <div className="flex flex-none justify-center items-center">
      <button onClick={handler} className={`transition-all bg-offwhite text-shadow p-4 rounded-full ${expanded()}}`}>
        {children}
      </button>
    </div>
  )
}

export default MenuItemWrapper