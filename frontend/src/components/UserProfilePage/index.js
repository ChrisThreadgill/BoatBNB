import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import * as userProfileActions from "../../store/userProfile";
import LoggedInUserProfile from "./LoggedInUserProfile";
import UserProfileView from "./UserProfileView";

function UserProfilePage() {
  const { userId } = useParams();
  const dispatch = useDispatch();
  const sessionUserProfile = useSelector((state) => state.userProfile.user);
  const loggedInUserId = useSelector((state) => state.session.user.id);
  console.log(loggedInUserId, "current logged in user");
  useEffect(() => {
    dispatch(userProfileActions.getUserProfile(userId));
  }, [dispatch]);

  return <div>{loggedInUserId === parseInt(userId) ? <LoggedInUserProfile /> : <UserProfileView />}</div>;
}

export default UserProfilePage;
