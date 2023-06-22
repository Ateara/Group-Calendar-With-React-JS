import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { TextField } from '@mui/material';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { setMenuFilter } from 'redux/actions/index';


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

export default function ModalNewFilter() {
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const [formname, setFormname] = React.useState({ name: '' });

    const dispatch = useDispatch();


    const inputOnChangeHandler1 = event => {
        setFormname({ [event.target.name]: event.target.value });
    };

    const userDataJSON = localStorage.getItem('Calender');
    const userData = JSON.parse(userDataJSON);
    const id = userData.id;

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

    const onAddhandler = () => {
        handleClose();
        const payload = {
            token: '6462d14bbd4ed7ca344ffbc3',
            project: 'calender',
            collection: 'filter',
            appid: '6492ab85e1bb12965b3ee12a',
            name_filter: formname.name,
            user_id: id,
        };

        const url = 'https://io.etter.cloud/v4/insert';
        axios.post(url, payload)
            .then(response => {
                console.log(response);
                setFormname({ name: '' });
                // window.location.reload()
                getDataFilter()
            })
            .catch(error => {
                console.log(error);
            });
    };


    return (
        <div>
            <Button onClick={handleOpen}>+</Button>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby='modal-modal-title'
                aria-describedby='modal-modal-description'
            >
                <Box sx={style}>
                    <Typography id='modal-modal-title' variant='h6' component='h2'>
                        Add New Category
                    </Typography>
                    <Box
                        sx={{
                            width: 500,
                            maxWidth: '100%',
                        }}
                    >
                        <TextField
                            fullWidth id='fullWidth'
                            value={formname.name}
                            name='name'
                            onChange={(event) => inputOnChangeHandler1(event)} />
                        <div style={{ padding: '10px', paddingRight: 0, textAlign: 'end' }}>
                            <Button variant="contained" sx={{ width: '10vw' }} onClick={() => onAddhandler()}>Save</Button>
                        </div>
                    </Box>
                </Box>

            </Modal>
        </div>
    );
}