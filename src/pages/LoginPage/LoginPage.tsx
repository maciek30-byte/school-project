import { useUser } from '../../context/UserContext';
import React, {useState} from 'react';
import { useNavigate } from 'react-router-dom';
import {Button, TextField, Box, Typography} from '@mui/material';

const LoginPage: React.FC = () => {
    const navigate = useNavigate();
    const { setUsername, username, password, setPassword } = useUser();
    const [usernameError, setUsernameError] = useState(false);
    const [passwordError, setPasswordError] = useState(false);

    const validateForm = () => {
        let isValid = true;
        if (!username) {
            setUsernameError(true);
            isValid = false;
        } else {
            setUsernameError(false);
        }

        if (!password) {
            setPasswordError(true);
            isValid = false;
        } else {
            setPasswordError(false);
        }

        return isValid;
    };

    const handleLogin = () => {
        if (validateForm()) {
            // Proceed with the login logic if the form is valid
            console.log('Logging in with', username, password);
            navigate('/home');

        }
    };

    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: '20vh' }}>
            <Typography variant="h4" component="h1" gutterBottom>
                Fake Login Page
            </Typography>
            <TextField
                error={usernameError}
                helperText={usernameError ? "Username is required" : ""}
                label="Username"
                variant="outlined"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                margin="normal"
            />
            <TextField
                error={passwordError}
                helperText={passwordError ? "Password is required" : ""}
                label="Password"
                type="password"
                variant="outlined"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                margin="normal"
            />
            <Button variant="contained" onClick={handleLogin} sx={{ marginTop: 2 }}>
                Login
            </Button>
        </Box>
    );
};

export default LoginPage;
