import "./NewBoatReviewForm.css";
import { useState } from "react";
import { FaStar, FaSoap, FaCouch, FaWrench } from "react-icons/fa";
import NewBoatReviewCard from "./NewBoatReviewCard";

function NewBoatReviewForm({ reviews }) {
  const [rating, setRating] = useState(null);
  const [hover, setHover] = useState(null);

  const [func, setFunc] = useState(null);
  const [funcHover, setFuncHover] = useState(null);

  const [comfort, setComfort] = useState(null);
  const [comfortHover, setComfortHover] = useState(null);

  const [clean, setClean] = useState(null);
  const [cleanHover, setCleanHover] = useState(null);
  //
  console.log(reviews, "-------------------");
  return (
    <div className="boat__review__form__modal__wrapper">
      <h1>Ratings {"& "}reviews</h1>

      <form className="boat__review__form">
        <div className="new__boat__rating__container">
          <div className="new__boat__review__container">
            <div>Leave a review</div>
            <textarea className="new__boat__review__text__area"></textarea>
            <button>SUBMIT</button>
          </div>
          <div className="star__rating__form">
            <div>
              <h3>Average</h3>
              {[...Array(5)].map((star, idx) => {
                const currentVal = idx + 1;
                return (
                  <label key={idx + 1}>
                    <input
                      className="star__radio__buttons"
                      type="radio"
                      name="rating"
                      value={currentVal}
                      onClick={() => {
                        setRating(currentVal);
                        setFunc(currentVal);
                        setComfort(currentVal);
                        setClean(currentVal);
                      }}
                    ></input>
                    <FaStar
                      size={13}
                      color={currentVal <= (hover || rating) ? "#72d4ba" : "#adc0d8"}
                      className="user__stars"
                      onMouseEnter={() => setHover(currentVal)}
                      onMouseLeave={() => setHover(null)}
                    ></FaStar>
                  </label>
                );
              })}
            </div>

            <div>
              <h3>Functionality</h3>
              {[...Array(5)].map((star, idx) => {
                const currentVal = idx + 1;
                return (
                  <label key={idx + 1}>
                    <input
                      className="star__radio__buttons"
                      type="radio"
                      name="rating"
                      value={currentVal}
                      onClick={() => setFunc(currentVal)}
                    ></input>
                    <FaWrench
                      size={10}
                      color={currentVal <= (funcHover || func) ? "#72d4ba" : "#adc0d8"}
                      className="user__stars"
                      onMouseEnter={() => setFuncHover(currentVal)}
                      onMouseLeave={() => setFuncHover(null)}
                    ></FaWrench>
                  </label>
                );
              })}
            </div>

            <div>
              <h3>Comfort</h3>
              {[...Array(5)].map((star, idx) => {
                const currentVal = idx + 1;
                return (
                  <label key={idx + 1}>
                    <input
                      className="star__radio__buttons"
                      type="radio"
                      name="rating"
                      value={currentVal}
                      onClick={() => setComfort(currentVal)}
                    ></input>
                    <FaCouch
                      size={10}
                      color={currentVal <= (comfortHover || comfort) ? "#72d4ba" : "#adc0d8"}
                      className="user__stars"
                      onMouseEnter={() => setComfortHover(currentVal)}
                      onMouseLeave={() => setComfortHover(null)}
                    ></FaCouch>
                  </label>
                );
              })}
            </div>

            <div>
              <h3>Cleanliness</h3>
              {[...Array(5)].map((star, idx) => {
                const currentVal = idx + 1;
                return (
                  <label key={idx + 1}>
                    <input
                      className="star__radio__buttons"
                      type="radio"
                      name="rating"
                      value={currentVal}
                      onClick={() => setClean(currentVal)}
                    ></input>
                    <FaSoap
                      size={10}
                      color={currentVal <= (cleanHover || clean) ? "#72d4ba" : "#adc0d8"}
                      className="user__stars"
                      onMouseEnter={() => setCleanHover(currentVal)}
                      onMouseLeave={() => setCleanHover(null)}
                    ></FaSoap>
                  </label>
                );
              })}
            </div>
          </div>
        </div>
      </form>
      <div className="reviews__modal__display">
        <div className="modal__reviews__container">
          {reviews &&
            reviews.map((review) => {
              return <NewBoatReviewCard review={review}></NewBoatReviewCard>;
            })}
        </div>
      </div>
    </div>
  );
}

export default NewBoatReviewForm;
