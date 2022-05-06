import { useEffect, useState } from "react";
import { Redirect } from "react-router-dom";
import { useHistory, useLocation } from "react-router-dom";

function BoatCard({ boat }) {
  const location = useLocation();
  // console.log(location, "11111111111111111111111");
  // console.log(boat, "helooooooooooooooooooooo");
  const history = useHistory();
  // console.log(boat, "in the boat card");
  const [boatView, setBoatView] = useState(0);

  return (
    <div className="boat__card">
      <h2>working</h2>
      <div>
        {boat?.Images.length > 0
          ? boat.Images.map((image, idx) => {
              return (
                boatView === idx && (
                  <img key={image.id} value={boat.id} className="boat__img" src={`/api/images/${image.url}`} />
                )
              );
            })
          : null}
        <div>
          {boat?.Images.length > 0
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
        // <h3>{`${boat?.year} ${boat?.model}`}</h3>
        // <h4>{`In ${boat?.city}, ${boat?.state} at ${boat?.marina}`}</h4>
        // <h4>{`$${boat?.price}/day`}</h4>
      </div>
    </div>
  );
}

export default BoatCard;
