import { useHistory } from "react-router-dom";
import { NavLink, Redirect } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { userSelector, logout } from "../../store/session";

import "./Navigation.css";


// TODO: split authenticated/unauthenticated parts to their own components

function Navigation () {
    const dispatch = useDispatch();
    const history = useHistory();

    const sessionUser = useSelector(userSelector);

    const logoutButtonClick = () => {
        dispatch(logout())
    }

    const mastheadClick = () => {
        history.push("/")
    }

    return (
        <nav>
            <div className="masthead" onClick={mastheadClick}>
                MEETUP CLONE
            </div>
            <NavLink to="/groups">Groups</NavLink>
            <NavLink to="/events">Events</NavLink>
            {!sessionUser ? <NavLink to="/login">Log in</NavLink> : null}
            {!sessionUser ? <NavLink to="/signup">Sign up</NavLink> : null}
            {sessionUser ? <NavLink to="/profile">My profile</NavLink> : null /* TODO: change route */}
            {sessionUser ? <button onClick={logoutButtonClick}>Log out</button> : null}
        </nav>
    )
}

export default Navigation;
