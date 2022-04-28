import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import * as userProfileActions from "../../store/userProfile";
import UserProfileView from "./UserProfileView";

function LoggedInUserProfile() {
  const { userId } = useParams();
  const dispatch = useDispatch();
  const sessionUserProfile = useSelector((state) => state.userProfile.user);
  const loggedInUserId = useSelector((state) => state.session.user.id);
  console.log(loggedInUserId, "current logged in user");
  useEffect(() => {
    dispatch(userProfileActions.getUserProfile(userId));
  }, [dispatch]);

  let name;
  let email;
  let roleId;
  if (sessionUserProfile) {
    name = sessionUserProfile.firstName + " " + sessionUserProfile.lastName;
    email = sessionUserProfile.email;
    roleId = sessionUserProfile.roleId;
  }
  return (
    <div>
      <h1>You are currently logged in {name}</h1>
      <UserProfileView />
    </div>
  );
}

export default LoggedInUserProfile;
