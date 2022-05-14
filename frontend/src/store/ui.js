import { GROUPS } from "../components/HomePage/HomePage";

export const SET_HOMEPAGE_TAB = "ui/SET_HOMEPAGE_TAB";

export const homepageTabSelector = (state) => state.ui.homepageTab;

// SET_HOMEPAGE_TAB action creator
export function setHomepageTab(tab) {
    return {
        type: SET_HOMEPAGE_TAB,
        tab,
    };
}

export default function uiReducer(state = {homepageTab: GROUPS}, action) {
    const newUi = { ...state };

    switch (action.type) {
        case SET_HOMEPAGE_TAB:
            newUi.homepageTab = action.tab;
            break;
    }

    return newUi;
}
