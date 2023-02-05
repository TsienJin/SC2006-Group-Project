


export interface Action {
  ():void
}


export type link = {
  text: string,
  url: string,
  target: "_blank"|"_self"|"_parent"|"_top"
}


export type btnColour = {
  bg: `bg-${string}`,
  text: `text-${string}`,
  bgHover?: `md:hover:bg-${string}`,
  textHover?: `md:hover:text-${string}`,
}