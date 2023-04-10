

const ThisPage = ({props}:{props?:any}) => {

  return(
    <>
      <p>THIS IS A TEST</p>
      <p>{`${process.env.NEXT_PUBLIC_BACKEND}`}</p>
    </>
  )


}


export default ThisPage