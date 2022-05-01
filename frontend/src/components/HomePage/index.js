import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as boatsAction from "../../store/boats.js";
import { Redirect } from "react-router-dom";
import BoatCard from "../Boats/BoatCard.js";
import "./HomePage.css";

function HomePage() {
  const dispatch = useDispatch();
  const sessionUser = useSelector((state) => state.session.user);
  const allBoats = useSelector((state) => state.boats);
  // console.log(allBoats.boats);
  useEffect(() => {
    dispatch(boatsAction.getAllBoats());
  }, [dispatch]);

  // if (!sessionUser) return <Redirect to="/login" />;
  return (
    <div className="home__page__view">
      <h1>ALL OF THE BOATS PLEASE?</h1>
      <div className="front__page__all__boats">
        {allBoats.boats?.map((boat) => {
          return <BoatCard boat={boat}></BoatCard>;
        })}
      </div>
      <ul>
        <li>Leo</li>
        <li>X</li>
        <li>Joon</li>
      </ul>
    </div>
  );
}

export default HomePage;
