// calendarReducer.js

import { SET_EVENTS, SET_FILTERED_EVENTS, SET_MENU_FILTER, SET_SELECTED_DATE } from '../actions/CalendarAction';

const initialState = {
    events: [],
    filteredEvents: [],
    selectedDate: new Date(),
    menuFilter: [],
};

const CalendarReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_EVENTS:
            return {
                ...state,
                events: action.payload,
            };
        case SET_FILTERED_EVENTS:
            return {
                ...state,
                filteredEvents: action.payload,
            };
        case SET_SELECTED_DATE:
            return {
                ...state,
                selectedDate: action.payload,
            };
        case SET_MENU_FILTER:
            return {
                ...state,
                menuFilter: action.payload,
            }
        default:
            return state;
    }
};

export default CalendarReducer;
