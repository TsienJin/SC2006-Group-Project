
import { useSelector, useDispatch } from "react-redux"
import { increment, decrement, reset, change } from "../slice/test"
import { RootState } from "@/store"

const incrState = () => {

}



const Button = ({text="Click me!", method}:{text?:string, method?:any}) => {

  const dispatch = useDispatch()

  return(
    <button onClick={()=>method()} className="bg-white p-4 rounded shadow">
      {text}
    </button>
  )
}



const Overlay = () => {

  const state = useSelector((state:RootState) => state.counter.value)
  const dispatch = useDispatch()

  return(
    <div className="absolute bottom-6 right-6 z-10 flex flex-col gap-y-4">
      <Button text={`${state}`} />
      <Button text="+" method={()=>{dispatch(increment())}}/>
      <Button text="-" method={()=>{dispatch(decrement())}}/>
    </div>
  )
}

export default Overlay