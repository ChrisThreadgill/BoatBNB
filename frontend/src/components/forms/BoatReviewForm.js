import { useSelector } from "react-redux";
import { useState } from "react";
import { csrfFetch } from "../../store/csrf";

function BoatReviewForm({ boat, rating, func, comfort, clean }) {
  const loggedInUserId = useSelector((state) => state.session.user.id);
  // console.log(boat);

  const handleSubmit = async (e) => {
    e.preventDefault();

    let boatReviewId = null;

    if (review) {
      const reviewBody = { userId: 1, boatId: boat.id, review };
      // console.log(body);
      const newBoatReview = await csrfFetch(`/api/reviews/boatReview`, {
        method: "POST",
        body: JSON.stringify(reviewBody),
      });
      const response = await newBoatReview.json();
      if (response.newBoatReview) {
        boatReviewId = response.newBoatReview.id;
        // console.log("you suck don't forget that, do better");
      }
    }

    if (rating) {
      const ratingBody = {
        userId: 1,
        boatId: boat.id,
        cleanliness: clean,
        functional: func,
        comfort: comfort,
        boatReviewId,
      };
      const newBoatRating = await csrfFetch(`/api/ratings/boatRating`, {
        method: "POST",
        body: JSON.stringify(ratingBody),
      });
      const response = await newBoatRating.json();

      // console.log("good job");
    }

    // console.log(newBoatId);
  };

  const [review, setReview] = useState("");
  return (
    <div>
      <div>
        <form onSubmit={handleSubmit}>
          <label>
            Write a review!
            <input
              type="text"
              value={review}
              onChange={(e) => {
                setReview(e.target.value);
              }}
            ></input>
          </label>
          <button type="submit">Add Review!</button>
        </form>
      </div>
    </div>
  );
}

export default BoatReviewForm;
