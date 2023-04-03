
export type middlewareOptions = {
  endpoint: string,
  headers?:{
    [key:string]:string,
  },
  params?: {
    [key:string]:any,
  }
}
