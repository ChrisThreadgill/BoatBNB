import { useEffect, useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { csrfFetch } from "../../store/csrf";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";

function AddBoat({ user, view, setView, boat }) {
  const [marina, setMarina] = useState("");
  const [year, setYear] = useState("");
  const [model, setModel] = useState("");
  const [city, setCity] = useState("");
  const [file, setFile] = useState();
  const [images, setImages] = useState([]);
  const [stateCode, setStateCode] = useState("");
  const [price, setPrice] = useState("");
  const [captain, setCaptain] = useState(false);
  const [accessories, setAccessories] = useState("");
  const [validErrors, setValidErrors] = useState({});
  // console.log(user.id);

  const stateValidate = new RegExp(
    /^(?:(A[KLRZ]|C[AOT]|D[CE]|FL|GA|HI|I[ADLN]|K[SY]|LA|M[ADEINOST]|N[CDEHJMVY]|O[HKR]|P[AR]|RI|S[CD]|T[NX]|UT|V[AIT]|W[AIVY]))$/
  );

  async function postImage({ image, boatId }) {
    const formData = new FormData();
    formData.append("image", image);
    formData.append("boatId", boatId);
    const result = await axios.post("/api/images", formData, { headers: { "Content-Type": "multipart/form-data" } });
    return result.data;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    const body = { userId: user.id, marina, year, model, city, state: stateCode, accessories, captain, price };
    // console.log(body);
    const newBoat = await csrfFetch(`/api/boats/${user.id}/boats`, {
      method: "POST",
      body: JSON.stringify(body),
    });
    const response = await newBoat.json();
    const boatId = response.newBoat.id;

    const result = await postImage({ image: file, boatId });
    setImages([result.image, ...images]);
    setView("boats");

    // console.log(newBoatId);
  };

  useEffect(() => {
    // console.log(stateCode);
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
    if (year === "" || year?.length !== 4 || year < 1940 || year > 2025) {
      errors.yearError = "Please enter a valid year in the format 'YYYY'.";
    }
    // console.log(errors.yearError);

    if (!stateValidate.test(stateCode)) {
      errors.stateError = 'Please provide a valid 2 digit state code I.e."AR"';
    }

    // console.log(errors);

    setValidErrors(errors);
  }, [marina, year, model, stateCode]);

  useEffect(() => {
    const errors = {
      marinaError: null,
      yearError: null,
      cityError: null,
      stateError: null,
    };
    setValidErrors(errors);
  }, []);

  return (
    <div className="add__boat__container">
      <div className="add__boat__bio">
        <h2>Welcome back {user?.firstName}, tell us about your boat!</h2>

        <p>
          Be mindful as we do not expect any of our users to act carelessly with your property, however, accidents do
          happen.
          <br></br>
          BoatBNB will not seek litigation for any issues caused with our providers property.
          <br></br>
          Rent at your own risk.
          <br></br>
          *****IF YOU CHOOSE TO CAPTAIN YOUR BOAT******
          <br></br>
          Understand that you are responsible for the boatBNB members that have booked your service.
          <br></br>
          BOATBNB WILL NOT TOLERATE ANY FORMS OF HARASSMENT!
          <br></br>
          ANY BEHAVIOR OF SUCH WILL RESULT IN LOSING PROVIDER PRIVILEGES AND/OR POTENTIALLY BOATBNB MEMBERSHIP ALL
          TOGETHER.
        </p>
      </div>

      <div>
        <form onSubmit={handleSubmit}>
          <label>
            Marina
            {validErrors.marinaError ? <span>{validErrors.marinaError}</span> : null}
            <input
              type="text"
              name="marina"
              onChange={(e) => {
                setMarina(e.target.value);
              }}
            />
          </label>
          <label>
            Year
            {validErrors.yearError ? <span>{validErrors.yearError}</span> : null}
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

          <div>
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
            <button type="submit">Add A Boat</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddBoat;

// useEffect(() => {
//   const errors = {
//     marinaError: null,
//     yearError: null,
//     cityError: null,
//     stateError: null,
//   };
//   if (marina === "") {
//     errors.marinaError = "Please provide the marina your boat is at.";
//   }
//   if (year === "" || year.length !== 4 || year < 1940 || year > 2025) {
//     errors.yearError = "Please enter a valid year in the format 'YYY'.";
//   }
//   if (
//     state.toUpperCase() !==
//     /^(?:(A[KLRZ]|C[AOT]|D[CE]|FL|GA|HI|I[ADLN]|K[SY]|LA|M[ADEINOST]|N[CDEHJMVY]|O[HKR]|P[AR]|RI|S[CD]|T[NX]|UT|V[AIT]|W[AIVY]))$/
//   ) {
//     errors.stateError = 'Please provide a valid 2 digit state code I.e."AR"';
//   }

//   setValidErrors(errors);
// }, [marina, year, state]);

// <div className="add__boat__container">
//   <div className="add__boat__bio">
//     <h2>Welcome back {user.firstName}, tell us about your boat!</h2>
//     <p>
//       Please be cautious as you rent out your personal boats. Be mindful as we do not expect any of our users to act
//       carelessly with your property accidents do happen. BoatBNB will not seek litigation for any issues caused with
//       our providers property. Rent at your own risk. *****IF YOU ARE CHOOSE TO CAPTAIN YOUR BOAT****** Understand
//       that you are responsible for the boatBNB members that have booked your service. BOATBNB WILL NOT TOLERATE ANY
//       FORMS OF HARASSMENT! ANY BEHAVIOR OF SUCH WILL RESULT IN LOSING PROVIDER PRIVILEGES AND/OR POTENTIALLY BOATBNB
//       MEMBERSHIP ALL TOGETHER.
//     </p>
//   </div>
//   <div>
//     <form
//       onSubmit={(e) => {
//         e.preventDefault();
//       }}
//     >
//       <label>
//         Marina
//         {/* {validErrors.marinaError ? <span>{validErrors.marinaError}</span> : null} */}
//         <input
//           type="text"
//           name="marina"
//           value={marina}
//           onChange={(e) => {
//             setMarina(e.target.value);
//           }}
//         />
//       </label>
//       <label>
//         Year
//         {/* {validErrors.yearError ? <span>{validErrors.yearError}</span> : null} */}
//         <input
//           type="text"
//           name="year"
//           value={year}
//           placeholder="YYYY"
//           maxLength={4}
//           onChange={(e) => {
//             setYear(e.target.value);
//           }}
//         />
//       </label>
//       <label>
//         Model
//         <input
//           type="text"
//           name="model"
//           value={model}
//           onChange={(e) => {
//             setModel(e.target.value);
//           }}
//         />
//       </label>
//       <label>
//         City
//         <input
//           type="text"
//           name="city"
//           value={city}
//           onChange={(e) => {
//             setCity(e.target.value);
//           }}
//         />
//       </label>
//       <label>
//         State
//         {/* {validErrors.stateError ? <span>{validErrors.stateError}</span> : null} */}
//         <input
//           type="text"
//           name="state"
//           value={state}
//           onChange={(e) => {
//             setState(e.target.value);
//           }}
//         />
//       </label>
//       <label>
//         Accessories
//         <input
//           type="text"
//           name="accessories"
//           value={accessories}
//           onChange={(e) => {
//             setAccessories(e.target.value);
//           }}
//         />
//       </label>
//       <button type="submit">Add A Boat</button>
//     </form>
//   </div>
// </div>
