import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import * as userProfileActions from "../../store/userProfile";
import ProviderPanel from "../ProviderPages/ProviderPanel";

import ProviderBoard from "../ProviderPages/ProviderBoard";
import UserProfileView from "./UserProfileView";

function LoggedInUser() {
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
    name = sessionUserProfile.firstName;
    email = sessionUserProfile.email;
    roleId = sessionUserProfile.roleId;
  }
  return (
    <div>
      {roleId && roleId === 1 && <ProviderBoard user={sessionUserProfile} />}
      {roleId && roleId === 2 && <UserProfileView user={sessionUserProfile} />}
    </div>
  );
}

export default LoggedInUser;
