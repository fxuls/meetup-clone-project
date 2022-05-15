import "./PrivateGroupBlock.css";

function PrivateGroupBlock() {
  const reqToJoinClicked = () => {
    // TODO add functionality for button
  };

  return (
    <div className="private-block">
      <h2>This group is private</h2>
      <p>You must be a member in order to view the contents of this group.</p>
      <button className="hover-shadow" onClick={reqToJoinClicked}>Request to Join</button>
    </div>
  );
}

export default PrivateGroupBlock;
