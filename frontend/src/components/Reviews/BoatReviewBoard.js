import BoatRatingCard from "../Ratings/BoatRatingCard";
import BoatReviewCard from "./BoatReviewCard";
import "./BoatReviews/BoatReviewCard.css";

function BoatReviewBoard({ boatReviews, boatRatingsNR }) {
  return (
    <div>
      <h1>What Are Others Saying About this Boat?</h1>
      {Object.values(boatReviews).map((review) => {
        if (review.BoatRating) {
          return (
            <div key={review.id}>
              <BoatReviewCard key={review.id} review={review}></BoatReviewCard>
            </div>
          );
        }
      })}
      {Object.values(boatReviews).map((review) => {
        if (!review.BoatRating) {
          return (
            <div key={review.id}>
              <BoatReviewCard key={review.id} review={review}></BoatReviewCard>
            </div>
          );
        }
      })}
      {Object.values(boatRatingsNR).map((rating) => {
        return (
          <div key={rating.id}>
            <BoatRatingCard key={rating.id} rating={rating}></BoatRatingCard>
          </div>
        );
      })}
    </div>
  );
}

export default BoatReviewBoard;
