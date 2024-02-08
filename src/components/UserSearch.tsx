import React, { useState } from 'react';
import {
    Box,
    TextField,
    Button,
    Typography,
    CircularProgress,
    ListItemText,
    ListItem,
    List,
    ListItemAvatar,
    Avatar,
    CardContent, Card
} from '@mui/material';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import {fetchUsers} from "../services/AppService";
const UserSearch: React.FC = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [user, setUser] = useState<any>(null);
    const [loading, setLoading] = useState(false);
    const [noUserFound, setNoUserFound] = useState(false);

    const handleSearch = async () => {
        setLoading(true);
        setNoUserFound(false); // Reset the no user found message before each search
        const data = await fetchUsers(searchTerm);
        setLoading(false);

        if (data.length > 0) {
            setUser(data[0]);
        } else {
            setUser(null);
            setNoUserFound(true); // Set the flag to true if no user is found
        }
    };

    return (
        <Box sx={{ p: 2 }}>
            <TextField
                label="Search User by Name"
                variant="outlined"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                fullWidth
                sx={{ mb: 2 }}
            />
            <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                <Box sx={{ alignSelf: 'flex-start' }}>
                    <Button onClick={handleSearch} disabled={loading}>Search</Button>
                </Box>
                {loading && <CircularProgress size={24} sx={{ mt: 2 }} />}
            </Box>
            {!loading && noUserFound && <Typography sx={{ m: 2 }}>No user found.</Typography>}
            {user && (
                <Card sx={{ maxWidth: 345, mt: 2 }}>
                    <CardContent>
                        <List>
                            <ListItem>
                                <ListItemAvatar>
                                    <Avatar>
                                        <AccountCircleIcon />
                                    </Avatar>
                                </ListItemAvatar>
                                <ListItemText primary="User Info" secondary={`Name: ${user.name}`} />
                            </ListItem>
                            <ListItem>
                                <ListItemText primary={`Email: ${user.email}`} />
                            </ListItem>
                            <ListItem>
                                <ListItemText primary={`Username: ${user.username}`} />
                            </ListItem>
                            <ListItem>
                                <ListItemText primary={`Phone: ${user.phone}`} />
                            </ListItem>
                            <ListItem>
                                <ListItemText primary={`Website: ${user.website}`} />
                            </ListItem>
                            <ListItem>
                                <ListItemText primary={`User Id: ${user.id}`} />
                            </ListItem>
                        </List>
                    </CardContent>
                </Card>
            )}
        </Box>
    );
};

export default UserSearch;
