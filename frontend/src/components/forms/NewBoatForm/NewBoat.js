import "./NewBoatForm.css";

import { GoogleMap, useJsApiLoader, useLoadScript } from "@react-google-maps/api";
import usePlacesAutoComplete, { getGeocode, getLatLng } from "use-places-autocomplete";
// import { Autocomplete } from "@react-google-maps/api";
import Autocomplete from "react-google-autocomplete";
import usePlacesService from "react-google-autocomplete/lib/usePlacesAutocompleteService";

import { useState, useEffect, useRef } from "react";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { years } from "../../Utils";
import * as boatsActions from "../../../store/boats";
import * as sessionActions from "../../../store/session";
import { google } from "../../Utils";

function NewBoatForm() {
  const history = useHistory();

  const key = useSelector((state) => state.maps.key);
  const user = useSelector((state) => state.session.user);

  const { placesService, placePredictions, getPlacePredictions, isPlacePredictionsLoading } = usePlacesService({
    apiKey: key,
  });
  const dispatch = useDispatch();
  const uploadHiddenInput = useRef();

  const handleClick = (e) => {
    e.preventDefault();
    uploadHiddenInput.current.click();
  };
  const [disabled, setDisabled] = useState(false);

  const [preview1, setPreview1] = useState("");
  const [preview2, setPreview2] = useState("");
  const [preview3, setPreview3] = useState("");
  const [preview4, setPreview4] = useState("");
  const [preview5, setPreview5] = useState("");
  const [lat, setLat] = useState("");
  const [lng, setLng] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [address, setAddress] = useState("");
  const [model, setModel] = useState("");
  const [modelErr, setModelErr] = useState(false);
  const [noModelErr, setNoModelErr] = useState(false);
  const [description, setDescription] = useState("");
  const [descriptionErr, setDescriptionErr] = useState(false);
  const [addressErr, setAddressErr] = useState(false);
  const [year, setYear] = useState("");
  const [captain, setCaptain] = useState(false);
  const [yearErr, setYearErr] = useState(false);
  const [numImagesErr, setNumImagesErr] = useState("");
  const [noImagesErr, setNoImagesErr] = useState("");
  const [images, setImages] = useState([]);
  const [imageOneLoaded, setImageOneLoaded] = useState(false);
  const [imageTwoLoaded, setImageTwoLoaded] = useState(false);
  const [imageThreeLoaded, setImageThreeLoaded] = useState(false);
  const [imageFourLoaded, setImageFourLoaded] = useState(false);
  const [imageFiveLoaded, setImageFiveLoaded] = useState(false);
  const [searchResult, setSearchResult] = useState("");
  const [selected, setSelected] = useState(false);
  const [value, setValue] = useState("");
  const [price, setPrice] = useState("");
  const [priceErr, setPriceErr] = useState(false);
  const [imageLoading, setImageLoading] = useState(false);
  const [boatSuccess, setBoatSuccess] = useState(false);

  useEffect(() => {
    // fetch place details for the first element in placePredictions array
    if (placePredictions.length) {
      // console.log("in the if");
      // console.log(placePredictions);
      const details = placesService.placesService?.getDetails(
        {
          placeId: placePredictions[0].place_id,
        },
        (placeDetails) => {
          // console.log(placeDetails, "------------------");
          setSearchResult(placeDetails);
        }
      );
      // console.log(details);
    }
    // console.log(searchResult, "-------------------");
  }, [placePredictions, searchResult]);

  //
  // console.log(process.env, process.env.google, "-----------------------");

  // const {
  //   ready,
  //   value,
  //   setValue,
  //   suggestions: { status, data },
  //   clearSuggestions,
  // } = usePlacesAutoComplete({
  //   requestOptions: { location: { lng: () => 34, lng: () => 241.7 }, radius: 4000 * 1000 },
  //   debounce: 300,
  // });

  // const { isLoaded, loadError } = useLoadScript({
  //   id: "google-map-script",
  //   googleMapsApiKey: key,
  //   libraries: google,
  // });
  // console.log(value, data, "---------");

  useEffect(() => {}, [dispatch]);
  const updateImage = (e) => {
    setNumImagesErr("");
    setNoImagesErr(false);
    setDisabled("");
    setPreview1("");
    setPreview2("");
    setPreview3("");
    setPreview4("");
    setPreview5("");
    let files = e.target.files;
    // let filePreviews = [];
    // let count = 0;
    if (files.length > 5) {
      setNumImagesErr(" - Too Many Images");
      setDisabled(true);
      return;
    }

    for (let i = 0; i < files.length; i++) {
      let file = files[i];
      // console.log(file);

      if (i === 0) setPreview1(URL.createObjectURL(file));
      if (i === 1) setPreview2(URL.createObjectURL(file));
      if (i === 2) setPreview3(URL.createObjectURL(file));
      if (i === 3) setPreview4(URL.createObjectURL(file));
      if (i === 4) setPreview5(URL.createObjectURL(file));
      // count++;
    }
    setImages(files);
    // console.log(filePreviews);
    // setFile(file);
    // if (file) {
    // }
    // setSubmitted(true);
  };
  // console.log(data);
  // console.log(lat, lng);

  const checkErrors = async () => {
    let err = 0;
    if (!address.trim()) {
      setDisabled(true);
      setAddressErr(true);
      err++;
    }
    if (!model.trim()) {
      setDisabled(true);
      setNoModelErr(true);
      err++;
    }
    if (!price.trim()) {
      setDisabled(true);
      setPriceErr(true);
      err++;
    }
    if (!year) {
      setDisabled(true);
      setYearErr(true);
      err++;
    }
    if (images.length < 1) {
      setDisabled(true);
      setNoImagesErr(true);
      err++;
    }
    return err;
  };
  const handleSubmit = async () => {
    // if (!address.trim()) {
    //   setDisabled(true);
    //   setAddressErr(true);
    //   return;
    // }
    // console.log("hello");
    const errs = await checkErrors();
    if (!errs) {
      const userId = user.id;
      const boat = {
        address,
        city,
        state: state.trim(),
        year,
        model,
        description,
        price,
        lat,
        lng,
        captain,
      };
      setImageLoading(true);
      dispatch(boatsActions.addOneBoat(boat, userId)).then((boat) => {
        dispatch(boatsActions.uploadBoatPhoto(images, boat.boat.id));
        setImageLoading(false);
        setBoatSuccess(true);
        setDisabled(true);
        dispatch(sessionActions.updateProviderId(user.id));
        setTimeout(async () => {
          history.push("/manage-boats");
        }, 1500);
      });
    }

    // dispatch(boatsActions.uploadBoatPhoto());
  };

  useEffect(() => {
    // const numbers = new RegExp("[0-9]");
    // const check = numbers.test(price);
    // console.log(check, "-------");
    setModelErr(false);
    setDescriptionErr(false);
    setNoModelErr(false);

    setDisabled(false);
    if (model.length > 100) {
      setModelErr(true);
      setDisabled(true);
    }
    if (description.length > 500) {
      setDescriptionErr(true);
      setDisabled(true);
    }
    if (isNaN(Number(price))) {
      setPriceErr(true);
      setDisabled(true);
    }
    // if (numbers.test(price)) console.log("working");
  }, [model, description]);

  useEffect(() => {
    setPriceErr(false);
    setDisabled(false);
    if (isNaN(Number(price))) {
      setPriceErr(true);
      setDisabled(true);
    }
  }, [price]);
  // console.log(captain);

  return (
    <div className="new__boat__listing__container">
      <div className="new__boat__listing__header__container">
        <h1 className="new__boat__header">Tell us a little about your boat</h1>
        <div className="new__boat__about">
          Please make sure your address to the boat's location is correct and you specify if it is already at a slip.
        </div>
      </div>
      <form className="new__boat__form" onSubmit={handleSubmit}>
        <div className="address__input__container">
          <div className="address__suggestions__wrapper">
            <span className="new__boat__address__span">
              Address
              {addressErr && <span className="new__boat__error"> - *Please select an address from the drop down</span>}
            </span>

            <input
              type="text"
              value={value}
              // ref={ref}
              // onPlaceSelected={(place) => console.log(place)}
              onChange={(evt) => {
                setValue(evt.target.value);
                setSelected(false);
                getPlacePredictions({ input: evt.target.value });
              }}
              loading={isPlacePredictionsLoading}
              // onChange={(place, inputRef, autocomplete) => {
              //   // setValue(e.target.value);
              //   console.log(place, inputRef, autocomplete, "---------------------value in the onchange");
              // }}
              // disabled={!ready}
              placeholder="Address"
              className="new__boat__address__input"
            ></input>

            {placePredictions.length > 1 && !selected && (
              <div className="address__suggestion__container">
                {placePredictions &&
                  placePredictions.map(({ place_id, description, id }) => {
                    return (
                      <div
                        key={id}
                        className="address__suggestion__option"
                        onClick={async () => {
                          setAddressErr(false);
                          setSelected(true);

                          setValue(description);
                          placesService?.getDetails(
                            {
                              placeId: place_id,
                            },
                            (placeDetails) => {
                              const address = description;
                              const addressArr = address.split(",");
                              // console.log(placeDetails);
                              setSearchResult(placeDetails);
                              setCity(addressArr[addressArr.length - 3]);
                              setState(addressArr[addressArr.length - 2]);
                              setAddress(addressArr[0]);
                              setLat(placeDetails.geometry.location.lat());
                              setLng(placeDetails.geometry.location.lng());
                            }
                          );
                        }}
                      >
                        <div className="location__marker"></div>
                        <span>{description}</span>
                      </div>
                    );
                  })}
              </div>
            )}
          </div>
        </div>

        <div className="new__boat__year__model__container">
          <div>
            <span>
              Year
              {yearErr && <span className="new__boat__error"> - * Required</span>}
            </span>
            {/* <select className="new__boat__year__select">

              <option>1992</option>
            </select> */}

            <select
              className="new__boat__year__select"
              value={year}
              onChange={(e) => {
                setYearErr(false);
                setYear(e.target.value);
              }}
            >
              <option className="option__placeholder" value="" disabled selected hidden>
                Select
              </option>
              {years.map((year) => {
                return (
                  <option className="option__drop__down" value={year} key={year}>
                    {year}
                  </option>
                );
              })}
            </select>
          </div>
          <div>
            <span>
              Make/Model
              {/* <span className="new__boat__error"> - *Required</span> */}
              {noModelErr && <span className="new__boat__error"> - *Required </span>}
            </span>
            <input
              className="new__boat__model__input"
              type={"text"}
              value={model}
              onChange={(e) => {
                setModel(e.target.value);
              }}
            ></input>
          </div>
          <div>
            <span>
              Price
              {/* <span className="new__boat__error"> - *Required</span> */}
              {priceErr && <span className="new__boat__error"> - *1-9999 </span>}
            </span>
            <input
              className="new__boat__price__input"
              type={"text"}
              value={price}
              onChange={(e) => {
                setPrice(e.target.value);
              }}
            ></input>
          </div>
        </div>

        <div className="new__boat__description__container">
          {modelErr && <span id="new__boat__error"> *Make/Model Must be less than 100 characters* </span>}
          <span>A 500 character description of any accessories/features</span>
          {descriptionErr && <span id="new__boat__error"> - must be less than 500 characters - </span>}

          <textarea
            className="new__boat__description"
            value={description}
            onChange={(e) => {
              setDescription(e.target.value);
            }}
          ></textarea>
        </div>
        <div className="new__boat__captain__container">
          <input
            type="checkbox"
            onChange={() => {
              if (!captain) setCaptain(true);
              else {
                setCaptain(false);
              }
            }}
          ></input>
          <div>If you will be captaining your boat or offering to captain your boat check here.</div>
        </div>
        <div className="new__boat__images">
          <span onClick={handleClick} className="boat__images__select">
            <span className="add__boat__pictures__button"></span>
            Select up to 5 images {numImagesErr ? <span className="new__boat__error">{numImagesErr}</span> : null}
            {noImagesErr ? <span className="new__boat__error"> - *Must Provide at least 1 picture</span> : null}
          </span>
          <div className="images__preview__container">
            {preview1 ? <img className="new__boat__image__preview" src={preview1 ? `${preview1}` : null}></img> : null}
            {preview2 ? <img className="new__boat__image__preview" src={preview2 ? `${preview2}` : null}></img> : null}
            {preview3 ? <img className="new__boat__image__preview" src={preview3 ? `${preview3}` : null}></img> : null}
            {preview4 ? <img className="new__boat__image__preview" src={preview4 ? `${preview4}` : null}></img> : null}
            {preview5 ? <img className="new__boat__image__preview" src={preview5 ? `${preview5}` : null}></img> : null}
          </div>
          <input
            className="new__boat__images__input"
            type="file"
            multiple="multiple"
            fieldName="image"
            onChange={(e) => {
              updateImage(e);
            }}
            // className="choose__file__button"
            ref={uploadHiddenInput}
            accept="image/*"
          ></input>
        </div>
        {!imageLoading && !boatSuccess && (
          <div
            className={disabled ? `new__boat__form__button__disabled` : "new__boat__form__button"}
            onClick={disabled ? null : handleSubmit}
          >
            GET STARTED
          </div>
        )}
        {imageLoading && (
          <div
            className={disabled ? `new__boat__form__button__disabled` : "new__boat__form__button"}
            // onClick={disabled ? null : handleSubmit}
          >
            ... loading
          </div>
        )}
        {boatSuccess && (
          <div
            className={disabled ? `new__boat__form__button__disabled` : "new__boat__form__button"}
            // onClick={disabled ? null : handleSubmit}
          >
            SUCCESS
          </div>
        )}
      </form>
    </div>
  );
}

export default NewBoatForm;
