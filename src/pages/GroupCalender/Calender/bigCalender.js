import React from 'react';
import { momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import { StyledCalendar } from './calandar.style';
import Box from '@mui/material/Box';
import axios from 'axios';
import { Button, FormControl, Grid, InputLabel, MenuItem, Modal, Paper, Select, TextField, Typography } from '@mui/material';
import { DatePicker, LocalizationProvider, TimePicker } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import AppGridContainer from '@crema/core/AppGridContainer';
import styled from '@emotion/styled';
import { useDispatch, useSelector } from 'react-redux';
import { setEvents, setFilteredEvents } from 'redux/actions';

const Item = styled(Paper)(({ theme }) => ({
    ...theme.typography.body2,
    padding: theme.spacing(0),
    textAlign: 'center',
    color: theme.palette.text.secondary,
}));

const localizer = momentLocalizer(moment);

const BigCalender = () => {
    const filteredEvents = useSelector((state) => state.calendarReducer.filteredEvents);
    const selectedDate = useSelector((state) => state.calendarReducer.selectedDate);
    const menuFilter = useSelector((state) => state.calendarReducer.menuFilter)

    const dispatch = useDispatch()

    const style = {
        position: 'absolute',
        top: '40%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 400,
        bgcolor: 'background.paper',
        border: '2px solid #000',
        boxShadow: 24,
        p: 4,
        rbcToday: 'primary',
    };

    const [open, setOpen] = React.useState(false);

    const handleOpen = (events) => {
        setOpen(true);
        setFormname({ name: events.title });
        setForm({ deskripsi: events.deskripsi });
        setValueawal(events.start);
        const endDate = new Date(events.end);
        endDate.setDate(endDate.getDate() - 1);
        setValueakhir(endDate);
        setFilter(events.filter);
        setIdSelected(events._id);
        setStartShort(events.start_short);
        setEndShort(events.end_short);
        setTimeStart(events.time_start);
        setTimeEnd(events.time_end)
    };

    const handleClose = () => setOpen(false);
    const [formname, setFormname] = React.useState({ name: '' })
    const [form, setForm] = React.useState({ deskripsi: '' })
    const [valueawal, setValueawal] = React.useState(null);
    const [valueakhir, setValueakhir] = React.useState(null);
    const [idSelected, setIdSelected] = React.useState(null);
    const [filter, setFilter] = React.useState('');
    const [startShort, setStartShort] = React.useState(null);
    const [endShort, setEndShort] = React.useState(null);
    const [timeStart, setTimeStart] = React.useState(null);
    const [timeEnd, setTimeEnd] = React.useState(null);

    const inputOnChangeHandler1 = event => {
        setFormname({ [event.target.name]: event.target.value })
    }
    const inputOnChangeHandler2 = event => {
        setForm({ [event.target.name]: event.target.value })
    }
    const handleChange = (event) => {
        setFilter(event.target.value);
    };

    const getDataEvent = () => {
        const userDataJSON = localStorage.getItem('Calender');
        const userData = JSON.parse(userDataJSON);
        const id = userData.id;
        const payload = {
            token: '6462d14bbd4ed7ca344ffbc3',
            project: 'calender',
            collection: 'event',
            appid: '6492ab85e1bb12965b3ee12a',
            where_field: 'user_id',
            where_value: id
        };
        const url = `https://io.etter.cloud/v4/select_where/token/6462d14bbd4ed7ca344ffbc3/project/calender/collection/event/appid/6492ab85e1bb12965b3ee12a/where_field/user_id/where_value/${id}`;

        axios.get(url, payload)
            .then((response) => {
                dispatch(setEvents(response.data));
                dispatch(setFilteredEvents(response.data));
            })
            .catch((error) => {
                console.log(error);
            });
    }

    const editData = () => {
        const formattedStart = valueawal && valueawal instanceof Date ? valueawal.toISOString().split('T')[0] : startShort;
        const formattedEnd = valueakhir && valueakhir instanceof Date ? valueakhir.toISOString().split('T')[0] : endShort;

        const filterValue = filter || 'Uncategorized'

        var payload = {
            update_field: 'title~start~end~deskripsi~filter~start_short~end_short~time_start~time_end',
            update_value:
                formname.name +
                '~' +
                valueawal +
                '~' +
                valueakhir +
                '~' +
                form.deskripsi +
                '~' +
                filterValue +
                '~' +
                formattedStart +
                '~' +
                formattedEnd +
                '~' +
                timeStart +
                '~' +
                timeEnd,
            token: '6462d14bbd4ed7ca344ffbc3',
            project: 'calender',
            collection: 'event',
            appid: '6492ab85e1bb12965b3ee12a',
            id: idSelected,
        };
        var url = 'https://io.etter.cloud/v4/update_id';
        axios
            .put(url, payload)
            .then((response) => {
                console.log(response);
                console.log(payload);
                handleClose();
                // window.location.reload()
                getDataEvent()
            })
            .catch((error) => console.log(error));
    };

    const deleteButtonHandler = idSelected => {
        var url = `https://io.etter.cloud/v4/remove_id/token/6462d14bbd4ed7ca344ffbc3/project/calender/collection/event/appid/6492ab85e1bb12965b3ee12a/id/${idSelected}`
        var payload = {
            token: '6462d14bbd4ed7ca344ffbc3',
            project: 'calender',
            collection: 'event',
            appid: '6492ab85e1bb12965b3ee12a',
            id: idSelected
        }
        axios.delete(url, payload)
            .then(response => {
                console.log(response)
                handleClose()
                // window.location.reload()
                getDataEvent()
            })

            .catch(error => {
                console.log(error)
            })
    }

    const filterEvents = filteredEvents.filter((event) => {
        const eventDate = new Date(event.start);
        eventDate.setHours(0, 0, 0, 0);
        const selectedDateCopy = new Date(selectedDate);
        selectedDateCopy.setHours(0, 0, 0, 0);
        return eventDate.getTime() === selectedDateCopy.getTime();
    });

    const modifiedEvents = filterEvents.map((event) => {
        const modifiedEnd = new Date(event.end);
        modifiedEnd.setDate(modifiedEnd.getDate() + 1);
        return {
            ...event,
            end: modifiedEnd,
        };
    });

    const menuItems = [...new Set(menuFilter.map((item) => item.name_filter))];

    return (
        <>
            <Box className='app-calendar app-cul-calendar'>
                <StyledCalendar
                    onSelectEvent={(events) => handleOpen(events)}
                    popup
                    localizer={localizer}
                    events={modifiedEvents}
                    defaultDate={selectedDate}
                />
            </Box>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby='modal-modal-title'
                aria-describedby='modal-modal-description'
            >
                <Box sx={style}>
                    <Typography id='modal-modal-title' variant='h6' component='h2'>
                        <FormControl fullWidth>
                            <TextField id='outlined-static' label='Judul' variant='outlined' sx={{ mb: 4 }} value={formname.name} name='name'
                                onChange={(event) => inputOnChangeHandler1(event)} />
                            <AppGridContainer>
                                <Grid item xs={6}>
                                    <Item>
                                        <Box fullWidth sx={{ mb: 4 }}>
                                            <LocalizationProvider dateAdapter={AdapterDateFns}>
                                                <DatePicker
                                                    label="Start Date"
                                                    value={valueawal}
                                                    onChange={(newValueawal) => {
                                                        setValueawal(newValueawal);
                                                        setValueakhir(newValueawal);
                                                        if (valueakhir && valueakhir <= newValueawal) {
                                                            setValueakhir(null);
                                                        }
                                                    }}
                                                    renderInput={(params) => <TextField {...params} />}
                                                    disablePast
                                                />
                                            </LocalizationProvider>
                                        </Box>
                                    </Item>
                                </Grid>
                                <Grid item xs={6}>
                                    <Item>
                                        <Box>
                                            <LocalizationProvider dateAdapter={AdapterDateFns}>
                                                <DatePicker
                                                    label="End Date"
                                                    value={valueakhir}
                                                    onChange={(newValueakhir) => {
                                                        setValueakhir(newValueakhir);
                                                    }}
                                                    renderInput={(params) => <TextField {...params} />}
                                                    minDate={valueawal}
                                                    disablePast
                                                />
                                            </LocalizationProvider>
                                        </Box>
                                    </Item>
                                </Grid>
                            </AppGridContainer>
                            <AppGridContainer>
                                <Grid item xs={6}>
                                    <Item>
                                        <LocalizationProvider dateAdapter={AdapterDateFns}>
                                            <TimePicker
                                                label='Start Time'
                                                value={timeStart}
                                                onChange={(newTimeStart) => {
                                                    setTimeStart(newTimeStart);
                                                }}
                                                renderInput={(params) => <TextField {...params} />}
                                            />
                                        </LocalizationProvider>
                                    </Item>
                                </Grid>
                                <Grid item xs={6}>
                                    <Item>
                                        <LocalizationProvider dateAdapter={AdapterDateFns}>
                                            <TimePicker
                                                label='End Time'
                                                value={timeEnd}
                                                onChange={(newTimeEnd) => {
                                                    setTimeEnd(newTimeEnd);
                                                }}
                                                renderInput={(params) => <TextField {...params} />}
                                                minDate={timeStart}
                                            />
                                        </LocalizationProvider>
                                    </Item>
                                </Grid>
                            </AppGridContainer>
                            <TextField
                                sx={{ mt: 4 }}
                                id='outlined-multiline-static'
                                label='Deskripsi'
                                multiline
                                rows={4}
                                value={form.deskripsi}
                                name='deskripsi'
                                onChange={(event) => inputOnChangeHandler2(event)}
                            />
                            <Box sx={{ minWidth: 120, mt: 4 }}>
                                <FormControl fullWidth>
                                    <InputLabel id='demo-simple-select-label'>Category</InputLabel>
                                    <Select
                                        labelId='demo-simple-select-label'
                                        id='demo-simple-select'
                                        value={filter}
                                        label='Category'
                                        onChange={handleChange}
                                    >
                                        <MenuItem key={'Uncategorized'} value={'Uncategorized'}>Uncategorized</MenuItem>
                                        {menuItems.map((menuItem) => (
                                            <MenuItem key={menuItem} value={menuItem}>
                                                {menuItem}
                                            </MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>
                            </Box>
                            <div style={{ padding: '10px', paddingRight: 0, textAlign: 'end' }}>
                                <Button variant="contained" sx={{ width: '8vw', backgroundColor: 'green', marginRight: '8px' }} onClick={editData}>Save</Button>
                                <Button variant="contained" sx={{ width: '8vw', backgroundColor: 'red' }} onClick={() => deleteButtonHandler(idSelected)}>Delete</Button>
                            </div>
                        </FormControl>
                    </Typography>
                </Box>
            </Modal>
        </>
    );
}

export default BigCalender;