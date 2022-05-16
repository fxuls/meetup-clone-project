import { useState } from "react";
import { useParams, Redirect, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { userSelector } from "../../store/session";
import { groupSelector } from "../../store/groups";
import { createEvent } from "../../store/events";

function EventForm() {
  const dispatch = useDispatch();
  const history = useHistory();
  const { groupId, eventId } = useParams();

  const user = useSelector(userSelector);
  const group = useSelector(groupSelector(groupId));

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [type, setType] = useState("inperson");
  const [capacity, setCapacity] = useState(10);
  const [price, setPrice] = useState(0.0);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const [validationErrors, setValidationErrors] = useState([]);

  // if user is not authenticated redirect to login
  if (!user) return <Redirect to="/login" />;

  const handleSubmit = (e) => {
    e.preventDefault();

    let errors = [];

    if (!name || !description || !type || !startDate || !endDate) {
      return setValidationErrors(["Please fill out the required fields"]);
    }

    if (name.length < 5) {
      errors.push("Name must be at least 5 characters");
    }

    if (type !== "inperson" && type !== "virtual") {
      errors.push("Type must be In person or Virtual");
    }

    if (!parseInt(capacity) == capacity) {
      errors.push("Capacity must be an integer");
    }

    // TODO polish more validations

    if (errors.length === 0) {
      dispatch(
        createEvent({
          groupId,
          name,
          description,
          type,
          capacity,
          price,
          startDate,
          endDate,
        })
      ).then(async (res) => {
          // TODO make redirect to new event page
          if (res.status === 200 || res.status === 201) history.push("/");
      }).catch((async (res) => {
        const resData = await res.json();
        errors = resData.errors
          ? Object.values(resData.errors)
          : ["A problem occurred with your request"];
        setValidationErrors(errors);
      }));
    }
  };

  return (
    <div className="event-form form-page">
      <div className="form-container">
        <h1 className="unselectable">Create an Event</h1>
        <p>{`This event will be for ${group.name}`}</p>

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
                required
              />
            </div>

            <div className="field-row">
              <label htmlFor="description">Description</label>
              <textarea
                name="description"
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
              />
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

            <div className="field-row">
              <label htmlFor="capacity">Capacity</label>
              <input
                type="number"
                name="capacity"
                id="capacity"
                value={capacity}
                onChange={(e) => setCapacity(e.target.value)}
              />
            </div>

            <div className="field-row">
              <label htmlFor="price">Price</label>
              <input
                type="number"
                name="price"
                id="price"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                min="0.00"
                max="10000.00"
                step="0.01"
              />
            </div>

            <div className="field-row">
              <label htmlFor="startDate">Start date</label>
              <input
                type="datetime-local"
                name="startDate"
                id="startDate"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                required
              />
            </div>

            <div className="field-row">
              <label htmlFor="endDate">End date</label>
              <input
                type="datetime-local"
                name="endDate"
                id="endDate"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                required
              />
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

export default EventForm;
