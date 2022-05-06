import { NavLink } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logout } from "../../../store/session";

function AuthenticatedNavigation() {
  const dispatch = useDispatch();

  const logoutButtonClick = () => {
    dispatch(logout());
  };

  return (
    <>
      <NavLink to="/profile">Profile</NavLink>
      <button onClick={logoutButtonClick}>Log out</button>
    </>
  );
}

export default AuthenticatedNavigation;
