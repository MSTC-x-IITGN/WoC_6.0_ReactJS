import React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import { createTheme, ThemeProvider } from '@mui/material/styles';

import TrainImg3 from '../images/image3.jpg';
import TrainImg13 from '../images/image13.jpg';
import TrainImg14 from '../images/image14.jpg';

import {
    Container,
    Grid,
    Typography,
    TextField,
    Button,
    FormControlLabel,
    RadioGroup,
    Radio,
    FormLabel,
    Select,
    MenuItem,
} from '@mui/material';
import '../CSS/Title.css';

function Title() {
    return (
        <div className='my-title' style={{
            background: 'linear-gradient(to bottom, rgba(255, 255, 255), rgb(236, 236, 236))',
            borderBottomLeftRadius: ['0em', '16em', '32em'],
            borderBottomRightRadius: ['0em', '16em', '32em'],
            height: 'auto',
            minHeight: '86vh',
            overflow: 'hidden',
            paddingBottom: ['4em', '8em', '16em'],
        }}>
            <Container sx={{ p: [4, 6, 9] }}>
                <Grid container justifyContent="center" alignItems="center" spacing={3}>
                    <Grid item xs={12} md={6} mb={4}>
                        <Typography variant="h2" sx={{ textAlign: 'center' }}>
                            Welcome,
                        </Typography>
                        <Typography variant="body1" component="div" sx={{ width: '100%', textAlign: 'center' }}>
                            Revolutionize your travel experience with our train travel website, offering seamless booking, real-time updates, and curated itineraries. Explore the world by rail, where every journey is a story waiting to be written.
                        </Typography>
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <Card sx={{ maxWidth: '100%', justifyContent: 'center', textAlign: 'center', marginBottom: ['-2em', '-3em', '-5em'] }}>
                            <CardMedia
                                component="img"
                                alt="profile"
                                height="100"
                                image={TrainImg14}
                                style={{ maxWidth: '100%', height: 'auto' }}
                            />
                        </Card>
                    </Grid>
                </Grid>
            </Container>
        </div>
    );
}

export default Title;
