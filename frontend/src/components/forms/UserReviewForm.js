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
          <label>Leave a Review!</label>
          <input
            type="text"
            value={content}
            onChange={(e) => {
              setContent(e.target.value);
            }}
          ></input>
          <button type="submit">Add Review!</button>
        </form>
      </div>
    </div>
  );
}

export default UserReviewForm;
