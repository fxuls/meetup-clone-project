import { NavLink } from "react-router-dom";

function UnauthenticatedNavigation() {
  return (
    <>
      <NavLink to="/login">Log in</NavLink>
      <NavLink to="/signup">Sign up</NavLink>
    </>
  );
}

export default UnauthenticatedNavigation;
