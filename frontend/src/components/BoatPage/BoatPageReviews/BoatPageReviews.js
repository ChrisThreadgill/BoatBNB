import { useEffect } from "react";
import NewBoatReviewModal from "../../../context/NewBoatReviewModal/NewBoatReviewModa";
import BoatRatingDisplay from "../../Ratings/BoatRatingDisplay";
import BoatPageRatingCard from "./BoatPageRatingCard";
import BoatPageReviewCard from "./BoatPageReviewCard";
import "./BoatPageReviews.css";

function BoatPageReviews({ boat }) {
  // console.log(boat, "============ boat");
  //
  // console.log(boat.boatReviewsNoRating, "--------------- boat reviews no rating");

  function compare(a, b) {
    if (a.createdAt < b.createdAt) {
      return 1;
    }
    if (a.createdAt > b.createdAt) {
      return -1;
    }
    // console.log(a, "--------", b, "----------");
    // a must be equal to b
    // return 0;
  }
  useEffect(() => {}, [boat]);

  const boatReviews = [...boat.BoatRatings, ...boat.boatReviewsNoRating];
  const boatPageReviewPreview = boatReviews.slice(0, 6);
  // console.log(boatReviews, "---------------------");

  return (
    <div className="boat__page__reviews">
      <div className="boat__page__reviews__rating__modal__container">
        <div>
          <h1>{`Ratings & reviews`}</h1>
          <BoatRatingDisplay boat={boat}></BoatRatingDisplay>
        </div>
        <NewBoatReviewModal reviews={boatReviews}></NewBoatReviewModal>
      </div>
      <div className="boat__page__review__container">
        {boatPageReviewPreview.map((rating) => {
          // console.log(rating);
          return rating.average ? (
            <BoatPageRatingCard rating={rating}></BoatPageRatingCard>
          ) : (
            <BoatPageReviewCard review={rating}></BoatPageReviewCard>
          );
        })}
        {/* {boat.boatReviewsNoRating.map((review) => {
          // console.log(review, review.User, "--------------- in the map");
          return <BoatPageReviewCard review={review} user={review.User}></BoatPageReviewCard>;
        })}
        {boat.BoatRatings.map((rating) => {
          return <BoatPageRatingCard rating={rating}></BoatPageRatingCard>;
        })} */}
      </div>
    </div>
  );
}

export default BoatPageReviews;
