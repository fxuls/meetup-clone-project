import { csrfFetch } from "./csrf";

export const SET_USER = "session/SET_USER";
export const REMOVE_USER = "session/REMOVE_USER";

export const userSelector = (state) => state.session.user;

export function setUser(user) {
  return {
    type: SET_USER,
    user,
  };
}

export function removeUser() {
  return {
    type: REMOVE_USER,
  };
}

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
