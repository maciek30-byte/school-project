import React, { useEffect, useState } from 'react';
import {fetchAlbums, fetchUsers} from "../services/AppService";
import {
    Accordion, AccordionDetails, AccordionSummary,
    Box,
    FormControl,
    InputLabel,
    MenuItem,
    Select,
    SelectChangeEvent,
    Typography
} from '@mui/material';

import {Album, User} from "../models/appModels";
import {useNavigate} from "react-router-dom";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import AlbumDetail from "./AlbumDetails";

const Albums: React.FC = () => {
    const navigate = useNavigate();
    const [albums, setAlbums] = useState<Album[]>([]);
    const [users, setUsers] = useState<User[]>([]);
    const [selectedUserId, setSelectedUserId] = useState('');

    const handleFilterChange = (event: SelectChangeEvent<string>) => {
        setSelectedUserId(event.target.value);

    };

    useEffect(() => {
        const loadData = async () => {
            const fetchedUsers = await fetchUsers();
            setUsers(fetchedUsers);

            const fetchedAlbums = await fetchAlbums(Number(selectedUserId));
            setAlbums(fetchedAlbums);
        };
        loadData();
    }, [selectedUserId]);

    return (
        <Box sx={{alignItems: 'center',}}>
            <Box sx={{m: 4}}>
                <FormControl fullWidth>
                    <InputLabel id="user-filter-label">Filter by User</InputLabel>
                    <Select
                        labelId="user-filter-label"
                        value={selectedUserId}
                        label="Filter by User"
                        onChange={handleFilterChange}
                    >
                        <MenuItem value="">
                            <em>None</em>
                        </MenuItem>
                        {users.map((user) => (
                            <MenuItem key={user.id} value={user.id}>{user.name}</MenuItem>
                        ))}
                    </Select>
                </FormControl>
            </Box>

            <div>
                {albums.map((album) => (
                    <Accordion key={album.id}>
                        <AccordionSummary expandIcon={<ExpandMoreIcon/>}>
                            <Typography>Album {album.id}: {album.title}</Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            <AlbumDetail albumId={album.id}/>
                        </AccordionDetails>
                    </Accordion>
                ))}
            </div>
        </Box>
    );
};

export default Albums;
