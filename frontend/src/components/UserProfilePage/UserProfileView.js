import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import * as userProfileActions from "../../store/userProfile";

function UserProfileView() {
  const { userId } = useParams();
  const dispatch = useDispatch();
  const sessionUserProfile = useSelector((state) => state.userProfile.user);
  const loggedInUserId = useSelector((state) => state.session.user.id);
  // console.log(loggedInUserId, "current logged in user");
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
      <h1>{name}</h1>
      <h2>{email}</h2>
      <h2>{roleId}</h2>
    </div>
  );
}

export default UserProfileView;
