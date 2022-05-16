import { useHistory } from "react-router-dom";

import "./Footer.css";

function Footer() {
  const history = useHistory();

  return (
    <footer>
      <div className="footer-container">
        <div className="create-group">
          <span>Create your own Meetup group.</span>
          <button onClick={() => history.push("/groups/new")}>Get Started</button>
        </div>
        {/* <p>This will be the footer information</p> */}
      </div>
    </footer>
  );
}

export default Footer;
