import "./BoatRating/BoatRatingCard.css";

function BoatRatingCard({ rating }) {
  // console.log(rating, "--------- rating");
  return (
    <div className="boat__rating__card">
      <div>
        <div>
          <img src={`/api/images/${rating.User.profilePicture}`} className="profile__avatar" />
        </div>
        <div>{rating.User.UserRatings[0].average}</div>
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
