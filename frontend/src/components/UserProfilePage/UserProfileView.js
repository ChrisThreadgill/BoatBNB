import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useHistory } from "react-router-dom";
import UserProfileCard from "./UserProfileCard";
import * as userProfileActions from "../../store/userProfile";

import * as bookingsAction from "../../store/bookings";
import "./UserProfileCSS/UserProfileCard.css";
import UserBookings from "../Bookings/UserBookings";
import BoatCard from "../Boats/BoatCard";
import UserReview from "../Reviews/UserReview";

import UserRatingDisplay from "../Ratings/UserRatingDisplay";
import "./UserProfileCSS/UserProfileView.css";

function UserProfileView({ user }) {
  const history = useHistory();
  const { userId } = useParams();
  const dispatch = useDispatch();

  const userProfile = useSelector((state) => state.userProfile.user);

  const bookingsForLoggedInUser = useSelector((state) => state);
  const bookingsArr = Object.values(bookingsForLoggedInUser);

  useEffect(() => {
    dispatch(userProfileActions.getUserProfile(userId));
    dispatch(bookingsAction.getAllUserBookings(userId));
    return () => {
      // dispatch(bookingsAction.cleanUp());
    };
  }, [dispatch]);

  const loggedInUser = useSelector((state) => state.session.user);

  const bookings = useSelector((state) => state.bookings);

  return (
    <div className="user__profile__view__container">
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
      </div>
      {loggedInUser && loggedInUser?.id === userProfile?.id ? (
        <div>
          <UserBookings bookings={bookings}></UserBookings>
        </div>
      ) : null}

      {loggedInUser?.id !== userProfile?.id && userProfile?.Boats.length > 0 && (
        <div className="testing">
          <h1>{userProfile?.firstName}'s Rentals</h1>
          <div className="user__profile__boats__container">
            <div className="user__profile__boats">
              {userProfile &&
                userProfile.Boats &&
                userProfile.Boats.map((boat) => {
                  return (
                    <div className="user__profile__boat__card__container">
                      <BoatCard key={boat.id} boat={boat}></BoatCard>
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
          </div>
        </div>
      )}
    </div>
  );
}

export default UserProfileView;
