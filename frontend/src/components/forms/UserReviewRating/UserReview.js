import "./UserReviewForm.css";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { FaStar, FaSoap, FaCouch, FaWrench, FaRegSmile, FaRegHandshake, FaRegClock } from "react-icons/fa";

import * as reviewActions from "../../../store/userReviews";
import * as ratingActions from "../../../store/userRatings";

function UserReviewForm({ setShowModal }) {
  const { boatId } = useParams();
  const dispatch = useDispatch();

  const user = useSelector((state) => state.session.user);
  const userProfile = useSelector((state) => state.userProfile);
  const [rating, setRating] = useState(null);
  const [hover, setHover] = useState(null);

  const [friend, setFriend] = useState(null);
  const [friendHover, setFriendHover] = useState(null);

  const [punc, setPunc] = useState(null);
  const [puncHover, setPuncHover] = useState(null);

  const [trust, setTrust] = useState(null);
  const [trustHover, setTrustHover] = useState(null);

  const [reviewLengthError, setReviewLengthError] = useState(null);
  const [review, setReview] = useState("");

  useEffect(() => {
    if (review.length > 500) setReviewLengthError("Please limit your review to 500 characters");
    if (review.length < 500) setReviewLengthError(false);
  }, [review, reviewLengthError]);
  //

  const handleSubmit = async (e) => {
    e.preventDefault();

    let userReviewId = null;
    if (rating && !review) {
      let ratingBody = {
        userId: userProfile.user.id,
        reviewerId: user.id,
        friendliness: friend,
        average: rating,
        punctuality: punc,
        trustworthy: trust,
        userReviewId,
      };
      if (!punc || punc === null) ratingBody.punctuality = 1;
      if (!friend || friend === null) ratingBody.friendliness = 1;
      if (!trust || trust === null) ratingBody.trustworthy = 1;

      dispatch(ratingActions.addUserRatingNR(ratingBody)).then((res) => {
        setRating(0);
        setTrust(0);
        setFriend(0);
        setPunc(0);
        setShowModal(false);
        window.location.reload();
      });
    }
    if (!reviewLengthError) {
      if (review && !rating) {
        const reviewBody = { userId: userProfile.user.id, reviewerId: user.id, content: review };

        dispatch(reviewActions.addReview(reviewBody));
        window.location.reload();
        setTimeout(() => {
          setReview("");
          setShowModal(false);
        }, 800);
      }
      if (review && rating) {
        const ratingBody = {
          userId: userProfile.user.id,
          reviewerId: user.id,
          friendliness: friend,
          average: rating,
          punctuality: punc,
          trustworthy: trust,
          userReviewId,
        };
        if (punc === 0) ratingBody.punctuality = rating;
        if (friend === 0) ratingBody.friendliness = rating;
        if (trust === 0) ratingBody.trustworthy = rating;
        const reviewBody = { userId: userProfile.user.id, reviewerId: user.id, content: review };

        dispatch(reviewActions.addReviewWithRating(reviewBody, ratingBody));

        window.location.reload();
        setTimeout(() => {
          setReview("");
          setRating(0);
          setTrust(0);
          setFriend(0);
          setPunc(0);
          setShowModal(false);
        }, 800);
      }
    }
  };
  //

  return (
    <div className="user__review__form__modal__wrapper">
      <div className="user__review__form__header__container">
        <h2 className="user__review__form__header">{`Tell us what ${userProfile.user.firstName
          .slice(0, 1)
          .toUpperCase()}${userProfile.user.firstName.slice(1)} did well`}</h2>

        <img className="user__review__form__profile__picture" src={userProfile.user.profilePicture}></img>
      </div>

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
              <h3>Rating</h3>
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
                        setPunc(currentVal);
                        setFriend(currentVal);
                        setTrust(currentVal);
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
              <h3>Friendliness</h3>
              {[...Array(5)].map((star, idx) => {
                const currentVal = idx + 1;
                return (
                  <label key={idx + 1}>
                    <input
                      className="star__radio__buttons"
                      type="radio"
                      name="rating"
                      value={currentVal}
                      onClick={() => setFriend(currentVal)}
                    ></input>
                    <FaRegSmile
                      size={12}
                      color={currentVal <= (friendHover || friend) ? "#72d4ba" : "#adc0d8"}
                      className="user__stars"
                      onMouseEnter={() => setFriendHover(currentVal)}
                      onMouseLeave={() => setFriendHover(null)}
                    ></FaRegSmile>
                  </label>
                );
              })}
            </div>

            <div>
              <h3>Punctuality</h3>
              {[...Array(5)].map((star, idx) => {
                const currentVal = idx + 1;
                return (
                  <label key={idx + 1}>
                    <input
                      className="star__radio__buttons"
                      type="radio"
                      name="rating"
                      value={currentVal}
                      onClick={() => setPunc(currentVal)}
                    ></input>
                    <FaRegClock
                      size={12}
                      color={currentVal <= (puncHover || punc) ? "#72d4ba" : "#adc0d8"}
                      className="user__stars"
                      onMouseEnter={() => setPuncHover(currentVal)}
                      onMouseLeave={() => setPuncHover(null)}
                    ></FaRegClock>
                  </label>
                );
              })}
            </div>

            <div>
              <h3>Trustworthy</h3>
              {[...Array(5)].map((star, idx) => {
                const currentVal = idx + 1;
                return (
                  <label key={idx + 1}>
                    <input
                      className="star__radio__buttons"
                      type="radio"
                      name="rating"
                      value={currentVal}
                      onClick={() => setTrust(currentVal)}
                    ></input>
                    <FaRegHandshake
                      size={12}
                      color={currentVal <= (trustHover || trust) ? "#72d4ba" : "#adc0d8"}
                      className="user__stars"
                      onMouseEnter={() => setTrustHover(currentVal)}
                      onMouseLeave={() => setTrustHover(null)}
                    ></FaRegHandshake>
                  </label>
                );
              })}
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}

export default UserReviewForm;
