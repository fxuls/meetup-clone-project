import { csrfFetch } from "./csrf";

export const SET_GROUPS = "groups/SET_GROUPS";

export const allGroupsSelector = (state) => state.groups;

export const groupSelector = (groupId) => (state) => state.groups[groupId];

// SET_GROUPS action creator
export function setGroups(groups) {
    return {
        type: SET_GROUPS,
        groups,
    }
}

// fetch groups thunk
export const fetchGroups = () => async (dispatch) => {
    const res = await csrfFetch("/api/groups");
    const data = await res.json();
    dispatch(setGroups(data.Groups))
    return res;
}

export default function groupsReducer(state = { groups: {}}, action) {
    switch (action.type) {
        case SET_GROUPS:
            const newGroups = {};
            action.groups.forEach(group => newGroups[group.id] = group);
            return { groups: newGroups };
        default:
            return { ...state };
    }
}
