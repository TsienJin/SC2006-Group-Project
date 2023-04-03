

// Takes in user input, then returns error message (if any)
export interface ValidateInputText{
  (input:string|number):string|false
}


export const WTest:ValidateInputText = input => {
  if(input=='w'){
    return "W is not allowed"
  }

  return false
}


// requires a minimum of 8 characters on input field
export const MinPassLength:ValidateInputText = (input) => {

  // @ts-ignore
  if(input.length<8){
    return "Minimum 8 characters"
  }

  return false
}


// requires at least one letter and one number
export const PassMinCharNum:ValidateInputText = input => {

  const re = new RegExp("^(?=.*[0-9])(?=.*[a-zA-Z])([a-zA-Z0-9]+)")

  // @ts-ignore
  if(!re.test(input)){
    return "Passwords require at least one alphabet and one digit"
  }

  return false
}

export const Required:ValidateInputText = input => {

  // @ts-ignore
  if(!input.length){
    return "This field is required"
  }

  return false
}


export const ValidEmail:ValidateInputText = input => {

  const validRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/

  // @ts-ignore
  if(!input.match(validRegex)) {
    return "Invalid email format"
  }

  return false

}




export const ValidAge:ValidateInputText = input => {

  if(input<0){
    return "Invalid age!"
  }

  return false

}


export const ValidAgeMin:ValidateInputText = input => {
  if(input<=17){
    return "You must be at least 18!"
  }

  return false
}


export const MinNumberZero:ValidateInputText = input => {
  if(input<0){
    return "Number must be positive!"
  }

  return false
}