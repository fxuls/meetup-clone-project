import { csrfFetch } from "./csrf";

export const SET_USER = "session/SET_USER";
export const REMOVE_USER = "session/REMOVE_USER";

export const userSelector = (state) => state.session.user;

// SET_USER action creator
export function setUser(user) {
  return {
    type: SET_USER,
    user,
  };
}

// REMOVE_USER action creator
export function removeUser() {
  return {
    type: REMOVE_USER,
  };
}

// login thunk
export const login = (user) => async (dispatch) => {
  const { email, password } = user;
  const res = await csrfFetch("/api/session", {
    method: "POST",
    body: JSON.stringify({
      email,
      password,
    }),
  });
  const data = await res.json();
  dispatch(setUser(data.user));
  return res;
};

// restore user thunk
export const restoreUser = () => async (dispatch) => {
  const res = await csrfFetch("/api/session");
  const data = await res.json();
  dispatch(setUser(data.user));
  return res;
};

// signup thunk
export const signup = (user) => async (dispatch) => {
  const { firstName, lastName, email, password } = user;
  const res = await csrfFetch("/api/users", {
    method: "POST",
    body: JSON.stringify({
      firstName,
      lastName,
      email,
      password,
    }),
  });
  const data = await res.json();
  dispatch(setUser(data.user));
  return res;
};

export const logout = () => async (dispatch) => {
  // TODO: expire token?
  dispatch(removeUser());
  return;
};

export default function sessionReducer(state = { user: null }, action) {
  switch (action.type) {
    case SET_USER:
      return { user: action.user || null };
    case REMOVE_USER:
      return { user: null };
    default:
      return { ...state };
  }
}
