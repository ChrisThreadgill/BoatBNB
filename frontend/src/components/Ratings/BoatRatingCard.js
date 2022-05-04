import "./BoatRating/BoatRatingCard.css";

function BoatRatingCard({ rating }) {
  // console.log(review);
  return (
    <div className="boat__rating__card">
      <div>
        <div>userprofile pic</div>
        <div>user rating</div>
      </div>

      <div className="boat__rating__card__NR">
        {rating && (
          <div>
            <h1>Rating: {rating.average}</h1>
            <h2>Cleanliness: {rating.cleanliness}</h2>
            <h2>Comfort: {rating.comfort}</h2>
            <h2>Functionality: {rating.functional}</h2>
          </div>
        )}
      </div>
    </div>
  );
}

export default BoatRatingCard;
