import {ReactElement, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "@/store";
import {addNoti, createNoti, notiType, popNoti} from "@/components/slice/notification";


const Wrapper = ({bgColour, titleColour, title, children, id}:{bgColour:string, titleColour:string, title:string, children?:any, id:string}) => {

  const [closed, setClosed] = useState(false)
  const dispatch = useDispatch()

  const close = () => {
    setClosed(true)
    setTimeout(()=>{
      dispatch(popNoti(id))
    }, 300)
  }

  return(
    <div className={`transition-all transition-150 relative flex flex-col justify-center items-center p-2 pl-3
                    bg-violet ${bgColour} text-white w-fit shadow-xl rounded-xl gap-y-2 max-h-[100vh] overflow-hidden
                    ${closed?"max-h-[0px] p-0 -mr-[150%] -mb-2 opacity-0":""}
                    `}>
      <div className={"flex flex-row justify-between items-start w-full gap-x-4"}>
        <span className={`font-medium text-md ${titleColour}`}>{title}</span>
        <button onClick={()=>close()} className={"rounded transition text-white md:hover:bg-white md:hover:bg-opacity-30 md:hover:opacity-70 md:opacity-50"}>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5">
            <path d="M6.28 5.22a.75.75 0 00-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 101.06 1.06L10 11.06l3.72 3.72a.75.75 0 101.06-1.06L11.06 10l3.72-3.72a.75.75 0 00-1.06-1.06L10 8.94 6.28 5.22z" />
          </svg>
        </button>
      </div>
      <span className={"w-full text-left text-offwhite font-light opacity:70 pr-1"}>
        {children}
      </span>
    </div>
  )

}




const NotificationBox = ({title, children, id}:{title:string, children:any, id:string}) => {

  return(
    <Wrapper bgColour={"bg-violet"} titleColour={"text-white"} title={title} id={id}>
      {children}
    </Wrapper>
  )
}

const WarningBox = ({title, children, id}:{title:string, children:any, id:string}) => {
  return (
    <Wrapper bgColour={"bg-rust"} titleColour={"text-white"} title={title} id={id}>
      <span className={"flex flex-row justify-center items-center gap-x-2"}>
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8">
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
        </svg>
        {children}
      </span>
    </Wrapper>
  )
}

const NotificationWrapper = () => {

  const allNoti = useSelector((state:RootState) => state.notification.notifications)

  return(
    <div className={"transition-all absolute flex flex-col justify-top gap-y-2 items-end top-6 right-6 max-w-[75dvw] z-30 "}>
      {
        allNoti.map(noti=>{
          // return(
          //   <NotificationBox title={noti.title} id={noti.id} key={noti.id}>
          //     {noti.text}
          //   </NotificationBox>
          // )

          switch (noti.type){
            case notiType.Warning:
              return(
                <WarningBox title={noti.title} id={noti.id} key={noti.id}>
                  {noti.text}
                </WarningBox>
              )
            default:
              return(
                <NotificationBox title={noti.title} id={noti.id} key={noti.id}>
                  {noti.text}
                </NotificationBox>
              )
          }
        })
      }
    </div>
  )
}



export default NotificationWrapper