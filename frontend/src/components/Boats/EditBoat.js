import { useEffect, useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import * as bookingsActions from "../../store/bookings.js";
import { csrfFetch } from "../../store/csrf";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useHistory } from "react-router-dom";
import "./BoatCSS/EditBoat.css";

function EditBoat({ user, view, setView, boat }) {
  const history = useHistory();
  const userId = user.id;
  const dispatch = useDispatch();
  const bookingsObj = useSelector((state) => state.bookings);
  const bookingsArr = Object.values(bookingsObj);
  // console.log(bookingsArr);

  let {
    id: boatId,
    marina: cMarina,
    year: cYear,
    model: cModel,
    city: cCity,
    state: cState,
    price: cPrice,
    captain: cCaptain,
    accessories: cAccessories,
  } = boat;

  // console.log(userId);
  const [marina, setMarina] = useState(cMarina);
  const [year, setYear] = useState(cYear);
  const [model, setModel] = useState(cModel);
  const [city, setCity] = useState(cCity);
  const [file, setFile] = useState();
  const [images, setImages] = useState([]);
  const [stateCode, setStateCode] = useState(cState);
  const [price, setPrice] = useState(cPrice);
  const [captain, setCaptain] = useState(cCaptain);
  const [accessories, setAccessories] = useState(cAccessories);
  const [validErrors, setValidErrors] = useState({});
  // console.log(user.id);

  const stateValidate = new RegExp(
    /^(?:(A[KLRZ]|C[AOT]|D[CE]|FL|GA|HI|I[ADLN]|K[SY]|LA|M[ADEINOST]|N[CDEHJMVY]|O[HKR]|P[AR]|RI|S[CD]|T[NX]|UT|V[AIT]|W[AIVY]))$/
  );

  async function postImage({ image }) {
    const formData = new FormData();
    formData.append("image", image);
    formData.append("boatId", boatId);
    const result = await axios.post("/api/images", formData, { headers: { "Content-Type": "multipart/form-data" } });
    return result.data;
  }

  const handleSubmit = async (e) => {
    const body = { userId, marina, year, model, city, state: stateCode, accessories, captain, price };

    const newBoat = await csrfFetch(`/api/boats/${boatId}`, {
      method: "PUT",
      body: JSON.stringify(body),
    });
    const response = await newBoat.json();

    history.push(`/boat/${boatId}/edit`);
  };

  const deleteBoat = async (e) => {
    // console.log("working");
    e.preventDefault();
    const deletedBoat = await csrfFetch(`/api/boats/${boatId}`, {
      method: "DELETE",
    });
    const response = await deletedBoat.json();
    // console.log(response.message);
    // if (response.message === "Successfully Removed Boat") {
    //   console.log("working");
    history.push(`/users/${userId}/profile`);
    // }
  };

  useEffect(() => {
    // console.log(boatId);
    // console.log(Cookies.get("XSRF-Token"), "XSRFFFFFFFFFFFFF");
    const errors = {
      marinaError: null,
      yearError: null,
      cityError: null,
      stateError: null,
    };

    if (!marina?.length) {
      errors.marinaError = "Please provide the marina your boat is at.";
    }
    // console.log(errors.marinaError);
    if (year === "") {
      errors.yearError = "Please enter a valid year in the format 'YYYY'.";
    }
    // console.log(errors.yearError);

    if (!stateValidate.test(stateCode)) {
      errors.stateError = 'Please provide a valid 2 digit state code I.e."AR"';
    }

    // console.log(errors);

    setValidErrors(errors);
  }, [marina, year, model, stateCode]);

  // useEffect(() => {
  //   const errors = {
  //     marinaError: null,
  //     yearError: null,
  //     cityError: null,
  //     stateError: null,
  //   };
  //   setValidErrors(errors);
  // }, []);

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
                value={city}
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
            <button type="submit">Update Your Boat</button>
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
            <button>Add a boat Image</button>
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
