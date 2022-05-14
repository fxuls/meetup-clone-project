import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchGroups } from "../../store/groups";
import { fetchEvents } from "../../store/events";
import GroupsPanel from "./GroupsPanel/GroupsPanel";
import EventsPanel from "./EventsPanel/EventsPanel";
import { useLocation } from "react-router-dom";
import { setHomepageTab, homepageTabSelector } from "../../store/ui";

import "./HomePage.css";

export const GROUPS = "homepage/GROUPS";
export const EVENTS = "homepage/EVENTS";

function HomePage() {
  const dispatch = useDispatch();
  const location = useLocation();

  const homepageTab = useSelector(homepageTabSelector);

  useEffect(() => {
    dispatch(fetchGroups());
    dispatch(fetchEvents());
  }, []);

  return (
    <div className="home-page">
      <div className="nav-bar">
        <button
          active={(homepageTab === GROUPS) + ""}
          onClick={() => dispatch(setHomepageTab(GROUPS))}
        >
          Groups
        </button>
        <button
          active={(homepageTab === EVENTS) + ""}
          onClick={() => dispatch(setHomepageTab(EVENTS))}
        >
          Events
        </button>
      </div>
      <div className="home-content-container">
        {homepageTab === GROUPS ? <GroupsPanel /> : null}
        {homepageTab === EVENTS ? <EventsPanel /> : null}
      </div>
    </div>
  );
}

export default HomePage;
