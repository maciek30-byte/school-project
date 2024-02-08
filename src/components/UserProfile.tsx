import {useUser} from "../context/UserContext";
import React, {useEffect, useState} from "react";
import {
    Avatar,
    Box,
    Button,
    Card,
    CardContent,
    Grid,
    List,
    ListItem,
    ListItemAvatar, ListItemText,
    TextField,
    Typography
} from "@mui/material";
import {User} from "../models/appModels";
import {fetchUserById} from "../services/AppService";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";

const UserProfile: React.FC = () => {
    const {id, username, userInfo, setUserInfo, setUsername } = useUser();
    const [databaseUser, setDatabaseUser] = useState<User>({} as User);
    const [editInfo, setEditInfo] = useState({ ...userInfo, username});

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setEditInfo(prevState => ({ ...prevState, [name]: value }));
    };



    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setUserInfo(editInfo);
        setUsername(editInfo.username);
    };

    useEffect(() => {
        const loadData = async () => {
            const fetchedUser = await fetchUserById(id);
            setDatabaseUser(fetchedUser);
            setUserInfo({email: fetchedUser.email, address: fetchedUser?.website});
            setEditInfo({email: fetchedUser.email, address: fetchedUser?.website, username});

        };
        loadData();
    }, []);

    return (
        <Box sx={{ flexGrow: 1, m: 4 }}>
            <Grid container spacing={2}>
                <Card sx={{ maxWidth: 345, mt: 2 }}>
                    <CardContent>
                        <List>
                            <ListItem>
                                <ListItemAvatar>
                                    <Avatar>
                                        <AccountCircleIcon />
                                    </Avatar>
                                </ListItemAvatar>
                                <ListItemText primary="User Info" secondary={`Name: ${databaseUser.name}`} />
                            </ListItem>
                            <ListItem>
                                <ListItemText primary={`Email: ${userInfo.email}`} />
                            </ListItem>
                            <ListItem>
                                <ListItemText primary={`Username: ${username}`} />
                            </ListItem>
                            <ListItem>
                                <ListItemText primary={`Phone: ${databaseUser.phone}`} />
                            </ListItem>
                            <ListItem>
                                <ListItemText primary={`Website: ${databaseUser.website}`} />
                            </ListItem>
                            <ListItem>
                                <ListItemText primary={`User Id: ${databaseUser.id}`} />
                            </ListItem>
                        </List>
                    </CardContent>
                </Card>
                <Grid item xs={12} md={6}>
                    <Typography variant="h6">Edit Profile</Typography>
                    <form onSubmit={handleSubmit}>
                        <TextField
                            fullWidth
                            label="Username"
                            name="username"
                            value={editInfo.username}
                            onChange={handleChange}
                            margin="normal"
                        />
                        <TextField
                            fullWidth
                            label="Email"
                            name="email"
                            value={editInfo.email}
                            onChange={handleChange}
                            margin="normal"
                        />
                        <TextField
                            fullWidth
                            label="Website"
                            name="address"
                            value={editInfo.address}
                            onChange={handleChange}
                            margin="normal"
                        />
                        {/* Add other fields as needed */}
                        <Button type="submit" variant="contained" sx={{ mt: 2 }}>Save Changes</Button>
                    </form>
                </Grid>
            </Grid>
        </Box>
    );
};

export default UserProfile;