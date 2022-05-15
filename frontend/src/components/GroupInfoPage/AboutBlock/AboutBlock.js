import { useSelector } from "react-redux";
import { membersSelector } from "../../../store/groups";

import "./AboutBlock.css";

function AboutBlock({ about, organizer, members }) {
  console.log(members);
  return (
    <div className="about-block">
      <div className="description">
        <h2>What we're about</h2>
        <p>{about}</p>
      </div>
      <div className="member-info">
        <div className="organizer-info">
          <h2>Organizer</h2>
          <p>{`${organizer.firstName} ${organizer.lastName}`}</p>
        </div>
        <ul className="member-list">
          <h2>Members</h2>
          {members.map(member => {
            return <li key={member.id}>{`${member.firstName} ${member.lastName}`}</li>
          })}
        </ul>
      </div>
    </div>
  );
}

export default AboutBlock;
