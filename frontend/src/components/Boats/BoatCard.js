import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as boatsAction from "../../store/boats.js";
import "./BoatCSS/BoatCard.css";
import { FaDharmachakra } from "react-icons/fa";

import { useHistory, useLocation } from "react-router-dom";
import BoatRatingDisplay from "../Ratings/BoatRatingDisplay.js";
import { FaStar } from "react-icons/fa/index.esm.js";

function BoatCard({ boat }) {
  const location = useLocation();
  const dispatch = useDispatch();
  console.log(boat);
  const history = useHistory();

  const [boatView, setBoatView] = useState(0);

  useEffect(() => {
    return () => {
      dispatch(boatsAction.clean());
    };
  }, [dispatch]);

  return (
    <div
      className="boat__card__container"
      onClick={() => {
        console.log("hello");
        history.push(`/boats/${boat.id}`);
      }}
    >
      <div className="boat__card__image__container">
        {boat?.Images?.length > 0
          ? boat.Images.map((image, idx) => {
              return (
                boatView === idx && (
                  <div key={image.id} className="boat__image__container">
                    <img key={image.id} value={boat.id} className="boat__img" src={`/api/images/${image.url}`} />
                  </div>
                )
              );
            })
          : null}
        <div className="image__radio__buttons">
          {boat?.Images?.length > 0
            ? boat.Images.map((image, idx) => (
                <input
                  type="radio"
                  value={idx}
                  key={image.id}
                  checked={boatView === idx}
                  onClick={(e) => {
                    e.stopPropagation();
                  }}
                  onChange={(e) => {
                    setBoatView(idx);
                  }}
                />
              ))
            : null}
        </div>
        {/* <BoatImageCard></BoatImageCard> */}
      </div>
      <div className="boat__card__details__container">
        <div className="boat__card__rating__container">
          <div className="boat__card__city__state">
            {boat?.city},{boat?.state}
          </div>
          <div>
            <BoatRatingDisplay boat={boat}></BoatRatingDisplay>

            {/* <FaStar size={15} color="#72d4ba"></FaStar> */}
          </div>
        </div>
        <div className="boat__card__year__make">
          {boat?.year} {boat?.model}
        </div>
        <div className="boat__price__container">
          {boat?.captain ? (
            <div className="boat__card__captain__container">
              {" "}
              <FaDharmachakra className="captain__wheel" size={25}></FaDharmachakra>
              <div>Captained</div>
            </div>
          ) : (
            <div></div>
          )}

          <div className="boat__price">
            <span>${boat?.price}</span>
            /day
          </div>
        </div>
      </div>
      {/* <div className="boat__card__details">
        <div className="boat__rating__display"></div>
        <div className="boat__location__div">
          <div className="boat__">
            <h1>{`Now Booking!`}</h1>
            <h2>{`At ${boat?.marina}`}</h2>
            <h4>{`In ${boat?.city}, ${boat?.state} at ${boat?.marina}`}</h4>
          </div>
          <div></div>
        </div>
        <div>
          <div>
            <h2>Boat Year Make and Model</h2>
            <h3>{`${boat?.year} ${boat?.model}`}</h3>
          </div>
        </div>
        <div>
          <h2>Features</h2>
          <h3>{boat?.accessories ? boat.accessories : "No Amenities"}</h3>
        </div>

        <div>
          <div>
            <h2>Rental Price</h2>
            <h4>{`$${boat?.price}/day`}</h4>
            {boat?.captain ? (
              <div>
                <h4>Captain Available</h4>
                <FaDharmachakra size={25}></FaDharmachakra>
              </div>
            ) : null}
          </div>
        </div>
        <div></div> */}
      {/* </div> */}
    </div>
  );
}

export default BoatCard;
