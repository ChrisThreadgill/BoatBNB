import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useHistory } from "react-router-dom";
import * as userRatingsActions from "../../store/userRatings";
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
} from "react-icons/fa";

function UserRatingDisplay({ userProfile }) {
  const { UserRatings } = userProfile;
  const sessionUser = useSelector((state) => state.session.user);
  console.log(sessionUser);

  const averageUserRatings = UserRatings.reduce(
    (prev, curr, idx) => {
      prev.average = prev.average + curr.average;
      prev.friendliness = prev.friendliness + curr.friendliness;
      prev.punctuality = prev.punctuality + curr.punctuality;
      prev.trustworthy = prev.trustworthy + curr.trustworthy;
      prev.count = ++idx;
      if (prev.count === UserRatings.length) {
        prev.average = Math.ceil(prev.average / prev.count);
        prev.friendliness = Math.ceil(prev.friendliness / prev.count);
        prev.punctuality = Math.ceil(prev.punctuality / prev.count);
        prev.trustworthy = Math.ceil(prev.trustworthy / prev.count);
      }
      return prev;
    },
    { average: null, friendliness: null, punctuality: null, trustworthy: null, count: null }
  );

  return (
    <div>
      {sessionUser?.id === userProfile.id ? (
        <h1>What others are saying about you!</h1>
      ) : (
        <h1>What {userProfile.firstName} does well</h1>
      )}
      <div>
        <h2>Overall</h2>
        <div>
          {[...Array(averageUserRatings.average)].map((star, idx) => {
            return <FaStar key={idx} color={"#ffc107"}></FaStar>;
          })}
        </div>
      </div>
      <div>
        <h2>Friendliness</h2>
        <div>
          {[...Array(averageUserRatings.friendliness)].map((smile, idx) => {
            return <FaRegSmile key={idx} color={"#ffc107"}></FaRegSmile>;
          })}
        </div>
      </div>
      <div>
        <h2>Punctuality</h2>
        <div>
          {[...Array(averageUserRatings.punctuality)].map((clock, idx) => {
            return <FaRegClock key={idx} color={"#ffc107"}></FaRegClock>;
          })}
        </div>
      </div>
      <div>
        <h2>Trustworthiness</h2>
        <div>
          {[...Array(averageUserRatings.trustworthy)].map((handshake, idx) => {
            return <FaRegHandshake key={idx} color={"#ffc107"}></FaRegHandshake>;
          })}
        </div>
      </div>
    </div>
  );
}

export default UserRatingDisplay;