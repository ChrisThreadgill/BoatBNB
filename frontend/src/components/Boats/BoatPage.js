import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import BoatCard from "./BoatCard";
import * as boatsAction from "../../store/boats.js";
import * as reviewsAction from "../../store/boatReviews";
import * as ratingsAction from "../../store/boatRatings";
import { useParams } from "react-router-dom";
import AddBookingForm from "../Bookings/AddBookingForm";
import BoatReview from "../Reviews/BoatReview";
import "./BoatCSS/SingleBoat.css";
import BoatReviewBoard from "../Reviews/BoatReviewBoard";

function BoatPage() {
  const { boatId } = useParams();
  console.log(boatId, "----------------------boatID");

  const dispatch = useDispatch();
  const boat = useSelector((state) => state.boats);
  const userId = useSelector((state) => state.session.user?.id);
  const boatReviews = useSelector((state) => state.boatReviews);
  const boatRatingsNR = useSelector((state) => state.boatRatings);
  console.log(boat, "NR BOAT RATINGS-------------------");
  console.log(boatRatingsNR);

  useEffect(() => {
    dispatch(boatsAction.getOneBoat(boatId));
    dispatch(reviewsAction.getAllReviewsForSingleBoat(boatId));
    dispatch(ratingsAction.getRatingsForSingleBoatNR(boatId));

    return () => {
      dispatch(ratingsAction.clean());
    };
  }, [dispatch]);

  return (
    <div>
      <h1>Single Boat Page</h1>
      <div className="single__boat__view">
        <div className="boat__info__booking">
          {boat && <BoatCard boat={boat}></BoatCard>}
          {userId && (
            <div className="boat__booking__container">
              <div>
                <h1>HOPEFULLY SCHEDULE BOARD GOES HERE</h1>
              </div>
            </div>
          )}
        </div>
        {boatId && (
          <div className="add__booking__form__container">
            <AddBookingForm boatId={boatId}></AddBookingForm>
          </div>
        )}

        {userId && (
          <div>
            <div>
              <BoatReview boat={boat} userId={userId}></BoatReview>
            </div>
          </div>
        )}
      </div>
      <div className="boat__review__board">
        {boatReviews && boatRatingsNR && (
          <BoatReviewBoard boatReviews={boatReviews} boatRatingsNR={boatRatingsNR}></BoatReviewBoard>
        )}
        {boatReviews && !boatRatingsNR && <BoatReviewBoard boatReviews={boatReviews}></BoatReviewBoard>}
      </div>
    </div>
  );
}

export default BoatPage;
