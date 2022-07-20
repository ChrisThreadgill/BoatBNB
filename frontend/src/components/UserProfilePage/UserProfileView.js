import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useHistory } from "react-router-dom";
import UserProfileCard from "./UserProfileCard";
import * as userProfileActions from "../../store/userProfile";
import Footer from "../Footer/Footer";

import * as bookingsAction from "../../store/bookings";
import "./UserProfileCSS/UserProfileCard.css";
import UserBookings from "../Bookings/UserBookings";
import BoatCard from "../Boats/BoatCard";
import UserReview from "../Reviews/UserReview";

import UserRatingDisplay from "../Ratings/UserRatingDisplay";
import "./UserProfileCSS/UserProfileView.css";
import UserReviews from "../UserReviews/UserReviews";

function UserProfileView() {
  const history = useHistory();
  const { userId } = useParams();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.userProfile.user);
  const [isLoaded, setIsLoaded] = useState(false);
  const [userRatings, setUserRatings] = useState(user?.UserRatings);
  const [userReviews, setUserReviews] = useState(user?.UserReviews);
  // const [set]

  // console.log(User?.UserRatings, User?.UserReviews);

  const bookingsForLoggedInUser = useSelector((state) => state);
  const bookingsArr = Object.values(bookingsForLoggedInUser);

  useEffect(() => {
    dispatch(userProfileActions.getUserProfile(userId)).then(() => {
      setIsLoaded(true);
    });

    return () => {
      // dispatch(bookingsAction.cleanUp());
    };
  }, [dispatch]);

  const loggedInUser = useSelector((state) => state.session.user);

  return (
    <div className="user__profile__view__container">
      {isLoaded ? (
        <div>
          <div className="user__profile__details">
            <img src={user.profilePicture ? `${user.profilePicture}` : null} className="profile__page__picture" />
            <div className="user__rating__average__container">
              <span>{user?.firstName}</span>
              <UserRatingDisplay user={user}></UserRatingDisplay>
            </div>
          </div>
          <div>
            {user && user.Boats.length >= 1 && (
              <div className="user__profile__boats__header">{user.firstName}'s boats</div>
            )}
            {/* <div className="user__profile__boats__header">{User?.firstName}'s boats</div> */}
            {user && user.Boats && (
              <div className="user__profile__boat__card__container">
                {user.Boats.map((boat) => {
                  return (
                    <div key={boat.id}>
                      <BoatCard key={boat.id} boat={boat}></BoatCard>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
          <UserReviews user={user}></UserReviews>
        </div>
      ) : (
        <h1>... Loading</h1>
      )}
      <Footer></Footer>
      {/* <div className="user__profile__details">
        <img src={profilePic ? `/api/images/${profilePic}` : null} className="profile__page__picture" />
        <div className="user__rating__average__container">
          <span>{User?.firstName}</span>
          <UserRatingDisplay User={User}></UserRatingDisplay>
        </div>
      </div>
      <div> */}
      {/* {User && User.Boats.length >= 1 && (
          <div className="user__profile__boats__header">{User?.firstName}'s boats</div>
        )} */}
      {/* <div className="user__profile__boats__header">{User?.firstName}'s boats</div> */}
      {/* {User && User.Boats && (
          <div className="user__profile__boat__card__container">
            {User.Boats.map((boat) => {
              return (
                <div>
                  <BoatCard key={boat.id} boat={boat}></BoatCard>
                </div>
              );
            })}
          </div>
        )} */}
      {/* </div> */}
      {/* <UserReviews user={User}></UserReviews> */}
      {/* <div className="user__profile__reviews__container">
        <div className="user__profile__reviews__header">
          Reviews of {User?.firstName} {`(${userRatings.length + userReviews.length}) `}
        </div>
        <div className="profile__reviews__container"></div>
      </div> */}
    </div>
  );
}

export default UserProfileView;
