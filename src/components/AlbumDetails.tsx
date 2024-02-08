import React, {useEffect, useState} from 'react';
import { Card, CardContent, CardMedia, Grid, Typography} from '@mui/material';
import {Photo} from "../models/appModels";
import {fetchPhotos} from "../services/AppService";

interface AlbumDetailsProps {
    albumId: number;
}

const AlbumDetail: React.FC<AlbumDetailsProps> = ({albumId}) => {
    const [photos, setPhotos] = useState<Photo[]>([]);

    useEffect(() => {
        const loadData = async () => {
            const fetchedPhotos = await fetchPhotos(`albumId=${albumId}&_limit=25`);
            setPhotos(fetchedPhotos);
        };
        loadData();
    }, []);

    return (
        <Grid container spacing={2}>
            {photos.map((photo) => (
                <Grid item xs={12} sm={6} md={4} key={photo.id}>
                    <Card>
                        <CardMedia
                            component="img"
                            height="140"
                            image={photo.thumbnailUrl}
                            alt={photo.title}
                        />
                        <CardContent>
                            <Typography variant="body2" color="text.secondary">
                                {photo.title}
                            </Typography>
                        </CardContent>
                    </Card>
                </Grid>
            ))}
        </Grid>
    );
};

export default AlbumDetail;
