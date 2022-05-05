import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as boatsAction from "../../store/boats.js";
import { Redirect, useHistory } from "react-router-dom";
import BoatCard from "../Boats/BoatCard.js";
import "./HomePage.css";

function HomePage() {
  const dispatch = useDispatch();
  const history = useHistory();
  const sessionUser = useSelector((state) => state.session.user);
  const allBoats = useSelector((state) => state.boats);
  // console.log(sessionUser, "-----------------");
  useEffect(() => {
    dispatch(boatsAction.getAllBoats());
  }, [dispatch]);

  // if (!sessionUser) return <Redirect to="/login" />;
  return (
    <div className="home__page__view">
      <h1>ALL OF THE BOATS PLEASE?</h1>
      <div className="front__page__all__boats">
        {allBoats.boats?.map((boat) => {
          return (
            <div>
              <BoatCard boat={boat}></BoatCard>
              {sessionUser && boat && sessionUser.id === boat.userId ? (
                <button
                  onClick={() => {
                    history.push(`/boat/${boat.id}/edit`);
                  }}
                >
                  Manage Boat
                </button>
              ) : (
                <button
                  onClick={() => {
                    sessionUser ? history.push(`/boats/${boat.id}`) : history.push("/sign-up");
                  }}
                >
                  Book Now!
                </button>
              )}
            </div>
          );
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
