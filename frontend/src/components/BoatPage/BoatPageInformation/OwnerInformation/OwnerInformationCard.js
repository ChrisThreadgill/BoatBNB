import "./OwnerInformationCard.css";
import { useHistory } from "react-router-dom";
import UserRatingDisplay from "../../../Ratings/UserRatingDisplay";

function OwnerInformationCard({ boat }) {
  const history = useHistory();
  //

  return (
    <div className="boat__page__owner__information">
      <h3>Boat Owner</h3>

      <div className="boat__page__avatar__container">
        {boat.User.profilePicture ? (
          <img
            className="boat__information__profile__picture"
            onClick={() => history.push(`/test/${boat.User.id}`)}
            src={boat.User.profilePicture ? `${boat.User.profilePicture}` : null}
          ></img>
        ) : (
          <div
            className="boat__information__no__profile__picture"
            onClick={() => history.push(`/test/${boat.User.id}`)}
          >
            {boat.User.firstName.slice(0, 1).toUpperCase()}
            {boat.User.lastName.slice(0, 1).toUpperCase()}
          </div>
        )}

        <div className="boat__page__owner__rating__container">
          <div className="boat__page__boat__owner__name">{`${boat.User.firstName} ${boat.User.lastName}`} </div>
          {boat.User.UserRatings?.length && boat.User.UserRatings?.length >= 1 ? (
            <div className="boat__page__user__rating__display__container">
              <UserRatingDisplay user={boat.User}></UserRatingDisplay>
              <span>{`(${boat.User.UserRatings.length} ratings)`}</span>
            </div>
          ) : (
            <div className="no__user__ratings">No user ratings yet</div>
          )}
        </div>
      </div>
    </div>
  );
}

export default OwnerInformationCard;
