import {Option} from "@/components/fields/SelectInput";


export type Address = {
  name?: string,
  address?: string,
  postal?: number|string,
  floorNumber?: number,
  unitNumber?: number,
  coordinates?: {
    lat?: number,
    long?: number
  }
}

export type Description = {
  locationType: Option | undefined,
  isPublic: boolean,
  description: string
}

export type Review = {
  rating: Option | undefined,
  comment: string
}


export type AddToilet = {
  address: Address|undefined,
  description: Description|undefined,
  initialReview: Review|undefined,
}