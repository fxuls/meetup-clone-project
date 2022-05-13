import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { fetchGroups } from "../../store/groups";
import { fetchEvents } from "../../store/events";

import "./HomePage.css";

function HomePage() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchGroups());
    dispatch(fetchEvents());
  }, []);

  return (
    <div className="home-page">
      <div className="home-container">
        <div className="nav-bar">
          <button>Groups</button>
          <button>Events</button>
        </div>
      </div>
    </div>
  );
}

export default HomePage;
