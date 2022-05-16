import moment from "moment";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams, useHistory } from "react-router-dom";
import { groupSelector, fetchGroup } from "../../store/groups";
import {
  eventSelector,
  fetchEvent,
  attendeesSelector,
  fetchAttendees,
} from "../../store/events";
import { membersSelector, fetchMembers } from "../../store/groups";
import { userSelector } from "../../store/session";
import Spinner from "../Spinner";
import AttendanceButton from "./AttendanceButton";
import { stateToAbrev } from "../../utils";

import "./EventInfoPage.css";

function EventInfoPage() {
  const dispatch = useDispatch();
  const history = useHistory();
  const { groupId, eventId } = useParams();

  const [isLoaded, setIsLoaded] = useState(false);

  // get state info
  const group = useSelector(groupSelector(groupId));
  const event = useSelector(eventSelector(eventId));
  const members = useSelector(membersSelector(groupId));
  const attendees = useSelector(attendeesSelector(eventId));
  const user = useSelector(userSelector);

  console.log(event);

  // on initial render fetch group info and members
  useEffect(() => {
    Promise.all([
      dispatch(fetchGroup(groupId)),
      dispatch(fetchEvent(eventId)),
      dispatch(fetchMembers(groupId)),
      dispatch(fetchAttendees(eventId)),
    ]).then(() => setIsLoaded(true));
  }, [dispatch]);

  // if is not loaded yet display spinner
  if (!isLoaded)
    return (
      <div className="info-page container event-page">
        <Spinner />
      </div>
    );

  const { startDate, previewImage, name, description, Venue } = event;

  const locationString = Venue ? `${Venue.address} • ${Venue.city}, ${stateToAbrev(
    Venue.state
  )}` : "No venue set";

  // convert startDate timestamp into text format
  // example: Friday, May 13, 2022
  const eventDate = moment(startDate);
  const eventDateString = eventDate.format("dddd, MMMM, YYYY");

  return (
    <div className="info-page container event-page">
      <div className="event-grid">
        <div className="event-header">
          <p className="event-date">{eventDateString}</p>
          <h1 className="event-name">{name}</h1>
          <p className="host-info">
            Hosted by{" "}
            <span className="host-name">{`${group.Organizer.firstName} ${group.Organizer.lastName}`}</span>
          </p>
        </div>

        <div className="event-details">
          <div className="preview-image-container">
            <img src={previewImage} />
          </div>
          <h2>Details</h2>
          <p>{description}</p>
        </div>

        <div className="event-sidebar">
          <div
            className="group-info-card hover-shadow"
            onClick={() => history.push(`/groups/${groupId}`)}
          >
            <div className="preview-image-container">
              <img src={group.previewImage} />
            </div>
            <div className="group-info">
              <p className="name">{group.name}</p>
              <p className="privacy">
                {(group.private ? "Private" : "Public") + " group"}
              </p>
            </div>
          </div>

          <div className="actions-and-links">
            <AttendanceButton
              eventId={eventId}
              attendees={attendees}
              members={members}
              group={group}
            />
          </div>

          <div className="info">
            <div className="location">
              <h2>Where</h2>
              <p>{locationString}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EventInfoPage;
