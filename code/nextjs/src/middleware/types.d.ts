




export type middlewareOptions = {
  method: "POST" | "GET",
  endpoint: string,
  params?: {
    [key:string]:string,
  }
}


export interface middleware {
  (config:middlewareOptions):Promise<any>
}