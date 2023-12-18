import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { Button, CardActionArea, CardActions, capitalize } from '@mui/material';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import AddIcon from '@mui/icons-material/Add';
import DirectionsSubwayIcon from '@mui/icons-material/DirectionsSubway';
//
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
//
import TableOfSchedule from './TableOfSchedule.jsx';
import { useNavigate } from 'react-router-dom';
//
import trains from './AllTrainDetail';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';



const BootstrapDialog = styled(Dialog)(({ theme }) => ({
    '& .MuiDialogContent-root': {
        padding: theme.spacing(2),
    },
    '& .MuiDialogActions-root': {
        padding: theme.spacing(1),
    },
}));



function TrainBox(props) {
    const navigate = useNavigate();
    const { FromText = '', ToText = '', DateText = '' } = props.data || {};
    const capitalize = (str) => {
        str = str.toLowerCase();
        return str ? str.charAt(0).toUpperCase() + str.slice(1) : '';
    }

    const [open, setOpen] = React.useState(false);

    const getRandomInt = (min, max) => Math.floor(Math.random() * (max - min) + min);
    const index = getRandomInt(0, 99);;
    const handleClickOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };

    const navigateToPayment = (e) => {
        e.preventDefault();
        navigate("/payment");
    }

    const addToBookList = () => {
    }
    function calculateTimeDuration(startTime, endTime) {
        const [startHour, startMinute] = startTime.split(":").map(Number);
        const [endHour, endMinute] = endTime.split(":").map(Number);

        // Convert the time values to minutes
        const startTimeInMinutes = startHour * 60 + startMinute;
        const endTimeInMinutes = endHour * 60 + endMinute;

        // Calculate the time duration in minutes
        const durationInMinutes = endTimeInMinutes - startTimeInMinutes;

        // Convert the duration back to hours and minutes
        const durationHours = Math.floor(durationInMinutes / 60);
        const durationMinutes = durationInMinutes % 60;
        const formattedDuration = `${String(durationHours).padStart(2, '0')}:${String(durationMinutes).padStart(2, '0')}`;

        return formattedDuration;
    }


    return (
        <>
            <Card sx={{ maxWidth: "90%", backgroundColor: "#f5fffd" }} className="mx-auto mt-5">
                <CardContent>
                    <Box sx={{ flexGrow: 1 }}>
                        <Grid container spacing={1}>
                            <Grid item xs={4}>
                                <Typography gutterBottom variant="h4" component="div">
                                    {trains[index].TrainName}
                                </Typography>
                            </Grid>
                            <Grid item xs={4} sx={{ textAlign: 'center' }}>
                                Runs on:
                                <Box sx={{ display: 'inline-flex', gap: '2px', alignItems: 'center' }}>
                                    {trains[index].RunsOn.Monday ?
                                        <Button sx={{ fontSize: '0.9rem', width: '0.1%' }}>
                                            M
                                        </Button>
                                        :
                                        <Button sx={{ fontSize: '0.9rem' }} disabled>
                                            M
                                        </Button>
                                    } {trains[index].RunsOn.Tuesday ?
                                        <Button sx={{ fontSize: '0.9rem' }}>
                                            T
                                        </Button>
                                        :
                                        <Button sx={{ fontSize: '0.9rem' }} disabled>
                                            T
                                        </Button>
                                    } {trains[index].RunsOn.Wednesday ?
                                        <Button sx={{ fontSize: '0.9rem' }}>
                                            W
                                        </Button>
                                        :
                                        <Button sx={{ fontSize: '0.9rem' }} disabled>
                                            W
                                        </Button>
                                    } {trains[index].RunsOn.Thursday ?
                                        <Button sx={{ fontSize: '0.9rem' }}>
                                            T
                                        </Button>
                                        :
                                        <Button sx={{ fontSize: '0.9rem' }} disabled>
                                            T
                                        </Button>
                                    } {trains[index].RunsOn.Friday ?
                                        <Button sx={{ fontSize: '0.9rem' }}>
                                            F
                                        </Button>
                                        :
                                        <Button sx={{ fontSize: '0.9rem' }} disabled>
                                            F
                                        </Button>
                                    } {trains[index].RunsOn.Saturday ?
                                        <Button sx={{ fontSize: '0.9rem' }}>
                                            S
                                        </Button>
                                        :
                                        <Button sx={{ fontSize: '0.9rem' }} disabled>
                                            S
                                        </Button>
                                    } {trains[index].RunsOn.Sunday ?
                                        <Button sx={{ fontSize: '0.9rem' }}>
                                            S
                                        </Button>
                                        :
                                        <Button sx={{ fontSize: '0.9rem' }} disabled>
                                            S
                                        </Button>
                                    }
                                </Box>
                            </Grid>
                            <Grid item xs={4} sx={{ textAlign: 'right' }}>
                                <React.Fragment>
                                    <Button variant="outlined" onClick={handleClickOpen}>
                                        Train schedule
                                    </Button>
                                    <BootstrapDialog
                                        onClose={handleClose}
                                        aria-labelledby="customized-dialog-title"
                                        open={open}
                                    >
                                        <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
                                            Modal title
                                        </DialogTitle>
                                        <IconButton
                                            aria-label="close"
                                            onClick={handleClose}
                                            sx={{
                                                position: 'absolute',
                                                right: 8,
                                                top: 8,
                                                color: (theme) => theme.palette.grey[500],
                                            }}
                                        >
                                            <CloseIcon />
                                        </IconButton>
                                        <DialogContent dividers>
                                            <TableOfSchedule data={index} />
                                        </DialogContent>
                                        <DialogActions>
                                        </DialogActions>
                                    </BootstrapDialog>
                                </React.Fragment>

                            </Grid>
                        </Grid>
                    </Box>
                    <Typography sx={{ marginTop: 0.5 }} variant="h6" color="text.secondary">
                        <Box sx={{ flexGrow: 1 }}>
                            <Grid container spacing={2}>
                                <Grid item xs={4}>
                                    {trains[index].Stations[0].ArrivalTime} | {capitalize(FromText)} | {DateText}
                                </Grid>
                                <Grid item xs={4} sx={{ textAlign: 'center' }}>
                                    -- {calculateTimeDuration(trains[index].Stations[0].ArrivalTime, trains[index].Stations[0].DepartureTime)} --
                                </Grid>
                                <Grid item xs={4} sx={{ textAlign: 'right' }}>
                                    {trains[index].Stations[0].DepartureTime} | {capitalize(ToText)} | {DateText}
                                </Grid>
                            </Grid>
                        </Box>

                    </Typography>
                    <Box sx={{ flexGrow: 1, marginTop: 1 }} >
                        <Grid container spacing={1}>
                            {trains[index].JourneyClass.AC3Tier ?
                                <Grid item xs={1}>
                                    <Button variant="outlined" size="large">
                                        AC3 Tier
                                    </Button>
                                </Grid> :
                                <Grid item xs={1}>
                                    <Button variant="outlined" size="large">
                                        Second Sitting
                                    </Button>
                                </Grid>
                            }
                            {trains[index].JourneyClass.AcChairCar ?
                                <Grid item xs={1}>
                                    <Button variant="outlined" size="large">
                                        AcChair Car
                                    </Button>
                                </Grid>
                                :
                                <Grid item xs={1}>
                                    <Button variant="outlined" size="large">
                                        Exec chair
                                    </Button>
                                </Grid>
                            }
                        </Grid>
                    </Box>
                </CardContent>
                <CardActions>
                    <Button onClick={addToBookList} variant="outlined" endIcon={<AddIcon />}>
                        Add to BookList
                    </Button>
                    <Button onClick={navigateToPayment} variant="outlined" endIcon={<DirectionsSubwayIcon />}>
                        Book
                    </Button>
                </CardActions>
            </Card >
        </>
    )
}

export default TrainBox;