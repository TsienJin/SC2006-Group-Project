import Link from "next/link"
import FieldWrapper from "../fields/FieldWrapper"
import { link } from "./types"



const Redirect = ({preText, link}:{preText:string, link:link}) => {

  return(
    <FieldWrapper>
      <div className="w-full flex flex-row justify-center items-center text-shadow">
        <span>
          {preText+" "}
          <Link href={link.url} target={link.target} className="text-violet decoration-1 decoration-solid underline underline-offset-2 decoration-violet">
            {link.text}
          </Link>
        </span>
      </div>
    </FieldWrapper>
  )
}


export default Redirect