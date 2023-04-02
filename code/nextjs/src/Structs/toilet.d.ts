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


export type AddToiletDEPRE = {
  address: Address|undefined,
  description: Description|undefined,
  initialReview: Review|undefined,
}

export type AddToilet = {
  name: Address.name,
  address: Address.address,
  postalCode: Address.postal,
  floorNumber: Address.floorNumber,
  unitNumber: Address.unitNumber,
  longitude: Address.coordinates.long,
  latitude: Address.coordinates.long,
  locationType: Description.locationType,
  isPublic: Description.isPublic,
  description: Description.description
}