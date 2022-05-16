import { stateToAbrev } from "../utils";
import { csrfFetch } from "./csrf";

export const SET_GROUPS = "groups/SET_GROUPS";
export const SET_GROUP = "groups/SET_GROUP";
export const REMOVE_GROUP = "groups/REMOVE_GROUP";
export const SET_MEMBERS = "groups/SET_MEMBERS";
export const SET_GROUP_EVENTS = "groups/SET_GROUP_EVENTS";

export const allGroupsSelector = (state) => state.groups;
export const groupSelector = (groupId) => (state) => state.groups[groupId];
export const membersSelector = (groupId) => (state) =>
  state.groups[groupId]?.members;
export const groupEventsSelector = (groupId) => (state) =>
  state.groups[groupId]?.events;

// SET_GROUPS action creator
export function setGroups(groups) {
  return {
    type: SET_GROUPS,
    groups,
  };
}

// SET_GROUP action creator
export function setGroup(group) {
  return {
    type: SET_GROUP,
    group,
  };
}

// REMOVE_GROUP action creator
export function removeGroup(groupId) {
  return {
    type: REMOVE_GROUP,
    groupId,
  }
}

// SET_MEMBERS action creator
export function setMembers(groupId, members) {
  return {
    type: SET_MEMBERS,
    groupId,
    members,
  };
}

// SET_GROUP_EVENTS action creator
export function setGroupEvents(groupId, events) {
  return {
    type: SET_GROUP_EVENTS,
    groupId,
    events,
  };
}

// fetch all groups thunk
export const fetchGroups = () => async (dispatch) => {
  const res = await csrfFetch("/api/groups");
  const data = await res.json();

  dispatch(setGroups(data.Groups));
  return res;
};

// fetch group thunk
export const fetchGroup = (groupId) => async (dispatch) => {
  const res = await csrfFetch(`/api/groups/${groupId}`);

  const data = await res.json();
  dispatch(setGroup(data));
  return res;
};

// fetch members thunk
export const fetchMembers = (groupId) => async (dispatch) => {
  const res = await csrfFetch(`/api/groups/${groupId}/members`);
  const data = await res.json();

  // parse ids into obj keys
  const membersObj = {};
  data.Members.forEach(
    (member) =>
      (membersObj[member.id] = {
        id: member.id,
        firstName: member.firstName,
        lastName: member.lastName,
        status: member.Membership.status,
      })
  );

  dispatch(setMembers(groupId, membersObj));
  return res;
};

// fetch group events thunk
export const fetchGroupEvents = (groupId) => async (dispatch) => {
  const res = await csrfFetch(`/api/groups/${groupId}/events`);
  const data = await res.json();

  // parse ids into obj keys
  const eventsObj = {};
  data.Events.forEach((event) => (eventsObj[event.id] = event));

  dispatch(setGroupEvents(groupId, eventsObj));
  return res;
};

// create group thunk
export const createGroup = (group) => async (dispatch) => {
  const { name, city, state, about, privacy, type } = group;

  const res = await csrfFetch("/api/groups", {
    method: "POST",
    body: JSON.stringify({
      name,
      city,
      state,
      about,
      privacy,
      type,
    }),
  });
  const data = await res.json();
  dispatch(setGroup(data))
  return res;
};

// delete group action thunk
export const deleteGroup = (groupId) => async (dispatch) => {
  const res = await csrfFetch(`/api/groups/${groupId}`, {
    method: "DELETE",
  });
  const data = await res.json();
  if (res.status === 200) dispatch(removeGroup(groupId));
  return res;
}

export default function groupsReducer(state = {}, action) {
  const newGroups = { ...state };
  const { groupId } = action;

  switch (action.type) {
    case SET_GROUPS:
      return action.groups.reduce((newObj, group) => {
        newObj[group.id] = group;
        return newObj;
      }, {});

    case SET_GROUP:
      newGroups[action.group.id] = action.group;
      break;

    case SET_MEMBERS:
      const { members } = action;
      if (newGroups[groupId]) newGroups[groupId].members = members;
      else newGroups[groupId] = { members };
      break;

    case SET_GROUP_EVENTS:
      const { events } = action;
      if (newGroups[groupId]) newGroups[groupId].events = events;
      else newGroups[groupId] = { events };
      break;
    case REMOVE_GROUP:
      delete newGroups[groupId];
      break;
  }

  return newGroups;
}
