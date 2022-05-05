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
  const providerBoats = useSelector((state) => state.boats.user);
  const [currentBoat, setCurrentBoat] = useState("");
  // console.log(providerBoats);
  // console.log(loggedInUserId, "current logged in user");
  useEffect(() => {
    dispatch(boatsAction.getProviderBoats(loggedInUserId));
    return () => {
      boatsAction.clean();
    };
  }, [dispatch]);
  // console.log(providerBoats);

  return (
    <div className="provider__boats__card">
      {providerBoats?.Boats.map((boat) => {
        return (
          <div>
            <BoatCard key={boat.id} boat={boat}></BoatCard>
            <button
              onClick={() => {
                boatsAction.getOneBoat(boat.id);
                history.push(`/boat/${boat.id}/edit`);
              }}
            >
              Manage Boat
            </button>
          </div>
        );
      })}
    </div>
  );
}

export default ProviderBoats;
