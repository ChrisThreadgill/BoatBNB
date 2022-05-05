import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useHistory } from "react-router-dom";
import UserProfileCard from "./UserProfileCard";
import * as userProfileActions from "../../store/userProfile";

import * as userBookings from "../../store/bookings";
import "./UserProfileCSS/UserProfileCard.css";
import UserBookings from "../Bookings/UserBookings";
import BoatCard from "../Boats/BoatCard";
import UserReview from "../Reviews/UserReview";
// import UserReviewView from "../Reviews/UserReviewDisplay";
import UserRatingDisplay from "../Ratings/UserRatingDisplay";

function UserProfileView({ user }) {
  const history = useHistory();
  const { userId } = useParams();
  const dispatch = useDispatch();
  // console.log(user, "neeed thisssssssssssssssssss");

  //will refactor this to use store after dev debugging with card setup
  const userProfile = useSelector((state) => state.userProfile.user);
  const sessionUserProfile = useSelector((state) => state.session.user);
  useEffect(() => {
    dispatch(userProfileActions.getUserProfile(userId));
    return () => {
      dispatch(userProfileActions.profileCleanUp());
      dispatch(userProfileActions.profileCleanUp());
    };
  }, [dispatch]);
  // console.log(userProfile);

  const loggedInUser = useSelector((state) => state.session.user);
  // console.log(loggedInUser);
  const bookings = useSelector((state) => state.bookings);
  // console.log(userProfile, "current logged in user");

  return (
    <div>
      <div className="user__profile__details__container">
        {userProfile && (
          <div className="user__profile__card__container">
            <div>
              <UserProfileCard userProfile={userProfile}></UserProfileCard>
            </div>
            <div>
              <UserRatingDisplay userProfile={userProfile}></UserRatingDisplay>
            </div>
          </div>
        )}
        {loggedInUser && loggedInUser?.id !== userProfile?.id ? (
          <div>
            <UserReview userProfile={userProfile}></UserReview>
          </div>
        ) : null}
      </div>

      {loggedInUser?.id !== userProfile?.id && (
        <div className="user__profile__boats">
          {userProfile &&
            userProfile.Boats &&
            userProfile.Boats.map((boat) => {
              return (
                <div>
                  <BoatCard key={boat.id} boat={boat}></BoatCard>;
                  {loggedInUser && loggedInUser.id === boat.userId ? (
                    <button
                      onClick={() => {
                        history.push(`/boat/${boat.id}/edit`);
                      }}
                    >
                      Manage Boat
                    </button>
                  ) : (
                    <button
                      onClick={() => {
                        loggedInUser ? history.push(`/boats/${boat.id}`) : history.push("/sign-up");
                      }}
                    >
                      Book Now!
                    </button>
                  )}
                </div>
              );
            })}
        </div>
      )}
    </div>
  );
}

export default UserProfileView;
