import React from "react";
import { useLoadScript } from "@react-google-maps/api";
import MapShow from "./mapShow";

const MapPage = () => {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey : 'AIzaSyCjcFMNmB-oZA3nQ6yKO52EHK4gUv97pJA',
     libraries: ["places"] ,
  });
  if (!isLoaded) return <div>Loading</div>;
//  console.log(process.env.REACT_APP_GOOGLE_MAPS_API_KEY)
  return (
    <div>

      <MapShow   />
    </div>
  );
};

export default MapPage;
