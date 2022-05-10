import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect, Link } from "react-router-dom";
import { userSelector } from "../../store/session";

function SignupFormPage() {
  const dispatch = useDispatch();

  const sessionUser = useSelector(userSelector);

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState([]);

  // if user is logged in redirect to home
  if (sessionUser) return <Redirect to="/" />;

  const handleSubmit = (e) => {
    e.preventDefault();

    const validationErrors = [];

    if (!firstName || !lastName || !email || !password || !confirmPassword) {
      errors.push("All fields are required");
    }

    if (password !== confirmPassword) {
      errors.push("Passwords must match");
    }

    if (password && password.length < 6) {
      errors.push("Password must be at least 6 characters");
    }
  };

  return (
    <div className="form-page">
      <div className="form-container">
        <h1 className="unselectable">Sign up</h1>
        <p>Already a member? <Link className="link" to="/login">Log in</Link></p>
        <form onSubmit={handleSubmit}>
          <div className="form-fields">
            <div className="field-row">
              <label htmlFor="firstName">First name</label>
              <input
                type="text"
                name="firstName"
                id="firstName"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                required
              />
            </div>
            <div className="field-row">
              <label htmlFor="lastName">Last name</label>
              <input
                type="text"
                name="lastName"
                id="lastName"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                required
              />
            </div>

            <div className="field-row">
              <label htmlFor="email">Email address</label>
              <input
                type="email"
                name="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div className="field-row">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              name="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            </div>

            <div className="field-row">
            <label htmlFor="confirmPassword">Confirm password</label>
            <input
              type="password"
              name="confirmPassword"
              id="confirmPassword"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
            </div>
            </div>
          <button className="form-button" type="submit">
            Sign up
          </button>
        </form>
      </div>
    </div>
  );
}

export default SignupFormPage;
