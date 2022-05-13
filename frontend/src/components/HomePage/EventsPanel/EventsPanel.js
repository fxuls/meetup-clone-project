import { useSelector } from "react-redux";
import { allEventsSelector } from "../../../store/events";

function EventsPanel () {
    const events = useSelector(allEventsSelector);

    return (<div className="panel">
        <ul className="panel-list">
            {events.map(event => <li key={event.id}></li>)}
        </ul>
    </div>);
}

export default EventsPanel;
