import { Marker } from "@react-google-maps/api";
import { LatLng } from "use-places-autocomplete";

export interface MarkerType {
  icon?: google.maps.Icon;
  latlng: LatLng;
  desc?: string;
  onDragEnd?: Function;
  onMarkerClick?: Function;
}
export const MyMarker = ({
  icon,
  latlng,
  desc,
  onDragEnd,
  onMarkerClick,
}: MarkerType) => {
  return (
    <>
      {typeof google !== "undefined" && typeof google.maps !== "undefined" ? (
        <Marker
          position={latlng}
          icon={
            icon === undefined
              ? { url: "atm.svg", scaledSize: new google.maps.Size(37, 37) }
              : icon
          }
          draggable
          onDragEnd={(e) => {
            if (onDragEnd !== undefined) onDragEnd(e);
          }}
          onClick={(e) => {
            if (onMarkerClick !== undefined) onMarkerClick(e);
          }}
        />
      ) : (
        ""
      )}
    </>
  );
};
