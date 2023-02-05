


export interface Action {
  ():void
}


export type link = {
  text: string,
  url: string,
  target: "_blank"|"_self"|"_parent"|"_top"
}