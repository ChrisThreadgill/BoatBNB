import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as boatsAction from "../../store/boats.js";
import * as sessionActions from "../../store/session";
import { Modal } from "../../context/Modal";
import { Redirect, useHistory } from "react-router-dom";
import BoatCard from "../Boats/BoatCard.js";
import "./HomePage.css";
import HomePageSearch from "./HomePageSearch/HomePageSearch.js";
import HomePageInfo from "./HomePageInfo/HomePageInfo.js";
import HomePageDiscover from "./HomePageDiscover/HomePageDiscover.js";
import Footer from "../Footer/Footer.js";
import { GoogleMap, useJsApiLoader, useLoadScript } from "@react-google-maps/api";
import HomePageTech from "./HomePageTech/HomePageTech.js";
import HomePageWork from "./HomePageWork/HomePageWork.js";

function HomePage({ searchState, setSearchState }) {
  const dispatch = useDispatch();
  const history = useHistory();
  // const [isLoaded, setIsLoaded] = useState(false);
  const sessionUser = useSelector((state) => state.session.user);
  const allBoatsObj = useSelector((state) => state.boats);

  const allBoats = Object.values(allBoatsObj);

  useEffect(() => {
    // dispatch(boatsAction.getAllBoats());
    return () => {
      // dispatch(boatsAction.clean());
      // dispatch(sessionActions.restoreUser()).then(() => setIsLoaded(true));
    };
  }, [dispatch]);

  // if (!sessionUser) return <Redirect to="/login" />;
  return (
    <div className="home__page__view">
      <HomePageSearch searchState={searchState} setSearchState={setSearchState}></HomePageSearch>
      <HomePageInfo></HomePageInfo>
      <HomePageDiscover></HomePageDiscover>
      <HomePageWork></HomePageWork>
      <HomePageTech></HomePageTech>
      <Footer></Footer>
      {/* <div className="homepage__test">
        <div className="test__two__works">
          <div className="home__page__header">
            <h1>Welcome to BoatBNB</h1>
            <h2>Look below for a variety of boat listings around The Nation!</h2>
          </div>
          <div className="test__two"></div>
          <div className="home__page__break"></div>
        </div>
        <div className="front__page__all__boats">
          {allBoats.length > 0 &&
            allBoats.map((boat) => {
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
      </div> */}
    </div>
  );
}

export default HomePage;
