import { csrfFetch } from "./csrf";

export const SET_EVENTS = "events/SET_EVENTS";
export const SET_EVENT = "events/SET_EVENT";
export const SET_ATTENDEES = "events/SET_ATTENDEES";

export const allEventsSelector = (state) => state.events;
export const eventSelector = (eventId) => (state) => state.events[eventId];
export const attendeesSelector = (eventId) => (state) => state.events[eventId]?.attendees;

// SET_EVENT action creator
export function setEvents(events) {
    return {
        type: SET_EVENTS,
        events,
    }
}

// SET_EVENT action creator
export function setEvent(event) {
    return {
        type: SET_EVENT,
        event,
    }
}

// SET_ATTENDEES action creator
export function setAttendees(eventId, attendees) {
    return {
        type: SET_ATTENDEES,
        eventId,
        attendees,
    }
}

// fetch all events thunk
export const fetchEvents = () => async (dispatch) => {
    const res = await csrfFetch("/api/events");
    const data = await res.json();
    dispatch(setEvents(data.Events));
    return res;
}

// fetch event thunk
export const fetchEvent = (eventId) => async (dispatch) => {
    const res = await csrfFetch(`/api/events/${eventId}`);
    const data = await res.json();
    dispatch(setEvent(data));
    return res;
}

// fetch attendees thunk
export const fetchAttendees = (eventId) => async (dispatch) => {
    const res = await csrfFetch(`/api/events/${eventId}/attendees`);
    const data = await res.json();

    const attendeesObj = {};
    data.Attendees.forEach((attendee) => attendeesObj[attendee.id] = attendee);

    dispatch(setAttendees(eventId, attendeesObj));
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
    }

    return newEvents;
}
