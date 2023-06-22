import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';
import Settings from './Setting';
import Common from './Common';
import CalendarReducer from './CalendarReducer';

const reducers = (history) =>
    combineReducers({
        router: connectRouter(history),
        settings: Settings,
        common: Common,
        calendarReducer: CalendarReducer,
    });
export default reducers; 
