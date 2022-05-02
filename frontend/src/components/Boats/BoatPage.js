import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import BoatCard from "./BoatCard";
import * as boatsAction from "../../store/boats.js";
import { useParams } from "react-router-dom";
import AddBookingForm from "../Bookings/AddBookingForm";

function BoatPage() {
  const { boatId } = useParams();
  // console.log(boatId);

  const dispatch = useDispatch();
  const { boat } = useSelector((state) => state.boats);
  // console.log(boat);
  useEffect(() => {
    dispatch(boatsAction.getOneBoat(boatId));
  }, [dispatch]);

  return (
    <div>
      <h1>Single Boat Page</h1>
      <div>{boat && <BoatCard boat={boat}></BoatCard>}</div>
      <div>
        <AddBookingForm boatId={boatId}></AddBookingForm>
      </div>
    </div>
  );
}

export default BoatPage;
