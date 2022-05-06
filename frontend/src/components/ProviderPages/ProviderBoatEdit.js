import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as boatsAction from "../../store/boats.js";
import * as boatReviewsActions from "../../store/boatReviews";
import * as sessionActions from "../../store/session";
import { useParams, useHistory, Redirect } from "react-router-dom";
import BoatCard from "../Boats/BoatCard";
import AddBoatImage from "../forms/AddBoatImage";
import AddBoat from "../Boats/AddBoat.js";
import BoatBookings from "../Boats/BoatBookings.js";
import EditBoat from "../Boats/EditBoat.js";
import "./ProviderPagesCSS/ProviderBoatEdit.css";
import BoatReviewBoard from "../Reviews/BoatReviewBoard.js";

function ProviderBoatEdit() {
  const history = useHistory();
  const { boatId } = useParams();
  // console.log(typeof parseInt(boatId));
  const dispatch = useDispatch();

  const sessionUser = useSelector((state) => state.session.user);
  const boat = useSelector((state) => state.boats);
  const boatReviews = useSelector((state) => state.boats.boat);
  const test = parseInt(boatId);
  console.log(boat);
  // console.log(boat.test);

  useEffect(() => {
    dispatch(boatsAction.getOneBoat(boatId));
    dispatch(boatReviewsActions.getAllReviewsForSingleBoat(boatId));
    return () => {
      dispatch(boatsAction.clean());
      dispatch(sessionActions.restoreUser()).then(() => setIsLoaded(true));
    };
  }, [dispatch]);

  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    dispatch(sessionActions.restoreUser()).then(() => setIsLoaded(true));
    return () => {
      dispatch(boatsAction.clean());
      dispatch(sessionActions.restoreUser()).then(() => setIsLoaded(true));
    };
  }, [dispatch]);

  return (
    <>
      {isLoaded && (
        <div>
          {sessionUser && boat && (
            <div>
              <div className="provider__boat__edit__container">
                <h1>hello</h1>
                <BoatCard boat={boat}></BoatCard>
                <EditBoat user={sessionUser} boat={boat} />
              </div>
              <div>
                <BoatBookings boat={boat}></BoatBookings>
                {/* <BoatReviewBoard></BoatReviewBoard> */}
              </div>
            </div>
          )}
          {/* {sessionUser && boat && sessionUser.id !== boat.userId && history.push("/")} */}
        </div>
      )}
    </>
  );
}

export default ProviderBoatEdit;
