import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Box, Button, Grid, Paper, TextField } from '@mui/material';
import IntlMessages from '@crema/utility/IntlMessages';
import AppInfoView from '@crema/core/AppInfoView';
import { Fonts } from 'shared/constants/AppEnums';
import styled from '@emotion/styled';

const CenteredContainer = styled(Box)({
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
});

const Item = styled(Paper)(({ theme }) => ({
    ...theme.typography.body2,
    padding: theme.spacing(0),
    textAlign: 'center',
    color: theme.palette.text.secondary,
}));

const Login = () => {
    const [formUsername, setFormUsername] = useState({ username: '' });
    const [formPassword, setFormPassword] = useState({ password: '' });
    const [error, setError] = useState('');

    const navigate = useNavigate();

    const validateForm = () => {
        let isValid = true;

        if (!formUsername.username) {
            setError('Masukkan username.');
            isValid = false;
        } else if (!formPassword.password) {
            setError('Masukkan password.');
            isValid = false;
        } else if (formPassword.password.length !== 6) {
            setError('Password harus memiliki 6 huruf.');
            isValid = false;
        } else {
            setError('');
        }

        return isValid;
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (validateForm()) {
            const where_field = 'username~password';
            const where_value = formUsername.username + '~' + formPassword.password;

            const payload = {
                token: '6462d14bbd4ed7ca344ffbc3',
                project: 'calender',
                collection: 'user',
                appid: '6492ab85e1bb12965b3ee12a',
                where_field: where_field,
                where_value: where_value,
            };

            const url = `https://io.etter.cloud/v4/select_where/token/6462d14bbd4ed7ca344ffbc3/project/calender/collection/user/appid/6492ab85e1bb12965b3ee12a/where_field/${where_field}/where_value/${where_value}`;

            try {
                const response = await axios.get(url, payload);
                console.log(response);
                console.log(payload)
                if (response.data.length === 1) {
                    const userData = {
                        id: response.data[0]._id,
                        username: response.data[0].username,
                    };
                    localStorage.setItem('Calender', JSON.stringify(userData));
                    setFormUsername({ username: '' })
                    setFormPassword({ password: '' })
                    navigate('/GroupCalender');
                } else if (response.data.length === 0) {
                    setError('Anda belum terdaftar.');
                    setFormUsername({ username: '' })
                    setFormPassword({ password: '' })
                }
            } catch (error) {
                console.log(error);
            }
        }
    };

    return (
        <CenteredContainer>
            <Box sx={{ width: '30%', height: '50%' }}>
                <Grid item xs={6}>
                    <Item>
                        <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column', p: 5 }}>
                            <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
                                <Box sx={{ mb: { xs: 5, xl: 8 } }}>
                                    <TextField
                                        value={formUsername.username}
                                        name='username'
                                        onChange={(event) => setFormUsername({ username: event.target.value })}
                                        label='Username'
                                        variant='outlined'
                                        sx={{
                                            width: '100%',
                                            '& .MuiInputBase-input': {
                                                fontSize: 14,
                                            },
                                        }}
                                    />
                                </Box>
                                <Box sx={{ mb: { xs: 3, xl: 4 } }}>
                                    <TextField
                                        type='password'
                                        label='Password'
                                        value={formPassword.password}
                                        name='password'
                                        onChange={(event) => setFormPassword({ password: event.target.value })}
                                        variant='outlined'
                                        sx={{
                                            width: '100%',
                                            '& .MuiInputBase-input': {
                                                fontSize: 14,
                                            },
                                        }}
                                    />
                                </Box>
                                {error && <Box sx={{ color: 'red', mb: 3 }}>{error}</Box>}
                                <Box>
                                    <Button
                                        variant='contained'
                                        color='primary'
                                        type='submit'
                                        onClick={handleSubmit}
                                        sx={{
                                            minWidth: 160,
                                            fontWeight: Fonts.REGULAR,
                                            fontSize: 16,
                                            textTransform: 'capitalize',
                                            padding: '4px 16px 8px',
                                        }}
                                    >
                                        <IntlMessages id='common.login' />
                                    </Button>
                                </Box>
                            </Box>
                            <AppInfoView />
                        </Box>
                    </Item>
                </Grid>
            </Box>
        </CenteredContainer>
    );
};

export default Login;
