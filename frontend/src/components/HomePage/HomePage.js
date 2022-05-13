import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { fetchGroups } from "../../store/groups";
import { fetchEvents } from "../../store/events";
import GroupsPanel from "./GroupsPanel/GroupsPanel";
import EventsPanel from "./EventsPanel/EventsPanel";

import "./HomePage.css";

const GROUPS = "homepage/GROUPS";
const EVENTS = "homepage/EVENTS";

function HomePage() {
  const dispatch = useDispatch();

  // open the groups tab by default
  const [currentPage, setCurrentPage] = useState(GROUPS);

  useEffect(() => {
    dispatch(fetchGroups());
    dispatch(fetchEvents());
  }, []);

  return (
    <div className="home-page">
      <div className="home-container">
        <div className="nav-bar">
          <button onClick={() => setCurrentPage(GROUPS)}>Groups</button>
          <button onClick={() => setCurrentPage(EVENTS)}>Events</button>
        </div>
        <div className="home-content-container">
            {currentPage === GROUPS ? <GroupsPanel /> : null}
            {currentPage === EVENTS ? <EventsPanel /> : null}
          </div>
      </div>
    </div>
  );
}

export default HomePage;
