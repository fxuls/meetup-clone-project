import EventCard from "../../HomePage/EventsPanel/EventCard";

import "./EventsBlock.css";

function EventsBlock({ events }) {
  return (
    <div className="events-block">
      <ul className="events-list">
          {Object.values(events).map((event) => (<li key={event.id}>
            <EventCard event={event} />
          </li>))}
      </ul>
    </div>
  );
}

export default EventsBlock;
