import { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { useSelector } from "react-redux";
import { setUser, userSelector } from "../../../store/session";
import { csrfFetch } from "../../../store/csrf";
import { Link } from "react-router-dom";

function AttendanceButton({ eventId, attendees, members, group, isMember }) {
  const history = useHistory();

  const [hasRequestedAttendance, setHasRequestedAttendance] = useState(false);
  const [requestedFeedback, setRequestedFeedback] = useState("");
  const [hasCancelledAttendance, setHasCancelledAttendance] = useState(false);
  const [cancelledFeedback, setCancelledFeedback] = useState("");
  const [userMembership, setUserMembership] = useState(null);
  const [userAttendance, setUserAttendance] = useState(null);

  const user = useSelector(userSelector);

  // get current user group membership and event attendance
  useEffect(() => {
    if (!userMembership && user && members && members[user.id])
      setUserMembership(members[user.id].status);
    if (!userAttendance && user && attendees && attendees[user.id])
      setUserAttendance(attendees[user.id].status);
  }, [
    userMembership,
    userAttendance,
    attendees,
    hasRequestedAttendance,
    hasCancelledAttendance,
  ]);

  const reqToAttend = async () => {
    // if user is logged in
    if (user) {
      const res = await csrfFetch(`/api/events/${eventId}/attendees`, {
        method: "POST",
      });
      const data = await res.json();

      setHasRequestedAttendance(true);
      if (data.statusCode)
        setRequestedFeedback(
          data.message ? data.message : "Something went wrong"
        );
      else setRequestedFeedback("Thanks, you'll hear from the organizer soon");
    }
    // if user is not logged in send to login
    else {
      history.push("/login");
    }
  };

  const cancelAttend = async () => {
    if (!user) return history.push("/login");

    const res = await csrfFetch(`/api/events/${eventId}/attendees/${user.id}`, {
      method: "DELETE",
    });
    const data = await res.json();

    setHasCancelledAttendance(true);
    if (data.statusCode)
      setCancelledFeedback(
        data.message ? data.message : "Something went wrong"
      );
    else setCancelledFeedback("You are no longer attending this event");
  };

  // user is not a member of the group
  if (!isMember) {
    return (
      <div className="attendance-button">
        <Link to={`/groups/${group.id}`}>Join Group</Link>
      </div>
    );
  }

  // user clicked cancel
  if (hasCancelledAttendance) {
    return <div className="attendance-button"><p>{hasCancelledAttendance ? <p>{cancelledFeedback}</p> : null}</p></div>;
  }

  // user is already a member
  if (userAttendance) {
    return (
      <div className="attendance-button">
        <p>
          {userAttendance === "member"
            ? "You are attending this event"
            : "Your RSVP is still pending"}
        </p>
        <button onClick={cancelAttend}>Cancel RSVP</button>
      </div>
    );
  }

  return (
    <div className="attendance-button">
      {hasRequestedAttendance ? (
        <p className="requested-feedback">{requestedFeedback}</p>
      ) : (
        <button onClick={reqToAttend}>Attend</button>
      )}
    </div>
  );
}

export default AttendanceButton;
