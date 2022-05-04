function BoatReviewCard({ review }) {
  // console.log(review);
  return (
    <div className="boat__review__card">
      <div>
        <div>userprofile pic</div>
        <div>user rating</div>
      </div>

      <div>
        <h1>review Content</h1>
        <h2>{review.review}</h2>
      </div>
      <div className="boat__review__card__ratings">
        {review.BoatRating && (
          <div>
            <h1>Rating: {review.BoatRating.average}</h1>
            <h2>Cleanliness: {review.BoatRating.cleanliness}</h2>
            <h2>Comfort: {review.BoatRating.comfort}</h2>
            <h2>Functionality: {review.BoatRating.functional}</h2>
          </div>
        )}
      </div>
    </div>
  );
}

export default BoatReviewCard;
