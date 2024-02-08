import React, { useState } from 'react';
import {
    Box,
    TextField,
    Button,
    Typography,
    Radio,
    RadioGroup,
    FormControlLabel,
    FormControl,
    FormLabel,
    Grid, Card, CardMedia, CardContent
} from '@mui/material';
import {fetchPhotos} from "../services/AppService";

const PhotoSearch: React.FC = () => {
    const [searchType, setSearchType] = useState('photoId');
    const [searchValue, setSearchValue] = useState('');
    const [photos, setPhotos] = useState<any[]>([]); // State to hold an array of photos

    const handleSearch = async () => {
        let query = searchType === 'photoId' ? `id=${searchValue}` : `albumId=${searchValue}`;
        const data = await fetchPhotos(query);
        setPhotos(data);
    };

    return (
        <Box sx={{ p: 2 }}>
            <FormControl component="fieldset">
                <FormLabel component="legend">Search By</FormLabel>
                <RadioGroup row aria-label="search-by" name="search-by" value={searchType} onChange={(e) => { setSearchType(e.target.value); setSearchValue(''); }}>
                    <FormControlLabel value="photoId" control={<Radio />} label="Photo ID" />
                    <FormControlLabel value="albumId" control={<Radio />} label="Album ID" />
                </RadioGroup>
            </FormControl>
            <TextField
                label={searchType === 'photoId' ? "Search by Photo ID" : "Search by Album ID"}
                variant="outlined"
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
                fullWidth
                sx={{ mb: 2 }}
            />
            <Button onClick={handleSearch} sx={{ mt: 2, mb: 2 }}>Search</Button>
            <Grid container spacing={2}>
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
            {/*{photos.map((photo, index) => (*/}
            {/*    <Box key={index} sx={{ mt: 2 }}>*/}
            {/*        <Typography variant="h6">Photo Details</Typography>*/}
            {/*        <Typography>Title: {photo.title}</Typography>*/}
            {/*        <Typography>Id: {photo.id}</Typography>*/}
            {/*        <Typography>AlbumId: {photo.albumId}</Typography>*/}
            {/*        <img src={photo.url} alt={photo.title} style={{ maxWidth: '100%', marginBottom: '10px' }} />*/}
            {/*    </Box>*/}
            {/*))}*/}
        </Box>
    );
};

export default PhotoSearch;
