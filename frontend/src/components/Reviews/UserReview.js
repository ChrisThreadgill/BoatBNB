import { useState } from "react";
import UserRating from "../Ratings/UserRating";

import { FaStar } from "react-icons/fa";
// import "./Rating.css";

function UserReview() {
  const [rating, setRating] = useState(null);
  const [hover, setHover] = useState(null);

  const [friend, setFriend] = useState(null);
  const [friendHover, setFriendHover] = useState(null);

  const [punc, setPunc] = useState(null);
  const [puncHover, setPuncHover] = useState(null);

  const [trust, setTrust] = useState(null);
  const [trustHover, setTrustHover] = useState(null);

  return (
    <div>
      <UserRating
        rating={rating}
        setRating={setRating}
        hover={hover}
        setHover={setHover}
        friend={friend}
        setFriend={setFriend}
        friendHover={friendHover}
        setFriendHover={setFriendHover}
        punc={punc}
        setPunc={setPunc}
        puncHover={puncHover}
        setPuncHover={setPuncHover}
        trust={trust}
        setTrust={setTrust}
        trustHover={trustHover}
        setTrustHover={setTrustHover}
      ></UserRating>
    </div>
  );
}

export default UserReview;
