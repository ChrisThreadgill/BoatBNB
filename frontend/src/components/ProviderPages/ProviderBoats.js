import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as boatsAction from "../../store/boats.js";
import BoatCard from "../Boats/BoatCard.js";
import { useParams, useHistory } from "react-router-dom";
import "./ProviderPagesCSS/ProviderBoats.css";

function ProviderBoats({ view, setView }) {
  const dispatch = useDispatch();
  const history = useHistory();
  const loggedInUserId = useSelector((state) => state.session.user.id);
  const sessionUserProfile = useSelector((state) => state.userProfile.user);
  const providerBoats = useSelector((state) => state.boats);
  const boatCheck = Object.values(providerBoats);

  const [currentBoat, setCurrentBoat] = useState("");

  useEffect(() => {
    dispatch(boatsAction.getProviderBoats(loggedInUserId));
    return () => {
      boatsAction.clean();
    };
  }, [dispatch]);

  return (
    <div className="provider__boats__container">
      {Object.values(providerBoats).length > 0 &&
        Object.values(providerBoats).map((boat) => {
          return (
            <div key={boat.id} className="provider__boat__card__container">
              <BoatCard key={boat.id} boat={boat}></BoatCard>
              <div className="provider__boat__button">
                <button
                  onClick={() => {
                    boatsAction.getOneBoat(boat.id);
                    history.push(`/boat/${boat.id}/edit`);
                  }}
                >
                  Manage Boat
                </button>
              </div>
            </div>
          );
        })}
    </div>
  );
}

export default ProviderBoats;
