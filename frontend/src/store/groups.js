import { stateToAbrev } from "../utils";
import { csrfFetch } from "./csrf";

export const SET_GROUPS = "groups/SET_GROUPS";
export const SET_GROUP = "groups/SET_GROUP";
export const SET_MEMBERS = "groups/SET_MEMBERS";

export const allGroupsSelector = (state) => state.groups;
export const groupSelector = (groupId) => (state) => state.groups[groupId];
export const membersSelector = (groupId) => (state) => state.groups[groupId]?.members;

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

// SET_MEMBERS action creator
export function setMembers(groupId, members) {
  return {
    type: SET_MEMBERS,
    groupId,
    members,
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
  dispatch(setMembers(groupId, data.Members));
  return res;
};

export default function groupsReducer(state = {}, action) {
  const newGroups = { ...state };

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
      const { groupId, members } = action;
      if (newGroups[groupId]) {
        newGroups[groupId].members = members;
      } else {
        newGroups[groupId] = { members };
      }
      break;
  }

  return newGroups;
}
