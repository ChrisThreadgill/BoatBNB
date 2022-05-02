import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import * as userProfileActions from "../../store/userProfile";
import ProviderPanel from "../ProviderPages/ProviderPanel";
import ProviderView from "../ProviderPages/ProviderView";
import ProviderBoard from "../ProviderPages/ProviderBoard";
import UserProfileView from "./UserProfileView";

function LoggedInUserProfile() {
  const { userId } = useParams();
  const dispatch = useDispatch();
  const sessionUserProfile = useSelector((state) => state.userProfile.user);
  const loggedInUserId = useSelector((state) => state.session.user.id);
  // console.log(sessionUserProfile, "current logged in user");
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
      <h1>Welcome to your profile {name}!</h1>
      {roleId === 1 ? <ProviderBoard user={sessionUserProfile} /> : null}
    </div>
  );
}

export default LoggedInUserProfile;
