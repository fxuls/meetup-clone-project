import { useHistory } from "react-router-dom";
import { stateToAbrev } from "../../../../utils";

function GroupCard({ group }) {
  const history = useHistory();
  const { id, previewImage, name, city, state, about, numMembers, } =
    group;

  return (
    <div
      className="card group-card"
      onClick={() => history.pushState(`/groups/${id}`)}
    >
      <div className="preview-image-container">
        <img className="preview-image" src={previewImage} />
      </div>
      <div className="card-info">
        <p className="name">{name}</p>
        <p className="location">{`${city}, ${stateToAbrev(state)}`}</p>
        <p className="about sub-text">{about}</p>
        <p className="info sub-text">{`${numMembers} members • ${group.private ? "Private" : "Public"}`}</p>
      </div>
    </div>
  );
}

export default GroupCard;
