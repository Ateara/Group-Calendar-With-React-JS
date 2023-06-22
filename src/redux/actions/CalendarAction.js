// calendarActionTypes

export const SET_EVENTS = 'SET_EVENTS';
export const SET_FILTERED_EVENTS = 'SET_FILTERED_EVENTS';
export const SET_SELECTED_DATE = 'SET_SELECTED_DATE';
export const SET_MENU_FILTER = 'SET_MENU_FILTER';



// calendarActions

export const setEvents = (events) => {
    return (dispatch) => dispatch({
        type: SET_EVENTS,
        payload: events,
    });
}

export const setFilteredEvents = (filteredEvents) => {
    return (dispatch) => dispatch({
        type: SET_FILTERED_EVENTS,
        payload: filteredEvents,
    });
}

export const setSelectedDate = (selectedDate) => {
    return (dispatch) => dispatch({
        type: SET_SELECTED_DATE,
        payload: selectedDate,
    })
}

export const setMenuFilter = (menuFilter) => {
    return (dispatch) => dispatch({
        type: SET_MENU_FILTER,
        payload: menuFilter,
    })
}