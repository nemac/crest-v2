import { flyToStored } from "../../utility/viewState";

export const flyToLocation = (map, mapCoordinates, zoom) => {
  flyToStored(map, mapCoordinates, zoom);
};
