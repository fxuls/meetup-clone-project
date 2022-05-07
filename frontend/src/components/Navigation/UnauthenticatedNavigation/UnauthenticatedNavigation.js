import { NavLink } from "react-router-dom";

function UnauthenticatedNavigation() {
  return (
    <div id="unauth-nav">
      <NavLink to="/login">Log in</NavLink>
      <NavLink to="/signup">Sign up</NavLink>
    </div>
  );
}

export default UnauthenticatedNavigation;
