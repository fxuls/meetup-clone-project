import { useState } from "react";
import { useHistory } from "react-router-dom";
import { useSelector } from "react-redux";
import { userSelector } from "../../../store/session";
import { csrfFetch } from "../../../store/csrf";

import "./PrivateGroupBlock.css";

function PrivateGroupBlock({ groupId }) {
  const history = useHistory();

  const [hasRequestedJoin, setHasRequestedJoin] = useState(false);
  const [requestedFeedback, setRequestedFeedback] = useState("Thanks, you'll hear from the organizer soon");

  const user = useSelector(userSelector);

  const reqToJoinClicked = async () => {
    // if user is logged in send request for membership
    if (user) {
      const res = await csrfFetch(`/api/groups/${groupId}/join`, {
        method: "POST",
      });
      const data = await res.json();

      setHasRequestedJoin(true);
      if (res.statusCode !== 200) setRequestedFeedback(data.message);
    }

    // if not logged in send user to login page
    else {
      history.push("/login");
    }
  };

  return (
    <div className="private-block">
      <h2>This group is private</h2>
      <p>You must be a member in order to view the contents of this group.</p>
      {hasRequestedJoin ? (
        <p className="requested-feedback">{requestedFeedback}</p>
      ) : (
        <button className="hover-shadow" onClick={reqToJoinClicked}>
          Request to Join
        </button>
      )}
    </div>
  );
}

export default PrivateGroupBlock;
