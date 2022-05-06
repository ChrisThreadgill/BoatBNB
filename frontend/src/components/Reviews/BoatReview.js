import { useState } from "react";
import BoatReviewForm from "../forms/BoatReviewForm";
import BoatRating from "../Ratings/BoatRating";

function BoatReview({ boat }) {
  const [rating, setRating] = useState(null);
  const [hover, setHover] = useState(null);

  const [func, setFunc] = useState(null);
  const [funcHover, setFuncHover] = useState(null);

  const [comfort, setComfort] = useState(null);
  const [comfortHover, setComfortHover] = useState(null);

  const [clean, setClean] = useState(null);
  const [cleanHover, setCleanHover] = useState(null);

  return (
    <div>
      <h1>Leave a Review!</h1>
      <BoatRating
        rating={rating}
        setRating={setRating}
        hover={hover}
        setHover={setHover}
        func={func}
        setFunc={setFunc}
        funcHover={funcHover}
        setFuncHover={setFuncHover}
        comfort={comfort}
        setComfort={setComfort}
        comfortHover={comfortHover}
        setComfortHover={setComfortHover}
        clean={clean}
        setClean={setClean}
        cleanHover={cleanHover}
        setCleanHover={setCleanHover}
      ></BoatRating>
      <BoatReviewForm
        rating={rating}
        setComfort={setComfort}
        setRating={setRating}
        setClean={setClean}
        setFunc={setFunc}
        func={func}
        clean={clean}
        comfort={comfort}
        boat={boat}
      ></BoatReviewForm>
    </div>
  );
}

export default BoatReview;
