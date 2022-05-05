import ProviderBoard from "./ProviderBoard";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import UserProfileCard from "../UserProfilePage/UserProfileCard";
import { useParams, useHistory } from "react-router-dom";
import "./ProviderPagesCSS/ProviderView.css";
import UserRatingDisplay from "../Ratings/UserRatingDisplay";
import * as userProfileActions from "../../store/userProfile";

//TODO DO NOT USE

//REPEAT DO NOT USER

function ProviderProfileView({ userId }) {
  const dispatch = useDispatch();
  const userProfile = useSelector((state) => state.userProfile.user);

  useEffect(() => {
    dispatch(userProfileActions.getUserProfile(userId));
    return () => {
      dispatch(userProfileActions.profileCleanUp());
      dispatch(userProfileActions.profileCleanUp());
    };
  }, [dispatch]);

  return (
    <div className="provider__profile__view">
      {userProfile && (
        <div className="user__profile__card__container">
          <h1>hello</h1>
          <div>
            <UserProfileCard userProfile={userProfile}></UserProfileCard>
          </div>
          <div>
            <UserRatingDisplay userProfile={userProfile}></UserRatingDisplay>
          </div>
        </div>
      )}
    </div>
  );
}

export default ProviderProfileView;
