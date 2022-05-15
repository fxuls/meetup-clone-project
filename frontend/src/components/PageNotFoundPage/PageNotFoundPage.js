import { Link } from "react-router-dom";

import "./PageNotFoundPage.css";

function PageNotFoundPage () {
    return (
        <div className="pnf-page">
            <div className="pnf-container">
                <h1>404</h1>
                <p>Whoops! That page was not found or is unavailable.</p>
                <Link to="/" className="home-button">Return Home</Link>
            </div>
        </div>
    )
}

export default PageNotFoundPage;
