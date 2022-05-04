import { useSelector } from "react-redux";
import { useState } from "react";

function UserReviewForm({ user, rating, func, access, clean }) {
  const loggedInUser = useSelector((state) => state.session.user);
  // console.log(loggedInUser);
  const [content, setContent] = useState("");
  return (
    <div>
      <div>
        <form>
          <label>
            Write a review!
            <input
              type="text"
              value={content}
              onChange={(e) => {
                setContent(e.target.value);
              }}
            ></input>
          </label>
        </form>
      </div>
    </div>
  );
}

export default BoatReviewForm;
