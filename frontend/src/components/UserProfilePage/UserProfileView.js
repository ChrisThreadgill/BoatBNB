import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import UserProfileCard from "./UserProfileCard";
import * as userProfileActions from "../../store/userProfile";
import * as userBookings from "../../store/bookings";
import "./UserProfileCSS/UserProfileCard.css";
import UserBookings from "../Bookings/UserBookings";

function UserProfileView({ user }) {
  const { userId } = useParams();
  const dispatch = useDispatch();

  //will refactor this to use store after dev debugging with card setup
  const sessionUserProfile = useSelector((state) => state.userProfile.user);
  const loggedInUserId = useSelector((state) => state.session.user.id);
  const bookings = useSelector((state) => state.bookings);
  console.log(bookings, "current logged in user");
  useEffect(() => {
    dispatch(userProfileActions.getUserProfile(userId));
  }, [dispatch]);
  useEffect(() => {
    dispatch(userBookings.getAllUserBookings(userId));
  }, [dispatch]);

  return (
    <div>
      <div className="user__profile__card__container">
        <UserProfileCard user={user}></UserProfileCard>
      </div>
      <div className="user__bookings__container">
        <UserBookings bookings={bookings}></UserBookings>
      </div>
    </div>
  );
}

export default UserProfileView;
