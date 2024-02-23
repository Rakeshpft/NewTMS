import React from "react";
import usePlacesAutoComplete, {
  getGeocode,
  getLatLng,
} from "use-places-autocomplete";
import {
  Combobox,
  ComboboxInput,
  ComboboxList,
  ComboboxOption,
  ComboboxPopover,
} from "@reach/combobox";
type PlacesProp = {
  setOffice: (position: google.maps.LatLngLiteral) => void;
};
const MapPlcaes = ({ setOffice }: PlacesProp) => {
  const {
    ready,
    value,
    setValue,
    suggestions: { status, data },
    clearSuggestions,
  } = usePlacesAutoComplete();

  const handleSelect = async (val: string) => {
    setValue(val, false);
    clearSuggestions();
    const result = await getGeocode({ address: val });
    const { lat, lng } = await getLatLng(result[0]);
    setOffice({ lat, lng });
  };
  console.log("map", { data, status });
  return (
    <Combobox onSelect={handleSelect}>
      <ComboboxInput
        value={value}
        onChange={(e) => setValue(e.target.value)}
        disabled={!ready}
      />
      <ComboboxPopover>
        <ComboboxList>
          {status === "OK" &&
            data.map(({ place_id, description }) => (
              <ComboboxOption key={place_id} value={description} />
            ))}
        </ComboboxList>
      </ComboboxPopover>
    </Combobox>
  );
};

export default MapPlcaes;
