import BoatPageRatingCard from "../../BoatPage/BoatPageReviews/BoatPageRatingCard";
import BoatPageReviewCard from "../../BoatPage/BoatPageReviews/BoatPageReviewCard";
import UserRatingDisplay from "../../Ratings/UserRatingDisplay";

function NewBoatReviewCard({ review }) {
  //
  // console.log(review, "---------------------");

  return (
    <div className="modal__review__card">
      {review.average ? (
        <BoatPageRatingCard rating={review}></BoatPageRatingCard>
      ) : (
        <BoatPageReviewCard review={review}></BoatPageReviewCard>
      )}
      {/* <BoatPageRatingCard rating={}></BoatPageRatingCard> */}
    </div>
  );
}

export default NewBoatReviewCard;
