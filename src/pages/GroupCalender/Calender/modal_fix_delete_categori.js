import * as React from 'react';
import { Box, IconButton, Tooltip } from "@mui/material";
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import DeleteIcon from '@mui/icons-material/Delete';
import axios from 'axios';
import PropTypes from 'prop-types';
import { setEvents, setFilteredEvents, setMenuFilter } from 'redux/actions';
import { useDispatch } from 'react-redux';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

export default function ModalDelete({ Val }) {
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const dispatch = useDispatch()

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

    const getDataFilter = () => {
        const userDataJSON = localStorage.getItem('Calender');
        const userData = JSON.parse(userDataJSON);
        const id = userData.id;
        const payload = {
            token: '6462d14bbd4ed7ca344ffbc3',
            project: 'calender',
            collection: 'filter',
            appid: '6492ab85e1bb12965b3ee12a',
            where_field: 'user_id',
            where_value: id
        };
        const url = `https://io.etter.cloud/v4/select_where/token/6462d14bbd4ed7ca344ffbc3/project/calender/collection/filter/appid/6492ab85e1bb12965b3ee12a/where_field/user_id/where_value/${id}`;

        axios.get(url, payload)
            .then((response) => {
                dispatch(setMenuFilter(response.data))
            })
            .catch((error) => {
                console.log(error);
            });
    }

    const deleteButtonHandler = (Val) => {
        const url = `https://io.etter.cloud/v4/remove_where/token/6462d14bbd4ed7ca344ffbc3/project/calender/collection/filter/appid/6492ab85e1bb12965b3ee12a/where_field/name_filter/where_value/${Val}`;
        const payload = {
            token: '6462d14bbd4ed7ca344ffbc3',
            project: 'calender',
            collection: 'filter',
            appid: '6492ab85e1bb12965b3ee12a',
            where_field: 'name_filter',
            where_value: Val,
        };
        axios
            .delete(url, { data: payload })
            .then((response) => {
                console.log(response);
                console.log(Val);
                handleClose()
                getDataFilter()
                getDataEvent()
            })
            .catch((error) => {
                console.log(error);
            });
    };

    const updateCategoriez = (Val) => {
        const url = 'https://io.etter.cloud/v4/update_where'
        const payload = {
            where_field: 'filter',
            where_value: Val,
            update_field: 'filter',
            update_value: 'Uncategorized',
            token: '6462d14bbd4ed7ca344ffbc3',
            project: 'calender',
            collection: 'event',
            appid: '6492ab85e1bb12965b3ee12a',
        }
        axios.put(url, payload)
            .then((response) => {
                // window.location.reload()
                console.log(response);
                deleteButtonHandler(Val)
                handleClose();
                getDataFilter()
                getDataEvent()
            })
            .catch((error) => console.log(error));
    }

    return (
        <div>
            <Button onClick={handleOpen}>
                <Tooltip title='Delete'>
                    <IconButton>
                        <DeleteIcon />
                    </IconButton>
                </Tooltip>
            </Button>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby='modal-modal-title'
                aria-describedby='modal-modal-description'
            >
                <Box sx={style}>
                    <Typography id='modal-modal-title' variant='h6' component='h2'>
                        Are You Sure To Delete This?
                    </Typography>
                    <Box
                        sx={{
                            width: 500,
                            maxWidth: '100%',
                        }}
                    >
                        <div style={{ padding: '10px', textAlign: 'center' }}>
                            <Button variant="contained" sx={{ width: '10vw', marginRight: '5px' }} onClick={() => updateCategoriez(Val)}>Yes</Button>
                            <Button variant="contained" sx={{ width: '10vw', backgroundColor: 'red' }} onClick={() => handleClose()}>No</Button>
                        </div>
                    </Box>
                </Box>

            </Modal>
        </div>
    );
}

ModalDelete.propTypes = {
    Val: PropTypes.string,
};