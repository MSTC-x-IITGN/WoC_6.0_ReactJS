import {
    getFirestore,
    getDocs,
    addDoc,
    doc,
    updateDoc,
    collection,
    onSnapshot,
    deleteDoc,
    where,
    query
} from 'firebase/firestore';
import { useFirebase } from '../Context/Firebase';
import { useEffect, useState } from 'react';
import { styled } from '@mui/material/styles';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';

import React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import PaymentIcon from '@mui/icons-material/Payment';
import CancelIcon from '@mui/icons-material/Cancel';

import { useNavigate } from 'react-router-dom';
import RemoveIcon from '@mui/icons-material/Remove';
import { Tune } from '@mui/icons-material';

import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';


const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
}));

function Booklist() {
    const [expanded, setExpanded] = React.useState(false);
    const [isPaid, setIsPaid] = useState(false);

    const handleChange = (panel) => (event, isExpanded) => {
        setExpanded(isExpanded ? panel : false);
    };

    const [myList, setList] = useState([]);
    const firebase = useFirebase();
    const db = getFirestore();
    const navigate = useNavigate();

    const removeFromBookList = (e) => {
        const path = 'User/' + firebase.UserID + '/SearchList';
        const colRef = collection(db, path);

        getDocs(colRef).then((snapshot) => {
            let upperbooks = [];
            snapshot.forEach((doc) => {
                upperbooks.push({ ...doc.data(), id: doc.id });
            });
            console.log('UPPERbooks2::::', upperbooks);

            let myListOfBook;
            upperbooks.forEach((element) => {
                if (element.id === e.SearchID) {
                    console.log('element.Trains : ', element);

                    element.Trains.forEach((ele) => {
                        if (ele.TrainNumber === e.TrainNumber) {
                            ele.isBooked = false;
                            ele.SearchIsPaid = false;
                            setIsPaid(false);
                        }
                    });
                    myListOfBook = element;
                }
            });
            console.log('myListOfBook...', myListOfBook);
            const docRef = doc(db, path, e.SearchID);
            updateDoc(docRef, {
                ...myListOfBook,
            })
                .then(() => {
                    console.log('Booked..');
                })
                .catch((error) => {
                    console.error('Error booked : ', error);
                });
        });
    };

    const handleEvent = (e) => {
        window.localStorage.setItem("PayID", e.SearchID);
        window.localStorage.setItem("TrainID", e.TrainNumber);

        if (!e.SearchIsPaid) {
            navigate("/payment");
        }
        else {
            navigate("/cancelticket");
        }
    }

    useEffect(() => {
        console.log('Fetching documents...');
        if (firebase.UserID != undefined && firebase.UserID) {

            const upperPath = 'User/' + firebase.UserID + '/SearchList';
            const upppercolRef = collection(db, upperPath);
            onSnapshot(upppercolRef, (snapshot) => {
                let upperbooks = [];
                snapshot.forEach((doc) => {
                    upperbooks.push({ ...doc.data(), id: doc.id });
                });
                console.log('UPPERbooks2::::', upperbooks);

                let upperBookedList = [];
                upperbooks.forEach((element) => {
                    const temp = {
                        SearchAllClasses: element.SearchAllClasses,
                        SearchCatagories: element.SearchCatagories,
                        SearchDateText: element.SearchDateText,
                        SearchFromText: element.SearchFromText,
                        SearchToText: element.SearchToText,
                        SearchID: element.id
                    }
                    element.Trains.forEach((ele) => {
                        if (ele.isBooked === true) {
                            upperBookedList.push({ ...temp, ...ele });
                        }
                    })
                })
                setList((prevList) => [...upperBookedList]);
            })
        }

    }, [firebase.UserID]);

    return (
        <><Typography style={{ margin: 'auto', marginTop: "4%", marginBottom: "4%", width: '90%' }} variant="h4">
            Booklist
        </Typography>
            {myList.length == 0 ?
                <>
                    <Card sx={{ maxWidth: 345, margin: 'auto' }}>
                        <CardMedia
                            sx={{ height: 350 }}
                            image="https://dm0qx8t0i9gc9.cloudfront.net/thumbnails/image/rDtN98Qoishumwih/empty-white-paper-sheet_zJwl80Lu_thumb.jpg"
                            title="green iguana"
                        />
                        <CardContent>
                            <Typography gutterBottom variant="h5" component="div">
                                EMPTY
                            </Typography>
                        </CardContent>
                    </Card>
                </>
                :
                <>
                    <Box sx={{ flexGrow: 1 }} style={{ margin: '4%' }}>
                        <Grid container spacing={2}>
                            {myList.map((row, index) => (
                                <Grid item xs={10}>
                                    <Accordion style={{ backgroundColor: 'ghostwhite' }}>
                                        <AccordionSummary
                                            expandIcon={<ExpandMoreIcon />}
                                            aria-controls="panel1a-content"
                                            id="panel1a-header"
                                        >
                                            <Typography>{index + 1}{')'}  {row.SearchFromText} to {row.SearchToText} , {row.SearchDateText} &nbsp;&nbsp;&nbsp;&nbsp;
                                                {row.SearchIsPaid && <Button variant="outlined" color='info'>
                                                    Paid
                                                </Button>}
                                            </Typography>
                                        </AccordionSummary>
                                        <AccordionDetails>
                                            <Typography>
                                                <Box sx={{ flexGrow: 1 }}>
                                                    <Grid container spacing={2}>
                                                        <Grid item xs={12}>
                                                            Train Name : {row.TrainName}
                                                        </Grid>
                                                        <Grid item xs={8}>
                                                            From : {row.SearchFromText}
                                                        </Grid>
                                                        <Grid item xs={8}>
                                                            To : {row.SearchToText}
                                                        </Grid>
                                                        <Grid item xs={8}>
                                                            Catagory : {row.SearchCatagories}
                                                        </Grid>
                                                        <Grid item xs={8}>
                                                            Date : {row.SearchDateText}
                                                        </Grid>
                                                        <Grid item xs={8}>
                                                            AllClasses : {row.SearchAllClasses}
                                                        </Grid>
                                                        <Grid item xs={8}>
                                                            TrainNumber : {row.TrainNumber}
                                                        </Grid>
                                                        <Grid item xs={8}>
                                                            AcChairCar : {row.JourneyClass.AcChairCar ? 'Yes' : 'No'}
                                                        </Grid>
                                                        <Grid item xs={8}>
                                                            AC3Tier : {row.JourneyClass.AC3Tier ? 'Yes' : 'No'}
                                                        </Grid>
                                                        <Grid item xs={8}>
                                                            ExecChairCar : {row.JourneyClass.ExecChairCar ? 'Yes' : 'No'}
                                                        </Grid>
                                                        <Grid item xs={8}>
                                                            SecondSitting : {row.JourneyClass.SecondSitting ? 'Yes' : 'No'}
                                                        </Grid>
                                                        <Grid item xs={8}>
                                                            Price : 100Rs.
                                                        </Grid>
                                                        <Grid item xs={8}>
                                                            <Button onClick={() => { handleEvent(row) }} variant="contained" color={!row.SearchIsPaid ? 'info' : 'error'} endIcon={!row.SearchIsPaid ? <PaymentIcon /> : <CancelIcon />}>
                                                                {!row.SearchIsPaid ? 'PAY NOW' : 'Cancel Ticket'}
                                                            </Button>
                                                        </Grid>
                                                        <Grid item xs={8}>
                                                            <Button onClick={() => { removeFromBookList(row) }}
                                                                variant="outlined"
                                                                color='inherit'
                                                                style={{ display: !row.SearchIsPaid ? 'block' : 'none' }}
                                                            >
                                                                Remove Item <RemoveIcon />
                                                            </Button>
                                                        </Grid>
                                                    </Grid>
                                                </Box>
                                            </Typography>
                                        </AccordionDetails>
                                    </Accordion>
                                </Grid>
                            ))}
                        </Grid>
                    </Box>
                </>
            }</>
    )
}

export default Booklist;