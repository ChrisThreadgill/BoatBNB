import "./BoatRating/BoatRatingCard.css";
import {
  FaStar,
  FaUserClock,
  FaRegSmile,
  FaHandshakeAltSlash,
  FaRegHandshake,
  FaRegClock,
  FaAirbnb,
  FaRegCalendarAlt,
  FaRegCalendarCheck,
  FaRegCalendarMinus,
  FaWrench,
  FaSoap,
  FaCouch,
} from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import * as ratingActions from "../../store/boatRatings";

function BoatRatingCard({ rating }) {
  console.log(rating.id, "--------- rating");
  const dispatch = useDispatch();
  const userId = useSelector((state) => state.session.user?.id);

  return (
    <div className="boat__rating__card">
      <div className="boat__rating__card__user__info">
        <h3>{rating.User.firstName}</h3>
        <img src={`/api/images/${rating.User.profilePicture}`} className="profile__avatar" />
      </div>
      {/* <div>{rating.User.UserRatings[0].average}</div> */}

      <div className="boat__rating__card__NR">
        {rating && (
          <div>
            <div>
              <h1>Rating</h1>

              <div className="boat__rating__stars">
                {[...Array(Math.ceil(rating.average))].map((star, idx) => {
                  return <FaStar key={idx} color={"#ffc107"}></FaStar>;
                })}
              </div>
            </div>

            <div>
              <h2>Cleanliness</h2>

              <div className="boat__rating__stars">
                {[...Array(Math.ceil(rating.cleanliness))].map((star, idx) => {
                  return <FaSoap key={idx} color={"#ffc107"}></FaSoap>;
                })}
              </div>
            </div>

            <div>
              <h2>Comfort</h2>

              <div className="boat__rating__stars">
                {[...Array(Math.ceil(rating.comfort))].map((star, idx) => {
                  return <FaCouch key={idx} color={"#ffc107"}></FaCouch>;
                })}
              </div>
            </div>

            <div>
              <h2>Functionality</h2>

              <div className="boat__rating__stars">
                {[...Array(Math.ceil(rating.functional))].map((star, idx) => {
                  return <FaWrench key={idx} color={"#ffc107"}></FaWrench>;
                })}
              </div>
            </div>
          </div>
        )}
        {userId === rating.userId && (
          <div>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                console.log(rating.id);
                dispatch(ratingActions.deleteSingleBoatRating(rating.id));
              }}
            >
              <button type="submit">Delete Review</button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}

export default BoatRatingCard;
