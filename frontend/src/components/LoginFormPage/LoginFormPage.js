import { useState } from "react";
import { login, userSelector } from "../../store/session";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";

import "./LoginFormPage.css";

function LoginFormPage() {
  const dispatch = useDispatch();

  const sessionUser = useSelector(userSelector);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loginFailed, setLoginFailed] = useState(false);

  // if user is logged in redirect to home
  if (sessionUser) return <Redirect to="/" />;

  // form submit
  const handleSubmit = (e) => {
    e.preventDefault();
    setLoginFailed(false);

    return dispatch(
      login({
        email,
        password,
      })
    ).catch(async (res) => {
      if (res.status == "401") {
        setLoginFailed(true);
      }
    });
  };

  return (
    <div id="form-page">
      <div id="form-container">
        <h1>Log in</h1>
        <form id="login-form" onSubmit={handleSubmit}>
          {loginFailed ? (
            <div className="validation-errors">
              Your email or password was entered incorrectly
            </div>
          ) : null}

          <div className="row">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              name="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="row">
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

          <button className="button" type="submit">Log in</button>
        </form>
      </div>
    </div>
  );
}

export default LoginFormPage;
