import { useEffect, useState, useCallback, useRef } from "react";
import { GoogleMap, useJsApiLoader, useLoadScript, Marker, InfoWindow } from "@react-google-maps/api";
import { getKey } from "../../store/maps";
import { useHistory } from "react-router-dom";
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
import MapHoverCard from "./MapHoverCard/MapHoverCard";

function BoatSearchMap({ searchState, markers }) {
  const dispatch = useDispatch();
  const history = useHistory();
  const key = useSelector((state) => state.maps.key);
  const boats = useSelector((state) => state.boats);

  const [lat, setLat] = useState("");
  const [long, setLong] = useState("");
  const [isLoadedCenter, setIsLoadedCenter] = useState(false);
  const [hoverBoatId, setHoverBoatId] = useState(null);
  const [hoverActive, setHoverActive] = useState(null);
  const [marker, setMarker] = useState({});
  const [zoom, setZoom] = useState(6.5);
  useEffect(() => {
    let searchCoords;
    if (searchState) {
      searchCoords = states.filter((state) => state.includes(searchState));
      const currState = statesCoords[searchState];
      if (searchState === "AK") setZoom(5);
      if (searchState === "CA" || searchState === "TX") setZoom(6);
      setLat(currState[0]);
      setLong(currState[1]);
      setIsLoadedCenter(true);
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
    styles: [
      {
        featureType: "administrative",
        elementType: "labels.text.fill",
        stylers: [
          {
            color: "#444444",
          },
        ],
      },
      {
        featureType: "landscape",
        elementType: "all",
        stylers: [
          {
            color: "#f2f2f2",
          },
        ],
      },
      {
        featureType: "poi",
        elementType: "all",
        stylers: [
          {
            visibility: "off",
          },
        ],
      },
      {
        featureType: "road",
        elementType: "all",
        stylers: [
          {
            saturation: -100,
          },
          {
            lightness: 45,
          },
        ],
      },
      {
        featureType: "road.highway",
        elementType: "all",
        stylers: [
          {
            visibility: "simplified",
          },
        ],
      },
      {
        featureType: "road.arterial",
        elementType: "labels.icon",
        stylers: [
          {
            visibility: "off",
          },
        ],
      },
      {
        featureType: "transit",
        elementType: "all",
        stylers: [
          {
            visibility: "off",
          },
        ],
      },
      {
        featureType: "water",
        elementType: "all",
        stylers: [
          {
            color: "#46bcec",
          },
          {
            visibility: "on",
          },
        ],
      },
    ],
    disableDefaultUI: true,
    zoomControl: false,
    scrollwheel: false,
    navigationControl: false,
    mapTypeControl: false,
    scaleControl: false,
    draggable: true,
  };
  const mapRef = useRef();
  const onMapLoad = useCallback((map) => (mapRef.current = map));

  const { isLoaded, loadError } = useLoadScript({
    id: "google-map-script",
    googleMapsApiKey: key,
    options,
  });

  if (loadError) return "Error loading maps";
  if (!isLoaded) return "Loading Maps";
  //
  // console.log(marker, "-----------");
  return (
    <>
      {isLoaded && isLoadedCenter && (
        // <GoogleMap mapContainerStyle={containerStyle} center={center} options={options} zoom={7} />
        <div className="map__container">
          {/* {hoverActive ? <MapHoverCard boat={boats[hoverBoatId]}></MapHoverCard> : null} */}
          <GoogleMap
            mapContainerStyle={containerStyle}
            center={hoverActive ? null : center}
            options={options}
            onLoad={onMapLoad}
            zoom={zoom}
          >
            {markers.map((marker, idx) => {
              // console.log(marker, "in the map");
              // const lat = marker[0];
              // const lng = marker[1];
              // console.log(typeof marker.lat);
              return (
                <Marker
                  key={idx}
                  visible={true}
                  icon={{ url: "/red__sail__boat__marker.svg", scaledSize: new window.google.maps.Size(33, 33) }}
                  // title={marker.model}
                  onMouseOver={() => {
                    setHoverBoatId(marker.boatId);
                    setMarker(marker);
                    setHoverActive(true);
                  }}
                  onMouseOut={() => {
                    setHoverBoatId(null);
                    setMarker(null);
                    setHoverActive(false);
                  }}
                  onClick={() => history.push(`/boats/${marker.boatId}`)}
                  position={marker}
                ></Marker>
              );
            })}
            {/* <Marker
      icon={"https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png"}
      position={centers[1]}
    /> */}
            {hoverActive ? <MapHoverCard boat={boats[hoverBoatId]}></MapHoverCard> : <div></div>}
          </GoogleMap>
        </div>
      )}
    </>
  );
}

export default BoatSearchMap;
