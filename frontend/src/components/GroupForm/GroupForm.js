import { useState } from "react";
import { Redirect, useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { userSelector } from "../../store/session";
import { createGroup } from "../../store/groups";
import { isValidState } from "../../utils";

function GroupForm() {
  const dispatch = useDispatch();
  const history = useHistory();

  const user = useSelector(userSelector);

  const [name, setName] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [about, setAbout] = useState("");
  const [privacy, setPrivacy] = useState("public");
  const [type, setType] = useState("inperson");
  const [validationErrors, setValidationErrors] = useState([]);

  // if user is not logged in redirect to login
  if (!user) return <Redirect to="/login" />;

  const handleSubmit = (e) => {
    e.preventDefault();

    let errors = [];

    if (!name || !city || !state || !about || !privacy || !type) {
      return setValidationErrors(["All fields are required"]);
    }

    if (name.length > 60) {
      errors.push("Name must be 60 characters or fewer");
    }

    if (about.length < 50) {
      errors.push("About must be 50 characters or more");
    }

    if (!isValidState(state)) {
        errors.push("State must be a valid, unabbreviated US state name");
    }

    if (errors.length === 0) {
      dispatch(
        createGroup({
          name,
          city,
          state,
          about,
          private: privacy === "private",
          type,
        })
      )
        .then(async (res) => {
          // TODO make redirect to new group page
          if (res.status === 201) history.push("/");
        })
        .catch(async (res) => {
          const resData = await res.json();
          errors = resData.errors
            ? Object.values(resData.errors)
            : ["A problem occurred with your request"];
          setValidationErrors(errors);
        });
    }

    setValidationErrors(errors);
  };

  return (
    <div className="group-form form-page">
      <div className="form-container">
        <h1 className="unselectable">Create a Group</h1>

        <form onSubmit={handleSubmit}>
          <div className="form-fields">
            {validationErrors.length ? (
              <div className="form-errors">
                {validationErrors.map((error, i) => (
                  <p key={i}>{error}</p>
                ))}
              </div>
            ) : null}

            <div className="field-row">
              <label htmlFor="name">Name</label>
              <input
                type="text"
                name="name"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>

            <div className="field-row">
              <label htmlFor="city">City</label>
              <input
                type="text"
                name="city"
                id="city"
                value={city}
                onChange={(e) => setCity(e.target.value)}
              />
            </div>

            <div className="field-row">
              <label htmlFor="state">State</label>
              <input
                type="text"
                name="state"
                id="state"
                value={state}
                onChange={(e) => setState(e.target.value)}
              />
            </div>

            <div className="field-row">
              <label htmlFor="about">About</label>
              <textarea
                name="about"
                id="about"
                value={about}
                onChange={(e) => setAbout(e.target.value)}
              />
            </div>

            <div className="field-row">
              <label htmlFor="privacy">Pivacy</label>

              <div className="radio-field">
                <span>Public</span>
                <input
                  type="radio"
                  name="privacy"
                  id="privateGroupFalse"
                  value={"public"}
                  onChange={(e) => setPrivacy(e.target.value)}
                  checked={privacy === "public"}
                />

                <span>Private</span>
                <input
                  type="radio"
                  name="privacy"
                  id="privacyPrivate"
                  value={"private"}
                  onChange={(e) => setPrivacy(e.target.value)}
                  checked={privacy === "private"}
                />
              </div>
            </div>

            <div className="field-row">
              <label htmlFor="type">Type</label>

              <div className="radio-field">
                <span>In person</span>
                <input
                  type="radio"
                  name="type"
                  id="typeInPerson"
                  value={"inperson"}
                  onChange={(e) => setType(e.target.value)}
                  checked={type === "inperson"}
                />

                <span>Virtual</span>
                <input
                  type="radio"
                  name="type"
                  id="typeVirtual"
                  value={"virtual"}
                  onChange={(e) => setType(e.target.value)}
                  checked={type === "virtual"}
                />
              </div>
            </div>
          </div>

          <button className="form-button" type="submit">
            Create
          </button>
        </form>
      </div>
    </div>
  );
}

export default GroupForm;
