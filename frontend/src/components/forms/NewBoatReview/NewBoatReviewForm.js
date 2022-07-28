import "./NewBoatReviewForm.css";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { FaStar, FaSoap, FaCouch, FaWrench } from "react-icons/fa";
import NewBoatReviewCard from "./NewBoatReviewCard";
import * as reviewActions from "../../../store/boatReviews";
import * as ratingActions from "../../../store/boatRatings";

function NewBoatReviewForm({ reviews, setShowModal }) {
  const { boatId } = useParams();
  const dispatch = useDispatch();

  const user = useSelector((state) => state.session.user);
  const [rating, setRating] = useState(null);
  const [hover, setHover] = useState(null);

  const [func, setFunc] = useState(null);
  const [funcHover, setFuncHover] = useState(null);

  const [comfort, setComfort] = useState(null);
  const [comfortHover, setComfortHover] = useState(null);

  const [clean, setClean] = useState(null);
  const [cleanHover, setCleanHover] = useState(null);

  const [reviewLengthError, setReviewLengthError] = useState(null);
  const [review, setReview] = useState("");

  useEffect(() => {
    if (review.length > 500) setReviewLengthError("Please limit your review to 500 characters");
    if (review.length < 500) setReviewLengthError(false);
  }, [review, reviewLengthError]);
  //

  const handleSubmit = async (e) => {
    e.preventDefault();

    let boatReviewId = null;
    if (rating && !review) {
      let ratingBody = {
        userId: user.id,
        boatId,
        cleanliness: clean,
        average: rating,
        functional: func,
        comfort: comfort,
        boatReviewId,
      };
      if (!func || func === null) ratingBody.functional = 1;
      if (!clean || clean === null) ratingBody.cleanliness = 1;
      if (!comfort || comfort === null) ratingBody.comfort = 1;

      dispatch(ratingActions.addBoatRatingNR(ratingBody)).then((res) => {
        setRating(0);
        setClean(0);
        setComfort(0);
        setFunc(0);
        setShowModal(false);
        window.location.reload();
      });
    }
    if (!reviewLengthError) {
      if (review && !rating) {
        const reviewBody = { userId: user.id, boatId, review };

        dispatch(reviewActions.addReview(reviewBody)).then((res) => {
          setReview("");
          setShowModal(false);
          window.location.reload();
        });
      }
      if (review && rating) {
        const ratingBody = {
          userId: user.id,
          boatId,
          average: rating,
          cleanliness: clean,
          functional: func,
          comfort: comfort,
          boatReviewId,
        };
        if (func === 0) ratingBody.functional = rating;
        if (clean === 0) ratingBody.cleanliness = rating;
        if (comfort === 0) ratingBody.comfort = rating;
        const reviewBody = { userId: user.id, boatId, review };

        dispatch(reviewActions.addReviewWithRating(reviewBody, ratingBody)).then((res) => {
          setReview("");
          setRating(0);
          setClean(0);
          setComfort(0);
          setFunc(0);
          setShowModal(false);
          window.location.reload();
        });
      }
    }
  };

  // console.log(reviews, "-------------------");
  return (
    <div className="boat__review__form__modal__wrapper">
      <h1>Ratings {"& "}reviews</h1>

      <form className="boat__review__form" onSubmit={handleSubmit}>
        <div className="new__boat__rating__container">
          <div className="new__boat__review__container">
            <div>Leave a review </div>
            {reviewLengthError ? (
              <span className="new__boat__error">- * Review must be between 1-500 characters * -</span>
            ) : null}
            <textarea className="new__boat__review__text__area" onChange={(e) => setReview(e.target.value)}></textarea>
            <button onClick={handleSubmit}>SUBMIT</button>
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
