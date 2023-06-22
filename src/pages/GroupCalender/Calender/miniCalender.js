import React from 'react';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider, CalendarPicker } from '@mui/x-date-pickers';
import { Badge } from '@mui/material';
import { PickersDay } from '@mui/x-date-pickers';
import { useDispatch, useSelector } from 'react-redux';
import { setSelectedDate } from 'redux/actions/index';


function isDateWithinEvents(date, events) {
    for (let i = 0; i < events.length; i++) {
        const start = new Date(events[i].start_short);
        const end = new Date(events[i].end_short);
        end.setDate(end.getDate() + 1);
        if (isDateWithinRange(date, start, end)) {
            return true;
        }
    }
    return false;
}

function isDateWithinRange(date, start, end) {
    return date >= start && date <= end;
}


const MiniCalender = () => {
    const dispatch = useDispatch();
    const filteredEvents = useSelector((state) => state.calendarReducer.filteredEvents);
    const selectedDate = useSelector((state) => state.calendarReducer.selectedDate);

    const handleClick = (newDate) => {
        dispatch(setSelectedDate(newDate));
    };

    return (
        <>
            <LocalizationProvider dateAdapter={AdapterDateFns}>
                <CalendarPicker
                    date={selectedDate}
                    onChange={(newDate) => handleClick(newDate)}
                    renderDay={(day, value, DayComponentProps) => {
                        const isSelected =
                            !DayComponentProps.outsideCurrentMonth &&
                            isDateWithinEvents(day, filteredEvents);
                        return (
                            <Badge
                                key={day.toString()}
                                overlap="circular"
                                badgeContent={isSelected ? '✔️' : undefined}
                            >
                                <PickersDay
                                    {...DayComponentProps}
                                    onClick={() => handleClick(day)}
                                />
                            </Badge>
                        );
                    }}
                />
            </LocalizationProvider>
        </>
    );
};


export default MiniCalender;


