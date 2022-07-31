import "./UserReviews.css";
import { useEffect, useState } from "react";
import UserReviewCard from "./UserReviewCard/UserReviewCard";
import UserReviewCardRatingDisplay from "./UserReviewCardRatingDisplay/UserReviewCardRatingDisplay";
import UserRatingCard from "../UserRatings/UserRatingCard";
import NewUserReviewModal from "../../context/NewUserReviewModal/NewUserReviewModal";
import { useDispatch } from "react-redux";

function UserReviews({ user }) {
  const dispatch = useDispatch();
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

  // console.log(userRatings, userReviews, "---------------");
  useEffect(() => {
    setUserReviews(user.UserReviews);
    setUserRatings(user.UserRatings);
    if (userRatings.length >= 1 || userReviews.length >= 1) {
      setSpreadReviewsRatings([...userRatings, ...userReviews].sort(compare));
    }
  }, [dispatch]);
  // console.log(spreadReviewsRatings);

  return (
    <div className="user__profile__reviews__container">
      <div className="user__profile__reviews__header">
        {spreadReviewsRatings.length < 1
          ? `No reviews of ${user.firstName.slice(0, 1).toUpperCase()}${user.firstName.slice(1)} yet`
          : `Reviews of ${user.firstName.slice(0, 1).toUpperCase()}${user.firstName.slice(1)} (${
              spreadReviewsRatings.length
            }) `}

        <NewUserReviewModal></NewUserReviewModal>
      </div>
      <div className="profile__reviews__container">
        {" "}
        {spreadReviewsRatings.map((rating, idx) => {
          // console.log(review);
          return (
            <div key={idx} className="user__review__container">
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
