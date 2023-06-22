import { Box, Button, FormControl, Grid, InputLabel, MenuItem, Paper, Select, TextField } from '@mui/material';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import React, { useState } from 'react';
import { DatePicker, LocalizationProvider, TimePicker } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import axios from 'axios';
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


const style = {
    position: 'absolute',
    top: '40%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 500,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

export default function ModalAddAgenda() {

    const menuFilter = useSelector((state) => state.calendarReducer.menuFilter)
    const event = useSelector((state) => state.calendarReducer.events)

    const dispatch = useDispatch()

    const [formname, setFormname] = React.useState({ name: '' });
    const [form, setForm] = React.useState({ deskripsi: '' });
    const [valueawal, setValueawal] = React.useState(null);
    const [valueakhir, setValueakhir] = React.useState(null);
    const [filter, setFilter] = React.useState('');
    const [timeStart, setTimeStart] = React.useState(null);
    const [timeEnd, setTimeEnd] = React.useState(null);

    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const handleChange = (event) => {
        setFilter(event.target.value);
    };

    const inputOnChangeHandler1 = event => {
        setFormname({ [event.target.name]: event.target.value });
    };

    const inputOnChangeHandler2 = event => {
        setForm({ [event.target.name]: event.target.value });
    };

    const userDataJSON = localStorage.getItem('Calender');
    const userData = JSON.parse(userDataJSON);
    const id = userData.id;

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

    const onAddhandler = () => {
        handleClose();

        const formattedStart = valueawal ? valueawal.toISOString().split('T')[0] : null;
        const formattedEnd = valueakhir ? valueakhir.toISOString().split('T')[0] : null;

        const filterValue = filter || 'Uncategorized';

        const payload = {
            token: '6462d14bbd4ed7ca344ffbc3',
            project: 'calender',
            collection: 'event',
            appid: '6492ab85e1bb12965b3ee12a',
            title: formname.name,
            deskripsi: form.deskripsi,
            start: valueawal,
            end: valueakhir,
            time_start: timeStart,
            time_end: timeEnd,
            filter: filterValue,
            start_short: formattedStart,
            end_short: formattedEnd,
            user_id: id,
        };

        const url = 'https://io.etter.cloud/v4/insert';
        axios.post(url, payload)
            .then(response => {
                console.log(response);

                const newEvent = [...event]
                newEvent.push(response.data[0])

                setFormname({ name: '' });
                setForm({ deskripsi: '' });
                setValueawal(null);
                setValueakhir(null);
                setFilter('');
                setTimeStart(null);
                setTimeEnd(null);
                getDataEvent()
            })
            .catch(error => {
                console.log(error);
            });
    };

    const menuItems = [...new Set(menuFilter.map((item) => item.name_filter))];

    return (
        <div>
            <Button variant="contained" sx={{ width: '15vw' }} onClick={() => handleOpen()}>
                + Add new Event
            </Button>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby='modal-modal-title'
                aria-describedby='modal-modal-description'
            >
                <Box sx={style}>
                    <Typography id='modal-modal-description' sx={{ mt: 2 }}>
                        <FormControl fullWidth>
                            <TextField
                                id='outlined-static'
                                label='Judul'
                                variant='outlined'
                                sx={{ mb: 4 }}
                                value={formname.name}
                                name='name'
                                onChange={(event) => inputOnChangeHandler1(event)}
                            />
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
                                                    value={valueakhir || valueawal}
                                                    onChange={(newValueakhir) => {
                                                        setValueakhir(newValueakhir);
                                                    }}
                                                    renderInput={(params) => <TextField {...params} />}
                                                    disabled={!valueawal}
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
                                                    setTimeEnd(newTimeStart);
                                                    if (timeEnd && timeEnd <= newTimeStart) {
                                                        setTimeEnd(null);
                                                    }
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
                                                value={timeEnd || timeStart}
                                                onChange={(newTimeEnd) => {
                                                    setTimeEnd(newTimeEnd);
                                                }}
                                                renderInput={(params) => <TextField {...params} />}
                                                disabled={!timeStart}
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
                                        value={filter || 'Uncategorized'}
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
                                <Button variant="contained" sx={{ width: '15vw' }} onClick={() => onAddhandler()}>+ Add</Button>
                            </div>
                        </FormControl>
                    </Typography>
                </Box>
            </Modal>
        </div>
    );
};

