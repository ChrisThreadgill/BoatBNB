import "./BoatManager.css";
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import * as boatsActions from "../../store/boats";
import BoatCard from "../Boats/BoatCard";
import * as sessionActions from "../../store/session";

function BoatManager() {
  const dispatch = useDispatch();
  const history = useHistory();
  const user = useSelector((state) => state.session.user);
  const boats = useSelector((state) => state.boats);
  //

  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    if (!user) history.push("/oops");
    else if (user.roleId > 1) history.push("/oops");
    else {
      dispatch(boatsActions.getProviderBoats(user.id)).then((boats) => {
        if (boats.boats.length >= 1) setIsLoaded(true);
        if (boats.boats.length < 1) {
          dispatch(sessionActions.updateRoleId(user.id)).then((user) => {
            history.push("/");
          });
        }
        // if (boats.boats.length < 1) // dispatch to change user role to 1 and push to home page
        // dispatch(getKey()).then(() => {
        //   setIsLoaded(true);
        // });
      });
    }

    // navigator.geolocation.getCurrentPosition(
    //   (location) => setLocation([location.coords.latitude, location.coords.longitude]),
    //   () => null
    // );
  }, [dispatch]);

  return (
    <>
      {isLoaded ? (
        <div>
          <h1>Boat manager</h1>
          {Object.values(boats).map((boat) => {
            return <BoatCard boat={boat}></BoatCard>;
          })}
        </div>
      ) : (
        <h1>... loading</h1>
      )}
    </>
  );
}

export default BoatManager;
