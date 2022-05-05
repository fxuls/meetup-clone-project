import { useState } from "react";
import { login, userSelector } from "../../store/session";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";

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
    <>
      {loginFailed ? (
        <div className="validation-errors">
          Your email or password was entered incorrectly
        </div>
      ) : null}
      <form onSubmit={handleSubmit}>
        <label htmlFor="email">Email</label>
        <input
          type="email"
          name="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <label htmlFor="password">Password</label>
        <input
          type="password"
          name="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <button type="submit">Log in</button>
      </form>
    </>
  );
}

export default LoginFormPage;
