import moment from "moment";
import { useHistory } from "react-router-dom";
import { stateToAbrev } from "../../../../utils";

function EventCard({ event }) {
  const history = useHistory();
  const { id, groupId, previewImage, Group, numAttending } = event;

  // convert startDate timestamp into text format
  // example: Fri, May 13 ⸱ 9:30 pm
  const startDate = moment(event.startDate);
  const startDateString = startDate.format("ddd, MMM, D • h:mm a");

  // format group info
  const groupInfo = `${Group.name} • ${Group.city}, ${stateToAbrev(
    Group.state
  )}`;

  // format attending info
  const attendingInfo =
    numAttending + " " + (numAttending == 1 ? "attendee" : "attendees");

  return (
    <div
      className="card event-card"
      onClick={() => history.push(`/groups/${groupId}/events/${id}`)}
    >
      <div className="preview-image-container">
        <img className="preview-image" src={previewImage} />
      </div>
      <div className="card-info">
        <p className="date-line">{startDateString}</p>
        <p className="name">{event.name}</p>
        <p className="group-info">{groupInfo}</p>
        <p className="attending-count sub-text">{attendingInfo}</p>
      </div>
    </div>
  );
}

export default EventCard;
