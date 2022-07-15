import "./UserReviews.css";
import { useEffect, useState } from "react";
import UserReviewCard from "./UserReviewCard/UserReviewCard";
import UserReviewCardRatingDisplay from "./UserReviewCardRatingDisplay/UserReviewCardRatingDisplay";
import UserRatingCard from "../UserRatings/UserRatingCard";

function UserReviews({ user }) {
  //
  const [userRatings, setUserRatings] = useState(user.UserRatings);
  const [userReviews, setUserReviews] = useState(user.UserReviews);
  const [spreadReviewsRatings, setSpreadReviewsRatings] = useState([]);
  // console.log(userRatings, userReviews, spreadReviewsRatings);
  function compare(a, b) {
    if (a.createdAt < b.createdAt) {
      return 1;
    }
    if (a.createdAt > b.createdAt) {
      return -1;
    }
    // console.log(a, "--------", b, "----------");
    // a must be equal to b
    // return 0;
  }

  useEffect(() => {
    setUserReviews(user.UserReviews);
    setUserRatings(
      user.UserRatings.filter((rating) => {
        if (!rating.userReviewId) {
          return rating;
        }
      })
    );
    if (userRatings.length >= 1 && userReviews.length >= 1) {
      setSpreadReviewsRatings([...userRatings, ...userReviews].sort(compare));
    }
  }, [user]);
  console.log(spreadReviewsRatings);

  return (
    <div className="user__profile__reviews__container">
      <div className="user__profile__reviews__header">
        Reviews of {user.firstName} {`(${spreadReviewsRatings.length}) `}
      </div>
      <div className="profile__reviews__container">
        {" "}
        {spreadReviewsRatings.map((rating, idx) => {
          // console.log(review);
          return (
            <div key={idx}>
              {rating.average ? (
                <UserRatingCard rating={rating}></UserRatingCard>
              ) : (
                <UserReviewCard review={rating}></UserReviewCard>
              )}
              {/* <UserRatingCard rating={rating}></UserRatingCard> */}

              {/* <UserReviewCard review={review}></UserReviewCard> */}

              {/* <UserReviewCard review={review}></UserReviewCard> */}
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default UserReviews;
