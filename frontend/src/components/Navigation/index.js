import { NavLink } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { userSelector, logout } from "../../store/session";


// TODO: split authenticated/unauthenticated parts to their own components

function Navigation () {
    const dispatch = useDispatch();

    const sessionUser = useSelector(userSelector);

    const logoutButtonClick = () => {
        dispatch(logout())
    }

    return (
        <nav>
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
