import "./DeleteBoatForm.css";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import * as boatsActions from "../../../store/boats";

function DeleteBoatForm({ boat, setShowModal }) {
  const dispatch = useDispatch();
  const history = useHistory();
  //
  const deleteBoat = async (boatId) => {
    dispatch(boatsActions.deleteBoatListing(boatId));

    // history.push(`/users/${userId}/profile`);
  };
  return (
    <div className="delete__boat__form">
      <div className="delete__boat__header__container">
        <h3 className="delete__boat__header">Delete boat</h3>
        <div className="delete__boat__close" onClick={() => setShowModal(false)}>
          X
        </div>
      </div>
      <div className="delete__boat__question">
        Are you sure you want to delete your boat? You cannot undo this action.
      </div>
      <div
        className="delete__boat__confirm"
        onClick={(e) => {
          e.preventDefault();
          deleteBoat(boat.id);

          setShowModal(false);
          // window.location.reload();
        }}
      >
        YES, I WANT TO DELETE MY BOAT
      </div>
    </div>
  );
}

export default DeleteBoatForm;
