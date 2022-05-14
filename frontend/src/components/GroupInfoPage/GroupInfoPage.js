import { useParams, Switch, Route, Link, useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { fetchGroup, groupSelector } from "../../store/groups";
import { stateToAbrev } from "../../utils/index";
import Spinner from "../Spinner";

import "./GroupInfoPage.css";

function GroupInfoPage(props) {
  const dispatch = useDispatch();
  const location = useLocation();
  const { groupId } = useParams();

  const [isLoaded, setIsLoaded] = useState(false);

  // on initial render fetch group info
  useEffect(() => {
    dispatch(fetchGroup(groupId)).then(() => setIsLoaded(true));
  }, []);

  // get group info
  const group = useSelector(groupSelector(groupId));

  // if is not loaded yet display spinner
  if (!isLoaded)
    return (
      <div className="info-page">
        <Spinner />
      </div>
    );

  const { previewImage, name, city, state, numMembers, Organizer } = group;

  return (
    <div className="info-page group-page">
      <div className="preview-image-cell">
        <div className="preview-image-container">
          <img src={previewImage} />
        </div>
      </div>
      <div className="header-info">
        <h1>{name}</h1>
        <p className="location sub-text">{`${city}, ${stateToAbrev(state)}`}</p>
        <p className="info sub-text">{`${numMembers} members • ${
          group.private ? "Private group" : "Public group"
        }`}</p>
        <p className="organizer sub-text">
          Organized by{" "}
          <span className="organizer-name">{`${Organizer.firstName} ${Organizer.lastName}`}</span>
        </p>
      </div>
      <div className="nav-bar">
        <Link to={`/groups/${groupId}/`}>About</Link>
        <Link to={`/groups/${groupId}/events`}>Events</Link>
      </div>
      <div className="content">
        <Switch>
          <Route exact path="/groups/:groupId/events">Events</Route>
          <Route path="/groups/:groupId">About</Route>
        </Switch>
      </div>
    </div>
  );
}

export default GroupInfoPage;
