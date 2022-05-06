import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as boatsAction from "../../store/boats.js";
import "./BoatCSS/BoatCard.css";

import { useHistory, useLocation } from "react-router-dom";

function BoatCard({ boat }) {
  const location = useLocation();
  const dispatch = useDispatch();
  // console.log(location, "11111111111111111111111");
  console.log(boat, "helooooooooooooooooooooo");
  const history = useHistory();
  // console.log(boat, "in the boat card");
  const [boatView, setBoatView] = useState(0);

  useEffect(() => {
    return () => {
      dispatch(boatsAction.clean());
    };
  }, [dispatch]);

  return (
    <div className="boat__card__container">
      <div className="boat__card">
        {boat?.Images?.length > 0
          ? boat.Images.map((image, idx) => {
              return (
                boatView === idx && (
                  <img key={image.id} value={boat.id} className="boat__img" src={`/api/images/${image.url}`} />
                )
              );
            })
          : null}
        <div>
          {boat?.Images?.length > 0
            ? boat.Images.map((image, idx) => (
                <input
                  type="radio"
                  value={idx}
                  key={image.id}
                  checked={boatView === idx}
                  onChange={(e) => {
                    setBoatView(idx);
                  }}
                />
              ))
            : null}
        </div>
        {/* <BoatImageCard></BoatImageCard>  */}
      </div>
      <div className="boat__card__details">
        <div className="boat__location__div">
          <div>
            <h2>{`Come hang out in ${boat?.marina}`}</h2>
          </div>
          <div>
            <h4>{`In ${boat?.city}, ${boat?.state} at ${boat?.marina}`}</h4>
          </div>
        </div>
        <div>
          <div>
            <h2>Boat Year Make and Model</h2>
            <h3>{`${boat?.year} ${boat?.model}`}</h3>
          </div>
        </div>

        <div>
          <div>
            <h2>For as Low as!</h2>

            <h4>{`$${boat?.price}/day`}</h4>
          </div>
        </div>
      </div>
    </div>
  );
}

export default BoatCard;
