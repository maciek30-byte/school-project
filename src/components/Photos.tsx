import React, { useEffect, useState } from 'react';
import {fetchUserPhotos} from "../services/AppService";
import {useUser} from "../context/UserContext";
import {Card, CardContent, CardMedia, Grid, Typography} from "@mui/material";
import {Photo} from "../models/appModels";

const Photos: React.FC = () => {
    const [photos, setPhotos] = useState<Photo[]>([]);
    const { id } = useUser();

    useEffect(() => {
        const fetchPhotos = async () => {
            const data = await fetchUserPhotos(id)
            setPhotos(data);
        };

        fetchPhotos();
    }, []);

    return (
        <Grid sx={{ m: 4 }} container spacing={2}>
            {photos.map((photo) => (
                <Grid item xs={12} sm={6} md={4} key={photo.id}>
                    <Card>
                        <CardMedia
                            component="img"
                            height="300"
                            image={photo.url}
                            alt={photo.title}
                        />
                        <CardContent>
                            <Typography variant="body2" color="text.secondary">Title: {photo.title}</Typography>
                            <Typography variant="body2" color="text.secondary">Id: {photo.id}</Typography>
                            <Typography variant="body2" color="text.secondary">AlbumId: {photo.albumId}</Typography>
                        </CardContent>
                    </Card>
                </Grid>
            ))}
        </Grid>
    );
};

export default Photos;
