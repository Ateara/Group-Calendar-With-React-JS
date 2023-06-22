import React, { useEffect } from 'react';
import Grid from '@mui/material/Grid';
import AppGridContainer from '@crema/core/AppGridContainer';
import Paper from '@mui/material/Paper';
import { styled } from '@mui/material/styles';
import { Box, Button } from '@mui/material';
import BigCalender from './bigCalender';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import MiniCalender from './miniCalender';
import ModalNewFilter from './modal_add_new_category';
import Filtered from './filtered';
import { useDispatch } from 'react-redux';
import { setEvents, setFilteredEvents } from 'redux/actions/index';
import ModalAddAgenda from './modal_add_agenda';

const Item = styled(Paper)(({ theme }) => ({
    ...theme.typography.body2,
    padding: theme.spacing(0),
    textAlign: 'center',
    color: theme.palette.text.secondary,
}));

const Calender = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
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
    }, []);


    const logout = () => {
        localStorage.clear();
        navigate('/');
    };


    return (
        <>
            <Box sx={{ width: '100%', p: 5 }}>
                <Grid>
                    <Grid item xs={12}>
                        <Item sx={{ p: 4, display: 'flex', justifyContent: 'space-between' }}>
                            <h1>My Calendar</h1>
                            <Button onClick={logout}>Logout</Button>
                        </Item>
                    </Grid>
                </Grid>
            </Box>
            <AppGridContainer sx={{ p: 5 }}>
                <Grid item xs={3}>
                    <Item>
                        <Grid sx={{ padding: '15px', paddingTop: '20px', paddingBottom: '10px' }}>
                            <ModalAddAgenda />
                        </Grid>
                        <Grid>
                            <MiniCalender />
                        </Grid>
                        <Grid sx={{ minHeight: '20vh', p: 5, pt: 0 }}>
                            <Box sx={{ flexGrow: 1 }}>
                                <Grid container spacing={2}>
                                    <Grid item xs={8}>
                                        <Item>
                                            <h3 style={{ padding: '5px' }}>Category</h3>
                                        </Item>
                                    </Grid>
                                    <Grid item xs={4}>
                                        <Item>
                                            <ModalNewFilter />
                                        </Item>
                                    </Grid>
                                </Grid>
                            </Box>
                            <Box>
                                <Filtered />
                            </Box>
                        </Grid>
                    </Item>
                </Grid>
                <Grid item xs={9}>
                    <Item>
                        <Grid>
                            <BigCalender />
                        </Grid>
                    </Item>
                </Grid>
            </AppGridContainer>

        </>
    );
};

export default Calender;
