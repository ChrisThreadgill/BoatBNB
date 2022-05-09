import { useEffect, useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { csrfFetch } from "../../store/csrf";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import "./BoatCSS/AddBoat.css";

function AddBoat({ user, view, setView, boat }) {
  const [marina, setMarina] = useState("");
  const [marinaError, setMarinaError] = useState("");
  const [year, setYear] = useState("");
  const [yearError, setYearError] = useState(null);
  const [model, setModel] = useState("");
  const [city, setCity] = useState("");
  const [file, setFile] = useState(null);
  const [fileError, setFileError] = useState("");
  const [images, setImages] = useState([]);
  const [stateCode, setStateCode] = useState("");
  const [stateCodeError, setStateCodeError] = useState("");
  const [price, setPrice] = useState("");
  const [priceError, setPriceError] = useState("");

  const [captain, setCaptain] = useState(false);
  const [accessories, setAccessories] = useState("");
  const [validErrors, setValidErrors] = useState([]);
  // console.log(user.id);

  const stateValidate = new RegExp(
    /^(?:(A[KLRZ]|C[AOT]|D[CE]|FL|GA|HI|I[ADLN]|K[SY]|LA|M[ADEINOST]|N[CDEHJMVY]|O[HKR]|P[AR]|RI|S[CD]|T[NX]|UT|V[AIT]|W[AIVY]))$/
  );

  const yearValidator = new RegExp(/\d+/);

  async function postImage({ image, boatId }) {
    const formData = new FormData();
    formData.append("image", image);
    formData.append("boatId", boatId);
    const result = await axios.post("/api/images", formData, { headers: { "Content-Type": "multipart/form-data" } });
    console.log(result, "please show me the moneyyyyyyyyyyyyy");
    return result.data;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("working");

    const body = { userId: user.id, marina, year, model, city, state: stateCode, accessories, captain, price };
    // console.log(body);
    const newBoat = await csrfFetch(`/api/boats/${user.id}/boats`, {
      method: "POST",
      body: JSON.stringify(body),
    });
    const response = await newBoat.json();
    const boatId = response.newBoat.id;

    const result = await postImage({ image: file, boatId });
    console.log(result);

    setImages([result.image, ...images]);
    setView("boats");

    // console.log(newBoatId);
  };

  useEffect(() => {
    const errors = [];
    if (marina.length > 75) {
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
    if (price.length === 0) {
      errors.push("year error NaN");
      setPriceError("Price must be a number ");
    }

    if (isNaN(price)) {
      errors.push("year error NaN");
      setPriceError("Price must be a number ");
    }
    if (!file?.type.includes("image")) {
      errors.push("File error");
      setFileError("Must Provide a Valid Image");
    }
    setValidErrors(errors);
  }, [marina, year, model, stateCode, price, file]);

  console.log(fileError);

  return (
    <div className="add__boat__container">
      <div className="add__boat__bio">
        <h1>Welcome back {user?.firstName}, tell us about your boat!</h1>

        <div className="boat__disclaimer">
          Be mindful as we do not expect any of our users to act carelessly with your property, however, accidents do
          happen.
          <br></br>
          BoatBNB will not seek litigation for any issues caused with our providers property.
          <br></br>
          Rent at your own risk.
          <br></br>
          <br></br>
          <br></br>
          *****IF YOU CHOOSE TO CAPTAIN YOUR BOAT******
          <br></br>
          Understand that you are responsible for the boatBNB members that have booked your service.
          <br></br>
          <br></br>
          BOATBNB WILL NOT TOLERATE ANY FORMS OF HARASSMENT!
          <br></br>
          ANY BEHAVIOR OF SUCH WILL RESULT IN LOSING PROVIDER PRIVILEGES AND/OR POTENTIALLY BOATBNB MEMBERSHIP ALL
          TOGETHER.
        </div>
      </div>

      <div className="add__boat__form__div">
        <form onSubmit={handleSubmit} className="add__boat__form">
          <div className="add__boat__form__inside__div">
            {marinaError ? <span>{marinaError}</span> : null}
            <label>Marina</label>
            <input
              className="add__boat__inputs"
              type="text"
              name="marina"
              required
              onChange={(e) => {
                setMarina(e.target.value);
              }}
            />

            {validErrors?.yearError ? <span>{validErrors.yearError}</span> : null}
            <label>Year</label>
            <input
              className="add__boat__input__year"
              type="text"
              name="year"
              value={year}
              required
              placeholder="ex. YYYY"
              maxLength={4}
              onChange={(e) => {
                setYear(e.target.value);
              }}
            />

            <label>Model</label>
            <input
              className="add__boat__inputs"
              type="text"
              name="model"
              value={model}
              maxLength={85}
              required
              onChange={(e) => {
                setModel(e.target.value);
              }}
            />

            <label>City</label>
            <input
              className="add__boat__inputs"
              type="text"
              name="city"
              required
              value={city}
              maxLength={40}
              onChange={(e) => {
                setCity(e.target.value);
              }}
            />

            {validErrors?.stateError ? <span>{validErrors.stateError}</span> : null}
            <label>State</label>
            <input
              className="add__boat__input__state"
              type="text"
              name="state"
              required
              placeholder="ex. AR, FL, MI"
              value={stateCode}
              maxLength={2}
              onChange={(e) => {
                setStateCode(e.target.value.toUpperCase());
              }}
            />

            <label>Accessories</label>
            <input
              className="add__boat__inputs"
              type="text"
              name="accessories"
              required
              value={accessories}
              onChange={(e) => {
                setAccessories(e.target.value);
              }}
            />

            <label>Price</label>
            <input
              className="add__boat__input__price"
              type="text"
              maxLength={5}
              required
              placeholder="ex. 100, 1000 "
              name="accessories"
              value={price}
              onChange={(e) => {
                setPrice(e.target.value);
              }}
            />
            <div className="add__boat__radio__buttons__div">
              <label className="add__boat__radio__buttons">
                <input
                  className="add__boat__radio__inputs"
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
              <label className="add__boat__radio__buttons">
                <input
                  className="add__boat__radio__inputs"
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
          </div>

          <div className="add__boat__file__submit">
            <label>Add an Image of Your Boat!</label>
            <input
              onChange={(e) => {
                setFile(e.target.files[0]);
              }}
              className="choose__file__button"
              type="file"
              name="file"
              accept="image/*"
            ></input>

            <button disabled={!!validErrors.length} type="submit">
              Add A Boat
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddBoat;
