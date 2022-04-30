import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as boatsAction from "../../store/boats.js";
import { useParams } from "react-router-dom";
import "./ProviderBoats.css";

function ProviderBoats() {
  const dispatch = useDispatch();
  const loggedInUserId = useSelector((state) => state.session.user.id);
  const sessionUserProfile = useSelector((state) => state.userProfile.user);
  const providerBoats = useSelector((state) => state.boats.user);
  const [currentBoat, setCurrentBoat] = useState("");
  // console.log(providerBoats);
  // console.log(loggedInUserId, "current logged in user");
  useEffect(() => {
    dispatch(boatsAction.getProviderBoats(loggedInUserId));
  }, [dispatch]);
  // console.log(providerBoats);

  return (
    <div className="provider__boats__card">
      {providerBoats?.Boats.map((boat) => {
        return (
          <div>
            {/* {console.log(boat.Images, "==============")} */}
            {boat.Images.length > 0 ? <img value={boat.id} className="boat__img" src={boat.Images[0].url} /> : null}
            {/* {boat.Images.length > 0
              ? boat.Images.map((image) => {
                console.log('working')
                  <input
                    type="radio"
                    value={image}
                    onChange={(e) => {
                      setCurrentBoat(e.target.value)
                    }}
                  />;
                })
              : null} */}
            <h3>{`${boat.year} ${boat.model}`}</h3>
            <h4>{`In ${boat.city}, ${boat.state} at ${boat.marina}`}</h4>
            <h4>{`$${boat.price}/day`}</h4>
          </div>
        );
      })}
    </div>
  );
}

export default ProviderBoats;
