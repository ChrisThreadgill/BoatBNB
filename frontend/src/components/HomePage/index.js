import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";

function HomePage() {
  const dispatch = useDispatch();
  const sessionUser = useSelector((state) => state.session.user);

  // if (!sessionUser) return <Redirect to="/login" />;
  return (
    <div>
      <h1>HELLO FROM THE HOME PAGE</h1>
      <ul>
        <li>Leo</li>
        <li>X</li>
        <li>Joon</li>
      </ul>
    </div>
  );
}

export default HomePage;
