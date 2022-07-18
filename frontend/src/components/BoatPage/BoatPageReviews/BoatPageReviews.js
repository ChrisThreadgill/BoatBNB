import BoatRatingDisplay from "../../Ratings/BoatRatingDisplay";
import BoatPageRatingCard from "./BoatPageRatingCard";
import BoatPageReviewCard from "./BoatPageReviewCard";
import "./BoatPageReviews.css";

function BoatPageReviews({ boat }) {
  console.log(boat, "============ boat");
  //
  console.log(boat.boatReviewsNoRating, "--------------- boat reviews no rating");

  return (
    <div className="boat__page__reviews">
      <h1>reviews header</h1>
      <BoatRatingDisplay boat={boat}></BoatRatingDisplay>
      <div className="boat__page__review__container">
        {boat.boatReviewsNoRating.map((review) => {
          console.log(review, review.User, "--------------- in the map");
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
