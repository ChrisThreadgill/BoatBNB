import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as boatsAction from "../../store/boats.js";
import { useParams, useHistory, Redirect } from "react-router-dom";
import BoatCard from "../Boats/BoatCard";
import AddBoatImage from "../forms/AddBoatImage";
import AddBoat from "../Boats/AddBoat.js";

function BoatEdit() {
  const history = useHistory();
  const { boatId } = useParams();
  console.log(typeof parseInt(boatId));
  const dispatch = useDispatch();

  const sessionUser = useSelector((state) => state.session.user);
  const boat = useSelector((state) => state.boats.boat);

  console.log(sessionUser);

  useEffect(() => {
    dispatch(boatsAction.getOneBoat(boatId));
  }, [dispatch]);

  return (
    <div>
      {sessionUser && boat && sessionUser.id === boat.userId && (
        <div>
          <AddBoatImage></AddBoatImage>
          <BoatCard boat={boat}></BoatCard>
          <AddBoat boat={boat}></AddBoat>
        </div>
      )}
      {sessionUser && boat && sessionUser.id !== boat.userId && history.push("/")}
    </div>
  );
}

export default BoatEdit;
