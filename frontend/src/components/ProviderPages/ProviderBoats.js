import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as boatsAction from "../../store/boats.js";
import BoatCard from "../Boats/BoatCard.js";
import { useParams } from "react-router-dom";
import "./ProviderBoats.css";

function ProviderBoats() {
  const dispatch = useDispatch();
  const loggedInUserId = useSelector((state) => state.session.user.id);
  const sessionUserProfile = useSelector((state) => state.userProfile.user);
  const providerBoats = useSelector((state) => state.boats.user);
  const [currentBoat, setCurrentBoat] = useState("");
  // console.log(providerBoats);
  // console.log(loggedInUserId, "current logged in user");
  useEffect(() => {
    dispatch(boatsAction.getProviderBoats(loggedInUserId));
  }, [dispatch]);
  // console.log(providerBoats);

  return (
    <div className="provider__boats__card">
      {providerBoats?.Boats.map((boat) => {
        return (
          <div>
            <BoatCard key={boat.id} boat={boat}></BoatCard>
          </div>
        );
      })}
    </div>
  );
}

export default ProviderBoats;
