import { useParams, Switch, Route, Link, useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { fetchGroup, groupSelector, fetchMembers, membersSelector } from "../../store/groups";
import { stateToAbrev } from "../../utils/index";
import Spinner from "../Spinner";
import AboutBlock from "./AboutBlock";
import EventsBlock from "./EventsBlock";
import PrivateGroupBlock from "./PrivateGroupBlock";

import "./GroupInfoPage.css";

// TODO make group display if user is member of the group

function GroupInfoPage(props) {
  const dispatch = useDispatch();
  const location = useLocation();
  const { groupId } = useParams();

  const [isLoaded, setIsLoaded] = useState(false);

  // on initial render fetch group info and members
  useEffect(() => {
    dispatch(fetchGroup(groupId)).then(() => {
      dispatch(fetchMembers(groupId)).then(() => {
        setIsLoaded(true);
      });
    });
  }, []);

  // get group info
  const group = useSelector(groupSelector(groupId));
  const members = useSelector(membersSelector(groupId));

  // if is not loaded yet display spinner
  if (!isLoaded)
    return (
      <div className="info-page">
        <Spinner />
      </div>
    );

  const { previewImage, name, city, state, numMembers, Organizer, about } =
    group;

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
        <Link
          active={!location.pathname.toLowerCase().endsWith("events") + ""}
          to={`/groups/${groupId}/`}
        >
          About
        </Link>
        <Link
          active={location.pathname.toLowerCase().endsWith("events") + ""}
          to={`/groups/${groupId}/events`}
        >
          Events
        </Link>
      </div>
      <div className="content">
        {group.private ? (
          <PrivateGroupBlock />
        ) : (
          <Switch>
            <Route exact path="/groups/:groupId/events">
              <EventsBlock />
            </Route>
            <Route path="/groups/:groupId">
              <AboutBlock about={about} organizer={Organizer} members={members}/>
            </Route>
          </Switch>
        )}
      </div>
    </div>
  );
}

export default GroupInfoPage;
