import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import "./HomePageWork.css";

function HomePageWork() {
  const history = useHistory();
  const session = useSelector((state) => state.session);
  //

  return (
    <div className="home__page__work__wrapper">
      <div className="home__page__work__container">
        <div className="home__page__work__pop__out">
          <div className="home__page__work__pop__out__contents">
            <div>Put your boat to work</div>
            <p>Offset the cost of boat ownership by listing it on boatBnB</p>
            <span onClick={session.user ? () => history.push("/new-listing") : () => history.push("/sign-up")}>
              {session.user ? "List now" : "Sign up now"}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HomePageWork;
