import React from "react";
import { GoogleMap, useJsApiLoader, useLoadScript } from "@react-google-maps/api";
import { useEffect, useState } from "react";
import { getKey } from "../../store/maps";
import { useDispatch, useSelector } from "react-redux";
import { states, statesCoords } from "../Utils";
// import usePlacesAutoComplete, {
//   getGeocode,
//   getLatLng,
// } from "use-places-autocomplete";
// import {
//   Combobox,
//   ComboboxInput,
//   ComboboxList,
//   ComboboxOption,
//   ComboboxPopover,
// } from "@reach/combobox";
// import "@reach/combobox/styles.css";
// import mapStyles from "./mapStyles";

import "./BoatSearchMap.css";

function BoatSearchMap({ searchState }) {
  const dispatch = useDispatch();
  const key = useSelector((state) => state.maps.key);
  console.log("search state in boat search map", searchState);
  const [lat, setLat] = useState("");
  const [long, setLong] = useState("");
  const [isLoadedCenter, setIsLoadedCenter] = useState(false);
  useEffect(() => {
    let searchCoords;
    if (searchState) {
      searchCoords = states.filter((state) => state.includes(searchState));
      const currState = statesCoords[searchState];
      setLat(currState[0]);
      setLong(currState[1]);
      setIsLoadedCenter(true);
      console.log(lat, long, "------------");
      console.log(statesCoords[searchState], searchCoords, long, "------------");
    }
  }, [dispatch, searchState]);

  const containerStyle = {
    width: "40vw",
    height: "83vh",
    margin: "15px 2px 5px 2px",
    // paddingTop: "50px",
    borderRadius: "5px",
    // maxWidth: "777px",
  };
  const center = {
    lat: lat,
    lng: long,
  };
  const options = {
    disableDefaultUI: true,
    zoomControl: true,
    scrollwheel: true,
    navigationControl: false,
    mapTypeControl: true,
    scaleControl: false,
    draggable: true,
  };

  const { isLoaded, loadError } = useLoadScript({
    id: "google-map-script",
    googleMapsApiKey: key,
  });

  if (loadError) return "Error loading maps";
  if (!isLoaded) return "Loading Maps";
  //

  return (
    <>
      {isLoaded && isLoadedCenter && (
        <GoogleMap mapContainerStyle={containerStyle} center={center} options={options} zoom={7} />
      )}
    </>
  );
}

export default BoatSearchMap;
