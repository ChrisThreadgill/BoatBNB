import "./NewBoatForm.css";

import { GoogleMap, useJsApiLoader, useLoadScript } from "@react-google-maps/api";
import usePlacesAutoComplete, { getGeocode, getLatLng } from "use-places-autocomplete";

import { useState, useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import { years } from "../../Utils";
import * as boatsActions from "../../../store/boats";

function NewBoatForm() {
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
  const [description, setDescription] = useState("");
  const [descriptionErr, setDescriptionErr] = useState(false);
  const [addressErr, setAddressErr] = useState(false);
  const [year, setYear] = useState("");
  const [yearErr, setYearErr] = useState(false);
  const [numImagesErr, setNumImagesErr] = useState("");
  const [images, setImages] = useState([]);
  const [imageOneLoaded, setImageOneLoaded] = useState(false);
  const [imageTwoLoaded, setImageTwoLoaded] = useState(false);
  const [imageThreeLoaded, setImageThreeLoaded] = useState(false);
  const [imageFourLoaded, setImageFourLoaded] = useState(false);
  const [imageFiveLoaded, setImageFiveLoaded] = useState(false);

  //

  const {
    ready,
    value,
    suggestions: { status, data },
    setValue,
    clearSuggestions,
  } = usePlacesAutoComplete({
    requestOptions: { location: { lng: () => 37.0902, lng: () => 95.7129 }, radius: 200 * 1000 },
  });
  console.log(value, status, "---------");
  const updateImage = (e) => {
    setNumImagesErr("");
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
  const handleSubmit = async () => {
    console.log("helooooooooooooooo");
    console.log(model, description, address, city, state, year, lat, lng);
    console.log(images);
    dispatch(boatsActions.uploadBoatPhoto(images, 4));

    // dispatch(boatsActions.uploadBoatPhoto());
  };

  useEffect(() => {
    setModelErr(false);
    setDescriptionErr(false);
    setDisabled(false);
    if (model.length > 100) {
      setModelErr(true);
      setDisabled(true);
    }
    if (description.length > 500) {
      setDescriptionErr(true);
      setDisabled(true);
    }
  }, [model, description]);

  return (
    <div className="new__boat__listing__container">
      <div className="new__boat__listing__header__container">
        <h1>Tell us a little about your boat</h1>
        <div>
          Please make sure your address to the boat's location is correct and you specify if it is already at a slip.
        </div>
      </div>
      <form className="new__boat__form" onSubmit={handleSubmit}>
        <div className="address__input__container">
          <div className="address__suggestions__wrapper">
            <span>
              Address
              {addressErr && (
                <span className="new__boat__error"> - address must be in format "STREET ADDRESS, CITY, ST, USA"</span>
              )}
            </span>
            <input
              type="text"
              value={value}
              onChange={(e) => setValue(e.target.value)}
              disabled={!ready}
              placeholder="Address"
              className="new__boat__address__input"
            ></input>

            {status === "OK" && (
              <div className="address__suggestion__container">
                {status === "OK" &&
                  data.map(({ id, description }) => {
                    return (
                      <div
                        key={id}
                        className="address__suggestion__option"
                        onClick={async () => {
                          const address = description;
                          const addressArr = address.split(",");
                          const results = await getGeocode({ address });
                          const getLatLng = results[0].geometry.location;
                          // console.log(addressArr[addressArr.length - 2]);
                          setLat(getLatLng.lat());
                          setLng(getLatLng.lng());
                          setCity(addressArr[addressArr.length - 3]);
                          setState(addressArr[addressArr.length - 2]);
                          setAddress(addressArr[0]);
                          setValue(address);
                          // clearSuggestions();
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
              {modelErr && <span className="new__boat__error"> - *Must be less than 100 characters </span>}
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
        </div>

        <div className="new__boat__description__container">
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
        <div className="new__boat__images">
          <span onClick={handleClick} className="boat__images__select">
            <span className="add__boat__pictures__button"></span>
            Select up to 5 images {numImagesErr ? <span className="new__boat__error">{numImagesErr}</span> : null}
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
        <div
          className={disabled ? `new__boat__form__button__disabled` : "new__boat__form__button"}
          onClick={disabled ? null : handleSubmit}
        >
          GET STARTED
        </div>
      </form>
    </div>
  );
}

export default NewBoatForm;
