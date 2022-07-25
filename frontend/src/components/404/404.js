import "./404.css";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";

function CastAway() {
  //
  const history = useHistory();
  const dispatch = useDispatch();
  useEffect(() => {
    setTimeout(() => {
      history.push("/");
    }, 4000);
  }, [dispatch]);

  return (
    <div className="cast__away__page__container">
      <h1 className="cast__away__header">Watcha lookin for Wilson? Lost? Let's cast you away to the right page!</h1>
      <div className="cast__away__picture"></div>
    </div>
  );
}

export default CastAway;
