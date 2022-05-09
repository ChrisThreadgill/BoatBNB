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
  const [validErrors, setValidErrors] = useState([]);

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
    console.log(result);

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
    const errors = [];
    if (marina?.length > 75) {
      errors.push("Marina can only be 75 character");
      setMarinaError("The Marina can only be 75 characters");
    }

    setValidErrors(errors);
  }, [marina]);

  useEffect(() => {
    const errors = [];
    if (year < 1800 || year > 2050 || year === typeof "string") {
      errors.push("Year Must be between 1800-2050");
      setYearError("Year Must be a number ");
    }
    if (isNaN(year)) {
      errors.push("Year must be a number YYYY");
      setYearError("Year Must be a number ");
    }

    setValidErrors(errors);
  }, [year]);

  useEffect(() => {
    const errors = [];
    if (model.length > 99) {
      errors.push("Model can only have 100 characters");
      setStateCodeError("Model too long");
    }

    setValidErrors(errors);
  }, [model]);

  useEffect(() => {
    const errors = [];
    if (!stateValidate.test(stateCode)) {
      errors.push("Must provide a 2 digit state code");
      setStateCodeError("Please provide a valid 2 digit state code");
    }
    setValidErrors(errors);
  }, [stateCode]);

  useEffect(() => {
    const errors = [];
    if (price <= 0) {
      errors.push("Rental must have a price!");
      setPriceError("Price must be a number ");
    }

    if (isNaN(price)) {
      errors.push("Price Must be a number ");
      setPriceError("Price must be a number ");
    }
    setValidErrors(errors);
  }, [price]);

  useEffect(() => {
    const errors = [];
    const invalidFile = [];

    if (!file?.type.includes("image")) {
      errors.push("File must me an image");
      invalidFile.push("must have a valid file");
      setFileError("Must Provide a Valid Image");
      setInvalidFileError("Must Be a valid image");
    }

    setInvalidFileError(invalidFile);
  }, [file]);
  useEffect(() => {
    setValidErrors([]);
  }, []);

  return (
    <div className="edit__boat__container">
      <div className="manage__boat__form__container">
        <form onSubmit={handleSubmit} className="edit__boat__form">
          <div>
            <label className="edit__boat__labels">
              Marina
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

          <div>
            <label className="edit__boat__labels">
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
            <label className="edit__boat__labels">
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
            <label className="edit__boat__labels">
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
            <label className="edit__boat__labels">
              State
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
            <label className="edit__boat__labels">
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
            <label className="edit__boat__labels">
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
            <label className="edit__boat__labels">
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
            <label className="edit__boat__labels">
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
            <button disabled={!!validErrors?.length} type="submit">
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
            <label className="edit__boat__labels">
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
            <button disabled={!!invalidFileError?.length}>Add a boat Image</button>
          </form>
        </div>
      </div>

      <div>
        <form onSubmit={deleteBoat} className="delete__boat__form">
          <button type="submit">Delete this listing</button>
        </form>
      </div>
      <div className="boat__add__errors">
        <ul className="errors">
          {validErrors &&
            validErrors?.map((error, idx) => {
              return (
                <li key={idx} className="list__errors">
                  {error}
                </li>
              );
            })}
        </ul>
      </div>
    </div>
  );
}

export default EditBoat;
