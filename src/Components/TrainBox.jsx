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

    return (
        <>
            <Card sx={{ maxWidth: "90%", backgroundColor: "#f5fffd" }} className="mx-auto mt-5">
                <CardContent>
                    <Box sx={{ flexGrow: 1 }}>
                        <Grid container spacing={1}>
                            <Grid item xs={4}>
                                <Typography gutterBottom variant="h5" component="div">
                                    VANDE BHARAT EXP
                                </Typography>
                            </Grid>
                            <Grid item xs={4} sx={{ textAlign: 'center' }}>
                                Runs on: M T W T F S S
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
                                            <TableOfSchedule />
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
                                    08:00 | {capitalize(FromText)} | {DateText}
                                </Grid>
                                <Grid item xs={4} sx={{ textAlign: 'center' }}>
                                    --04:00--
                                </Grid>
                                <Grid item xs={4} sx={{ textAlign: 'right' }}>
                                    08:00 | {capitalize(ToText)} | {DateText}
                                </Grid>
                            </Grid>
                        </Box>
                    </Typography>
                    <Box sx={{ flexGrow: 1, marginTop: 1 }} >
                        <Grid container spacing={0.5}>
                            <Grid item xs={1}>
                                <Button variant="outlined" size="large">
                                    AC chair
                                </Button>
                            </Grid>
                            <Grid item xs={1}>
                                <Button variant="outlined" size="large">
                                    Exec chair
                                </Button>
                            </Grid>
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