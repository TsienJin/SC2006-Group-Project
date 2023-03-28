import TextInput from "@/components/fields/TextInput";
import {AutofillSuggestion, MapboxAutofill} from "@mapbox/search-js-core";
import {useEffect, useState} from "react";
import {Hoist} from "@/components/fields/types";

import {v4 as v4uuid} from "uuid"
import {useDispatch} from "react-redux";
import {Coordinates, update} from "@/components/slice/location";
import axios from "axios";




export interface FindCallback{
  (place:Coordinates):any
}






async function getCoords(addr: string | undefined):Promise<Coordinates> {

  try {
    const res = await axios(
      `https://api.mapbox.com/geocoding/v5/mapbox.places/{"${addr}"}.json?access_token=${process.env.NEXT_PUBLIC_MAPBOX_KEY}`
    )

    return {
      name: res?.data?.features[0]?.text,
      address: addr,
      latitude: res?.data?.features[0]?.center[1],
      longitude: res?.data?.features[0]?.center[0],
      found:true
    }

  } catch (e) {
    console.error(e)
  }

  return {
    latitude: 1.3483,
    longitude: 103.6831,
    found: false
  }
}



const SuggestionItem = ({item, callback=()=>{}}:{item:AutofillSuggestion, callback?:FindCallback}) => {

  const dispatch = useDispatch()

  const click = () => {
    getCoords(item.full_address).then(result => {
      callback(result)
    })
  }

  return(
    <div onClick={click}
      className={`transition flex flex-row m-1 p-2 cursor-pointer
      text-shadow rounded-md
      md:hover:shadow md:hover:bg-gray-300 md:hover:text-shadow`}>
      <div className={"flex flex-col justify-items-start items-start"}>
        <span className={"font-normal"}>{item.matching_name}</span>
        <span className={"text-sm font-light opacity-50"}>{item.full_address}</span>
      </div>
    </div>
  )
}





const Find = ({label="Find", defaultVal="", callback=()=>{}}:{label?:string, defaultVal?:string|undefined, callback?:FindCallback}) => {

  let autofill: MapboxAutofill;
  autofill = new MapboxAutofill({
    accessToken: process.env.NEXT_PUBLIC_MAPBOX_KEY
  });

  const [find, setFind] = useState<string>("")
  const [uuid, setUUID] = useState(v4uuid())
  const [suggestions, setSuggestions] = useState<AutofillSuggestion[]>([])


  useEffect(()=>{
    if(find.length>0){
      autofill.suggest(find, {sessionToken: uuid, country: "SG"}).then(r => setSuggestions(r.suggestions))
    }
    // eslint-disable-next-line
  },[find])



  const valHoist:Hoist<string> = input => {
    setFind(input)
  }


  return(
    <>
      <div className={"pt-2"}></div>
      <TextInput placeholder={label} defaultVal={defaultVal} hoist={valHoist}/>
      {
        suggestions.map(item => {
          return(
            <SuggestionItem item={item} callback={callback} key={item.action.id} />
          )
        })
      }
    </>
  )
}

export default Find