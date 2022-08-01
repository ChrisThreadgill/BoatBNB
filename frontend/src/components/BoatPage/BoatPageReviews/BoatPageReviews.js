import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import NewBoatReviewModal from "../../../context/NewBoatReviewModal/NewBoatReviewModa";
import BoatRatingDisplay from "../../Ratings/BoatRatingDisplay";
import BoatPageRatingCard from "./BoatPageRatingCard";
import BoatPageReviewCard from "./BoatPageReviewCard";
import "./BoatPageReviews.css";

function BoatPageReviews({ boat }) {
  // console.log(boat, "============ boat");

  const [boatReviews, setBoatReviews] = useState([...boat.BoatRatings, ...boat.boatReviewsNoRating]);
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
  useEffect(() => {
    setBoatReviews([...boat.BoatRatings, ...boat.boatReviewsNoRating].sort(compare));
  }, [boat]);

  // const boatReviews = [...boat.BoatRatings, ...boat.boatReviewsNoRating];
  // console.log(boatReviews);
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
        {boatPageReviewPreview.map((rating, idx) => {
          // console.log(rating);
          return rating.average ? (
            <BoatPageRatingCard key={idx} rating={rating}></BoatPageRatingCard>
          ) : (
            <BoatPageReviewCard key={idx} review={rating}></BoatPageReviewCard>
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
