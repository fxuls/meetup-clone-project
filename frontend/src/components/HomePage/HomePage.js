import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { fetchGroups } from "../../store/groups";
import { fetchEvents } from "../../store/events";

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
          <button>Groups</button>
          <button>Events</button>
          <div className="home-content-container">

          </div>
        </div>
      </div>
    </div>
  );
}

export default HomePage;
