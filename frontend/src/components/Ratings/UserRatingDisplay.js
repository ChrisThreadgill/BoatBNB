import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import "./Rating.css";

import {
  FaStar,
  // FaUserClock,
  FaRegSmile,
  // FaHandshakeAltSlash,
  FaRegHandshake,
  FaRegClock,
  // FaAirbnb,
  // FaRegCalendarAlt,
  // FaRegCalendarCheck,
  // FaRegCalendarMinus,
  // FaWrench,
} from "react-icons/fa";

function UserRatingDisplay({ user }) {
  const UserRatings = user.UserRatings;

  // const sessionUser = useSelector((state) => state.session.user);
  const [averageUserRatings, setAverageUserRatings] = useState([]);
  // let averageUserRatings;

  useEffect(() => {
    if (UserRatings) {
      setAverageUserRatings(
        UserRatings.reduce(
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
        )
      );
    }
  }, [UserRatings]);

  return (
    <div>
      {UserRatings?.length ? (
        <div>
          <div>
            {[...Array(averageUserRatings.average)].map((star, idx) => {
              return <FaStar key={idx} color={"#72d4ba"} size={22}></FaStar>;
            })}
          </div>
        </div>
      ) : (
        <div className="empty__star__container">
          {[...Array(5)].map((star, idx) => {
            return <FaStar className="empty__star" size={22} key={idx}></FaStar>;
          })}
          <div>No reviews yet</div>
        </div>
      )}
    </div>
  );
}

export default UserRatingDisplay;
