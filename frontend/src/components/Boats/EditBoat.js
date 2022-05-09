import { useEffect, useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import * as boatActions from "../../store/boats";
import { csrfFetch } from "../../store/csrf";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useHistory } from "react-router-dom";
import "./BoatCSS/EditBoat.css";

function EditBoat({ user, view, setView, boat }) {
  const history = useHistory();
  const userId = user.id;
  const dispatch = useDispatch();
  const { boatId } = useParams();
  const currentBoat = boat[boatId];
  const bookingsObj = useSelector((state) => state.bookings);

  const bookingsArr = Object.values(bookingsObj);

  const [marina, setMarina] = useState(currentBoat?.marina);
  const [year, setYear] = useState(currentBoat?.year);
  const [model, setModel] = useState(currentBoat?.model);
  const [city, setCity] = useState(currentBoat?.city);
  const [file, setFile] = useState();
  const [stateCode, setStateCode] = useState(currentBoat?.state);
  const [price, setPrice] = useState(currentBoat?.price);
  const [captain, setCaptain] = useState(currentBoat?.captain);
  const [accessories, setAccessories] = useState(currentBoat?.accessories);
  const [validErrors, setValidErrors] = useState({});

  const [marinaError, setMarinaError] = useState("");
  const [yearError, setYearError] = useState(null);
  const [fileError, setFileError] = useState([]);
  const [images, setImages] = useState([]);
  const [stateCodeError, setStateCodeError] = useState("");
  const [priceError, setPriceError] = useState("");
  const [invalidFileError, setInvalidFileError] = useState([]);

  const stateValidate = new RegExp(
    /^(?:(A[KLRZ]|C[AOT]|D[CE]|FL|GA|HI|I[ADLN]|K[SY]|LA|M[ADEINOST]|N[CDEHJMVY]|O[HKR]|P[AR]|RI|S[CD]|T[NX]|UT|V[AIT]|W[AIVY]))$/
  );

  async function postImage({ image }) {
    const formData = new FormData();
    formData.append("image", image);
    formData.append("boatId", boatId);
    const result = await axios.post("/api/images", formData, { headers: { "Content-Type": "multipart/form-data" } });

    if (result.ok) {
      history.push(`/users/${userId}/profile`);
      return result.data;
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    const body = { boatId, userId, marina, year, model, city, state: stateCode, accessories, captain, price };
    dispatch(boatActions.updateOneBoat(body));
  };

  const deleteBoat = async (e) => {
    e.preventDefault();
    const deletedBoat = await csrfFetch(`/api/boats/${boatId}`, {
      method: "DELETE",
    });
    const response = await deletedBoat.json();

    history.push(`/users/${userId}/profile`);
  };

  useEffect(() => {
    const invalidFile = [];
    const errors = [];

    if (marina?.length > 75) {
      errors.push("marina error");
      setMarinaError("The Marina can only be 75 characters");
    }

    if (year === "") {
      errors.push("year error");
      setYearError("You must provide a year");
    }

    if (year < 1990 || year > 2050 || year === typeof "string") {
      errors.push("year error NaN");
      setYearError("Year Must be a number ");
    }
    if (isNaN(year)) {
      errors.push("year error NaN");
      setYearError("Year Must be a number ");
    }

    if (!stateValidate.test(stateCode)) {
      errors.push("valid year error");
      setStateCodeError("Please provide a valid 2 digit state code");
    }

    if (file === null) {
      errors.push("file error");

      setFileError("Must Provide a Valid Image");
    }
    if (price?.length === 0) {
      errors.push("year error NaN");
      setPriceError("Price must be a number ");
    }

    if (isNaN(price)) {
      errors.push("year error NaN");
      setPriceError("Price must be a number ");
    }
    if (!file?.type.includes("image")) {
      invalidFile.push("File error");
      setFileError("Must Provide a Valid Image");
    }
    setInvalidFileError(invalidFile);
    setValidErrors(errors);
  }, [marina, year, model, stateCode, price, file]);

  return (
    <div className="edit__boat__container">
      <div className="manage__boat__form__container">
        <form onSubmit={handleSubmit} className="edit__boat__form">
          <div>
            <label>
              Marina
              {validErrors.marinaError ? <span>{validErrors.marinaError}</span> : null}
              <input
                type="text"
                value={marina}
                required
                maxLength={70}
                name="marina"
                onChange={(e) => {
                  setMarina(e.target.value);
                }}
              />
            </label>
          </div>
          {validErrors.yearError ? <span>{validErrors.yearError}</span> : null}
          <div>
            <label>
              Year
              <input
                type="text"
                name="year"
                value={year}
                required
                placeholder="YYYY"
                maxLength={4}
                onChange={(e) => {
                  setYear(e.target.value);
                }}
              />
            </label>
          </div>
          <div>
            <label>
              Model
              <input
                type="text"
                name="model"
                required
                maxLength={100}
                value={model}
                onChange={(e) => {
                  setModel(e.target.value);
                }}
              />
            </label>
          </div>
          <div>
            <label>
              City
              <input
                type="text"
                name="city"
                required
                value={city}
                maxLength={50}
                onChange={(e) => {
                  setCity(e.target.value);
                }}
              />
            </label>
          </div>
          <div>
            <label>
              State
              {validErrors.stateError ? <span>{validErrors.stateError}</span> : null}
              <input
                type="text"
                name="state"
                required
                value={stateCode}
                maxLength={2}
                onChange={(e) => {
                  setStateCode(e.target.value.toUpperCase());
                }}
              />
            </label>
          </div>
          <div>
            <label>
              Accessories
              <input
                type="text"
                name="accessories"
                required
                value={accessories}
                onChange={(e) => {
                  setAccessories(e.target.value);
                }}
              />
            </label>
          </div>
          <div>
            <label>
              Price
              <input
                type="text"
                maxLength={4}
                required
                placeholder="ex. 100, 1000 no decimal"
                name="accessories"
                value={price}
                onChange={(e) => {
                  setPrice(e.target.value);
                }}
              />
            </label>
          </div>

          <div>
            <label>
              <input
                type="radio"
                value={false}
                name="captain"
                // checked={captain === false}
                onChange={(e) => {
                  setCaptain(e.target.value);
                }}
              />
              No Captain
            </label>
            <label>
              <input
                type="radio"
                value={true}
                name="captain"
                // checked={captain === true}
                onChange={(e) => {
                  setCaptain(e.target.value);
                }}
              />
              Captain available
            </label>
          </div>

          <div>
            <button disabled={!!validErrors.length} type="submit">
              Update Your Boat
            </button>
          </div>
        </form>
        <div className="add__boat__images">
          <form
            onSubmit={() => {
              postImage({ image: file });
            }}
            className="add__boat__image__form"
          >
            <label>
              images
              <input
                onChange={(e) => {
                  setFile(e.target.files[0]);
                }}
                type="file"
                name="file"
                accept="image/*"
              ></input>
            </label>
            <button disabled={!!invalidFileError.length}>Add a boat Image</button>
          </form>
        </div>
      </div>

      <div>
        <form onSubmit={deleteBoat} className="delete__boat__form">
          <button type="submit">Delete this listing</button>
        </form>
      </div>
    </div>
  );
}

export default EditBoat;
