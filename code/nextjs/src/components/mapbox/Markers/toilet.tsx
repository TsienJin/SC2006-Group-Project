import {useState} from "react";
import {Marker, Popup} from "react-map-gl";

const ToiletMarker = () => {

  const [open, setOpen] = useState<boolean>(false)

  const toggle = () => {
    setOpen(!open)
  }

  return(
    <>
      <Marker longitude={103.6831} latitude={1.3483} onClick={toggle}>
        <div className={`transition-all rounded-full border-2 border-white w-7 h-7 flex flex-row justify-center items-center ${open?"bg-rust":"bg-violet"}`}>
          <span className={"font-bold text-lg text-white"}>T</span>
        </div>
      </Marker>
      {open &&
          <Popup
              longitude={103.6831}
              latitude={1.3483}
              anchor={"bottom"}
              closeOnClick={false}
              closeOnMove={false}
              closeButton={false}
              offset={12}
          >
              <div>
                  pooop
              </div>
          </Popup>
      }
    </>
  )
}



const Toilets = () => {

  return(
    <ToiletMarker />
  )
}

export default Toilets