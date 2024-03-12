import React, { useCallback, useMemo, useRef } from "react";
import { GoogleMap } from "@react-google-maps/api";
// import MapPlcaes from "./mapPlaces";

type LatLangLiteral = google.maps.LatLngLiteral;
//  type DirectionsResult = google.maps.DirectionsResult;
type MapOptions = google.maps.MapOptions;

const MapShow = () => {
  // const [, setOffice] = useState<LatLangLiteral>();

  const mapRef = useRef<GoogleMap>();
  const center = useMemo<LatLangLiteral>(() => ({ lat: 43, lng: -80 }), []);
  const options = useMemo<MapOptions>(
    () => ({
      disableDefaultUI: true,
    }),
    []
  );

  const onLoad = useCallback((map: any) => {
    mapRef.current = map;
  }, []);

  return (
    <div className="map-container">
      <div>
        {/* <MapPlcaes
          setOffice={(position) => {
            setOffice(position);
            mapRef.current?.panTo(position);
          }}
        /> */}
      </div>
      <div className="map">
        <GoogleMap
          zoom={10}
          center={center}
          options={options}
          onLoad={onLoad}
          mapContainerClassName="map-container"
        ></GoogleMap>
      </div>
    </div>
  );
};

export default MapShow;
