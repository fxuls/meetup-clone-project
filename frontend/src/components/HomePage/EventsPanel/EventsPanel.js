import { useSelector } from "react-redux";
import { allEventsSelector } from "../../../store/events";
import EventCard from "./EventCard/EventCard";

// TODO hide events from private groups user is not part of

function EventsPanel() {
  const events = Object.values(useSelector(allEventsSelector));

  return (
    <div className="panel">
      <p className="sub-header">Suggested Events for you</p>
      <ul className="panel-list">
        {events.map((event) => (
          <li key={event.id}>
            <EventCard event={event} />
          </li>
        ))}
      </ul>
    </div>
  );
}

export default EventsPanel;
