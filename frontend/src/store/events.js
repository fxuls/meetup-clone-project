import { csrfFetch } from "./csrf";

export const SET_EVENTS = "events/SET_EVENTS";
export const SET_EVENT = "events/SET_EVENT";
export const REMOVE_EVENT = "events/REMOVE_EVENT";
export const SET_ATTENDEES = "events/SET_ATTENDEES";

export const allEventsSelector = (state) => state.events;
export const eventSelector = (eventId) => (state) => state.events[eventId];
export const attendeesSelector = (eventId) => (state) =>
  state.events[eventId]?.attendees;

// SET_EVENT action creator
export function setEvents(events) {
  return {
    type: SET_EVENTS,
    events,
  };
}

// SET_EVENT action creator
export function setEvent(event) {
  return {
    type: SET_EVENT,
    event,
  };
}

// REMOVE_EVENT action creator
export function removeEvent(eventId) {
  return {
    type: REMOVE_EVENT,
    eventId,
  }
}

// SET_ATTENDEES action creator
export function setAttendees(eventId, attendees) {
  return {
    type: SET_ATTENDEES,
    eventId,
    attendees,
  };
}

// fetch all events thunk
export const fetchEvents = () => async (dispatch) => {
  const res = await csrfFetch("/api/events");
  const data = await res.json();
  dispatch(setEvents(data.Events));
  return res;
};

// fetch event thunk
export const fetchEvent = (eventId) => async (dispatch) => {
  const res = await csrfFetch(`/api/events/${eventId}`);
  const data = await res.json();
  dispatch(setEvent(data));
  return res;
};

// fetch attendees thunk
export const fetchAttendees = (eventId) => async (dispatch) => {
  const res = await csrfFetch(`/api/events/${eventId}/attendees`);
  const data = await res.json();

  const attendeesObj = {};
  data.Attendees.forEach(
    (attendee) =>
      (attendeesObj[attendee.id] = {
        id: attendee.id,
        firstName: attendee.firstName,
        lastName: attendee.lastName,
        status: attendee.Attendance.status,
      })
  );

  dispatch(setAttendees(eventId, attendeesObj));
  return res;
};

// create event thunk
export const createEvent = (event) => async (dispatch) => {
  const {
    name,
    groupId,
    description,
    type,
    capacity,
    price,
    startDate,
    endDate,
  } = event;

  const res = await csrfFetch(`/api/groups/${groupId}/events`, {
    method: "POST",
    body: JSON.stringify({
      venueId: 1, // TODO make this chosen by user instead of preset
      name,
      description,
      type,
      capacity,
      price,
      startDate,
      endDate,
    }),
  });
  const data = await res.json();
  return res;
};

// delete event thunk
export const deleteEvent = (eventId) => async (dispatch) => {
  const res = await csrfFetch(`/api/events/${eventId}`, {
    method: "DELETE",
  });
  const data = await res.json();
  if (res.status === 200) dispatch(removeEvent(eventId));
  return res;
}

export default function eventsReducer(state = {}, action) {
  const newEvents = { ...state };

  switch (action.type) {
    case SET_EVENTS:
      return action.events.reduce((newObj, event) => {
        newObj[event.id] = event;
        return newObj;
      }, {});
    case SET_EVENT:
      newEvents[action.event.id] = action.event;
      break;
    case SET_ATTENDEES:
      const { attendees, eventId } = action;
      if (newEvents[eventId]) newEvents[eventId].attendees = attendees;
      else newEvents[eventId] = { attendees };
      break;
    case REMOVE_EVENT:
      delete newEvents[eventId];
      break;
  }

  return newEvents;
}
