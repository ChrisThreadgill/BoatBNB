import "./HomePageInfo.css";
import { useEffect, useState } from "react";

function HomePageInfo() {
  const [infoOption, setInfoOption] = useState("renter");
  //

  return (
    <div className="home__page__info__container">
      <div className="home__page__info__selector">
        <h1>How it works I am a...</h1>
        <div className="home__page__info__options">
          <div
            className={infoOption === "renter" ? "home__page__info__selected" : "home__page__info__unselected"}
            onClick={() => setInfoOption("renter")}
          >
            Renter
          </div>
          <div
            className={infoOption === "owner" ? "home__page__info__selected" : "home__page__info__unselected"}
            onClick={() => setInfoOption("owner")}
          >
            Owner
          </div>
        </div>
      </div>
      {infoOption === "renter" ? (
        <div className="home__page__info">
          <div className="home__page__info__card">
            <div className="home__page__info__search"></div>
            <div className="home__page__info__title">Search</div>
            <span>Explore privately owned, worldwide fleet</span>
          </div>
          <div className="home__page__info__card">
            <div className="home__page__info__book"></div>
            <div className="home__page__info__title">Book</div>
            <span>Choose your date, reserve your boat</span>
          </div>
          <div className="home__page__info__card">
            <div className="home__page__info__cruise"></div>
            <div className="home__page__info__title">Cruise</div>
            <span>Grab your crew and have a great time out on the water</span>
          </div>
        </div>
      ) : (
        <div className="home__page__info">
          <div className="home__page__info__card">
            <div className="home__page__info__search"></div>
            <div className="home__page__info__title">List</div>
            <span>Set your availability, pricing and more</span>
          </div>
          <div className="home__page__info__card">
            <div className="home__page__info__book"></div>
            <div className="home__page__info__title">Manage</div>
            <span>Easily handle all of your bookings in our Owner's App</span>
          </div>
          <div className="home__page__info__card">
            <div className="home__page__info__cruise"></div>
            <div className="home__page__info__title">Collect</div>
            <span>Watch your bank account grow</span>
          </div>
        </div>
      )}
    </div>
  );
}

export default HomePageInfo;
