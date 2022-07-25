import "./BoatPage.css";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";

import * as boatsAction from "../../store/boats";

import "react-datepicker/dist/react-datepicker.css";

import BoatPageImages from "./BoatPageImages/BoatPageImages";
import BoatPageInformation from "./BoatPageInformation/BoatPageInformation";
import BoatPageReviews from "./BoatPageReviews/BoatPageReviews";
import BoatPageBookingForm from "../forms/BoatPageBookingForm/BoatPageBookingForm";
import Footer from "../Footer/Footer";

function BoatPage() {
  const dispatch = useDispatch();
  const { boatId } = useParams();
  const [isLoaded, setIsLoaded] = useState(false);

  const boat = useSelector((state) => state.boats);

  const user = useSelector((state) => state.session.user);

  useEffect(() => {
    if (boatId) {
      dispatch(boatsAction.getOneBoat(boatId)).then(() => setIsLoaded(true));
    }
    return () => {};
  }, [dispatch]);

  return (
    <div>
      {isLoaded ? (
        <div className="boat__page__container">
          <BoatPageImages boat={boat}></BoatPageImages>
          <div className="boat__page__information__container">
            <BoatPageInformation boat={boat}></BoatPageInformation>
            <BoatPageBookingForm boat={boat}></BoatPageBookingForm>
          </div>
          {/* <BoatPageReviews boat={boat}></BoatPageReviews> */}
          <Footer></Footer>
        </div>
      ) : (
        <h1>... loading</h1>
      )}
    </div>
  );
}

export default BoatPage;
