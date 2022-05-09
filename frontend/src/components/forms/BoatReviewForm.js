import { useSelector } from "react-redux";
import { useEffect, useState } from "react";

import * as reviewActions from "../../store/boatReviews";
import * as ratingActions from "../../store/boatRatings";
import { useDispatch } from "react-redux";
import "./forms.css/BoatReviewForm.css";
import { useParams } from "react-router-dom";

function BoatReviewForm({ boat, rating, setRating, setClean, setComfort, setFunc, func, comfort, clean }) {
  const dispatch = useDispatch();
  const { boatId } = useParams();
  const loggedInUser = useSelector((state) => state.session.user);
  const [reviewLengthError, setReviewLengthError] = useState(null);
  const [review, setReview] = useState("");

  useEffect(() => {
    if (review.length > 500) setReviewLengthError("Please limit your review to 500 characters");
    if (review.length < 500) setReviewLengthError(false);
  }, [review, reviewLengthError]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    let boatReviewId = null;
    if (rating && !review) {
      let ratingBody = {
        userId: loggedInUser.id,
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

      dispatch(ratingActions.addBoatRatingNR(ratingBody));

      setRating(0);
      setClean(0);
      setComfort(0);
      setFunc(0);
    }
    if (!reviewLengthError) {
      if (review && !rating) {
        const reviewBody = { userId: loggedInUser.id, boatId, review };

        dispatch(reviewActions.addReview(reviewBody));

        setReview("");
      }
      if (review && rating) {
        const ratingBody = {
          userId: loggedInUser.id,
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
        const reviewBody = { userId: loggedInUser.id, boatId, review };

        dispatch(reviewActions.addReviewWithRating(reviewBody, ratingBody));

        setReview("");
        setRating(0);
        setClean(0);
        setComfort(0);
        setFunc(0);
      }
    }
  };

  return (
    <div>
      {reviewLengthError && <span>Review Must be less than 500 Characters!</span>}
      <div className="boat__review__container">
        <form onSubmit={handleSubmit} className="boat__review__form">
          <label>Leave a review!</label>
          <textarea
            className="review__text__area"
            cols="40"
            rows="4"
            value={review}
            onChange={(e) => {
              setReview(e.target.value);
            }}
          ></textarea>
          <button disabled={reviewLengthError} type="submit">
            Add Review!
          </button>
        </form>
      </div>
    </div>
  );
}

export default BoatReviewForm;
