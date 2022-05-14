import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { fetchGroups } from "../../store/groups";
import { fetchEvents } from "../../store/events";
import GroupsPanel from "./GroupsPanel/GroupsPanel";
import EventsPanel from "./EventsPanel/EventsPanel";
import { useLocation } from "react-router-dom";

import "./HomePage.css";

const GROUPS = "homepage/GROUPS";
const EVENTS = "homepage/EVENTS";

function HomePage() {
  const dispatch = useDispatch();
  const location = useLocation();

  if (location.search.includes("source=GROUPS")) window.lol = location;
  // open the groups tab by default
  const [currentPage, setCurrentPage] = useState(
    location.search.includes("source=EVENTS") ? EVENTS : GROUPS;
  );

  useEffect(() => {
    dispatch(fetchGroups());
    dispatch(fetchEvents());
  }, []);

  return (
    <div className="home-page">
      <div className="nav-bar">
        <button
          active={(currentPage === GROUPS) + ""}
          onClick={() => setCurrentPage(GROUPS)}
        >
          Groups
        </button>
        <button
          active={(currentPage === EVENTS) + ""}
          onClick={() => setCurrentPage(EVENTS)}
        >
          Events
        </button>
      </div>
      <div className="home-content-container">
        {currentPage === GROUPS ? <GroupsPanel /> : null}
        {currentPage === EVENTS ? <EventsPanel /> : null}
      </div>
    </div>
  );
}

export default HomePage;
