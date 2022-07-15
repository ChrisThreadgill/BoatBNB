import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import * as userProfileActions from "../../store/userProfile";
import LoggedInUser from "./LoggedInUser";
import UserProfileView from "./UserProfileView";

function UserProfilePage() {
  const { userId } = useParams();
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  const sessionUserProfile = useSelector((state) => state.userProfile.user);
  const loggedInUserId = useSelector((state) => state.session.user?.id);

  useEffect(() => {
    dispatch(userProfileActions.getUserProfile(userId)).then(() => setIsLoaded(true));
  }, [dispatch]);

  return <>{isLoaded ? <UserProfileView /> : <h1>... Loading</h1>}</>;
  // return <div>{loggedInUserId === parseInt(userId) ? <LoggedInUser /> : <UserProfileView />}</div>;
}

export default UserProfilePage;
