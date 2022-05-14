import { csrfFetch } from "./csrf";

export const SET_GROUPS = "groups/SET_GROUPS";
export const SET_GROUP = "groups/SET_GROUP";

export const allGroupsSelector = (state) => state.groups;

export const groupSelector = (groupId) => (state) => state.groups[groupId];

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
  }

  return newGroups;
}
