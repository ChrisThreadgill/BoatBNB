import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as boatsAction from "../../store/boats.js";
import * as sessionActions from "../../store/session";
import { Redirect, useHistory } from "react-router-dom";
import BoatCard from "../Boats/BoatCard.js";
import "./HomePage.css";

function HomePage() {
  const dispatch = useDispatch();
  const history = useHistory();
  const [isLoaded, setIsLoaded] = useState(false);
  const sessionUser = useSelector((state) => state.session.user);
  const allBoatsObj = useSelector((state) => state.boats);
  const allBoats = Object.values(allBoatsObj);
  console.log(allBoats, "-----------------");
  useEffect(() => {
    dispatch(boatsAction.getAllBoats());
    return () => {
      // dispatch(boatsAction.clean());
      dispatch(sessionActions.restoreUser()).then(() => setIsLoaded(true));
    };
  }, [dispatch]);

  // if (!sessionUser) return <Redirect to="/login" />;
  return (
    <div className="home__page__view">
      <h1>ALL OF THE BOATS PLEASE?</h1>
      <div className="front__page__all__boats">
        {allBoats.length > 0 &&
          allBoats.map((boat) => {
            console.log(boat);
            return (
              <div key={boat.id} className="home__page__boat__card">
                <BoatCard key={boat.id} boat={boat}></BoatCard>
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
    </div>
  );
}

export default HomePage;
