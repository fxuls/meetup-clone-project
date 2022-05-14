import { useSelector } from "react-redux";
import { allGroupsSelector } from "../../../store/groups";
import GroupCard from "./GroupCard";

function GroupsPanel () {
    const groups = Object.values(useSelector(allGroupsSelector));

    return (<div className="panel">
        <p className="sub-header">Suggested Groups for you</p>
        <ul className="panel-list">
            {groups.map(group => <li key={group.id}><GroupCard group={group} /></li>)}
        </ul>
    </div>);
}

export default GroupsPanel;
