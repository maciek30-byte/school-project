import React from 'react';
import {Tabs, Tab, Box, Typography} from '@mui/material';
import { useState } from 'react';
import UserProfile from '../../components/UserProfile';
import Photos from '../../components/Photos';
import Albums from "../../components/Albums";
import {useUser} from "../../context/UserContext";
import UserSearch from "../../components/UserSearch";
import PhotoSearch from "../../components/PhotoSearch";
import AllPosts from "../../components/AllPosts";

const HomePage: React.FC = () => {
    const [value, setValue] = useState(0);
    const { id, username } = useUser();

    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        setValue(newValue);
    };

    return (
        <Box sx={{ flexGrow: 1 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', paddingLeft: 2 }}>
                <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                    Welcome { username }
                </Typography>
            <Tabs value={value} onChange={handleChange} centered>
                <Tab label="All Posts" />
                <Tab label="All Albums" />
                <Tab label="My Profile" />
                <Tab label="My Photos" />
                <Tab label="My Posts" />
                <Tab label="User Search" />
                <Tab label="Photo Search" />
            </Tabs>
            </Box>
            {value === 0 && <AllPosts />}
            {value === 1 && <Albums />}
            {value === 2 && <UserProfile />}
            {value === 3 && <Photos />}
            {value === 4 && <AllPosts isUserOnly={true} />}
            {value === 5 && <UserSearch />}
            {value === 6 && <PhotoSearch />}
        </Box>
    );
};

export default HomePage;
