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

  const boatReviews = [...boat.BoatRatings, ...boat.boatReviewsNoRating];

  console.log(boatReviews, "---------------------");

  return (
    <div className="boat__page__reviews">
      <h1>reviews header</h1>
      <NewBoatReviewModal reviews={boatReviews}></NewBoatReviewModal>
      <BoatRatingDisplay boat={boat}></BoatRatingDisplay>
      <div className="boat__page__review__container">
        {boat.boatReviewsNoRating.map((review) => {
          // console.log(review, review.User, "--------------- in the map");
          return <BoatPageReviewCard review={review} user={review.User}></BoatPageReviewCard>;
        })}
        {boat.BoatRatings.map((rating) => {
          return <BoatPageRatingCard rating={rating}></BoatPageRatingCard>;
        })}
      </div>
    </div>
  );
}

export default BoatPageReviews;
