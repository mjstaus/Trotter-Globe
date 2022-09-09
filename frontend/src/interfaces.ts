interface City {
  lat: number;
  lng: number;
}
export interface Coordinates {
  lat?: number | null,
  lon?: number | null,
}

interface Country {
  [city: string]: City;
}
export interface Error {
  code: string,
  message: string
}
export interface Item {
  price: string;
  itemId: number;
  seller: string;
  sold: boolean;
  city?: string;
  country?: string;
  image?: string;
  tokenID?: number;
}
export interface LatLngMap {
  [country: string]: Country
}
export interface Location {
  allowLocation: boolean,
  coordinates?: Coordinates,
  city?: string,
  country?: string,
  error?: Error,
}

export interface Marker {
  price: string;
  itemId: number;
  seller: string;
  city?: string;
  sold: boolean;
  country?: string;
  image?: string;
  lat?: number | null | undefined;
  lng?: number | null | undefined;
  color?: string;
}

export interface PurchasedItem {
    price: string;
    itemId: number,
    city: string,
    image: string,
}

export interface Ref {
  current: any
}

export interface UserLocation {
  coordinates?: Coordinates
}