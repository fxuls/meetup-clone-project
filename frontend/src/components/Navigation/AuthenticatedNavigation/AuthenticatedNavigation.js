import { NavLink } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logout } from "../../../store/session";

import "./AuthenticatedNavigation.css";

// TODO make buttons not wrap on screen shrink

function AuthenticatedNavigation() {
  const dispatch = useDispatch();

  const logoutButtonClick = () => {
    dispatch(logout());
  };

  return (
    <div id="auth-nav">
      <NavLink to="/profile">Profile</NavLink>
      <button className="logout-button" onClick={logoutButtonClick}>
        Log out
      </button>
    </div>
  );
}

export default AuthenticatedNavigation;
