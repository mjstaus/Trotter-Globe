import loadShopItems from "./loadShopItems";
import { Marker } from "../interfaces";
import latLngMap from "../constants/latLngMap";

export async function getMarkers(): Promise<Marker[]> {
  let result = [];

  const items = await loadShopItems();

  if (items?.length) {
    for await (const item of items) {
      const { country, city } = item;
      result.push({
        ...item,
        lat: latLngMap[country][city].lat,
        lng: latLngMap[country][city].lng,
        color: "white",
      });
    }
  }
  return result;
}
