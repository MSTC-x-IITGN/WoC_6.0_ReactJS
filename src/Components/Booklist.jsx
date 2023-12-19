import {
    getFirestore,
    getDocs,
    addDoc,
    doc,
    updateDoc,
    collection,
    onSnapshot
} from 'firebase/firestore';
import { useFirebase } from '../Context/Firebase';
import { useEffect, useState } from 'react';
import { styled } from '@mui/material/styles';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import PaymentIcon from '@mui/icons-material/Payment';
import CancelIcon from '@mui/icons-material/Cancel';

import { useNavigate } from 'react-router-dom';

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

    const CancelBookList = (e) => {
        const path = 'User/' + firebase.UserID + '/BookList';
        const docRef = doc(db, path, e.id);
        updateDoc(docRef, {
            isPaid: false
        })
            .then(() => {
                console.log('Updated document:', e.id);
            })
            .catch((error) => {
                console.error('Error updating document: ', error);
            });
        console.log("Cancelled BookList...");
    };

    const payBookList = (e) => {
        const path = 'User/' + firebase.UserID + '/PayList';
        const colRef = collection(db, path);

        // const q = query(colRef, where("EmailId", "==", localEmail));
        // onSnapshot(q, (snapshot) => {
        //     let books = [];
        //     snapshot.docs.forEach((doc) => {
        //         books.push({ id: doc.id });
        //     });

        //     if (books.length > 0) {
        //         firebase.setUserID(books[0].id);
        //     }
        // });

        addDoc(colRef,
            { DataId: e.id }
        )
            .then(() => {
                console.log('added ispaid');
            })

        navigate("/payment");
    }
    useEffect(() => {
        console.log('Fetching documents...');
        if (firebase.UserID != undefined && firebase.UserID) {
            const path = 'User/' + firebase.UserID + '/BookList';
            const colRef = collection(db, path);

            const unsubscribe = onSnapshot(colRef, (snapshot) => {
                let books = [];
                snapshot.forEach((doc) => {
                    books.push({ ...doc.data(), id: doc.id });
                });

                setList(books);
                console.log('Fetched documents:', books);
            }, (error) => {
                console.error('Error getting documents:', error);
            });

            // Cleanup the listener when the component unmounts
            return () => unsubscribe();
        }
    }, [firebase.UserID]);

    return (
        <><Typography style={{ margin: 'auto', marginTop: "4%", marginBottom: "4%", width: '90%' }} variant="h4" gutterBottom>
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

                    <span style={{ margin: 'auto', marginTop: "2%", marginBottom: "2%", width: '80%' }}>
                        {myList.map((row, index) => (
                            <Accordion key={index} expanded={expanded === `panel${index}`} style={{ width: "90%", margin: "auto" }} onChange={handleChange(`panel${index}`)} sx={{ marginBottom: 2 }}>
                                <AccordionSummary
                                    expandIcon={<ExpandMoreIcon />}
                                    aria-controls="panel1bh-content"
                                    id="panel1bh-header"
                                >
                                    <Typography sx={{ width: '33%', flexShrink: 0 }}>
                                        {index + 1}
                                    </Typography>
                                    <Typography sx={{ color: 'text.secondary' }}>{row.FromText} -- {row.ToText} {row.isPaid ? 'Paid' : ''} </Typography>
                                </AccordionSummary>
                                <AccordionDetails>
                                    <Typography>
                                        <Box sx={{ width: '100%' }}>
                                            <Grid rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
                                                <Grid item xs={12}>
                                                    From : {row.FromText}
                                                </Grid>
                                                <Grid item xs={12}>
                                                    To : {row.ToText}
                                                </Grid>
                                                <Grid item xs={12}>
                                                    Date : {row.DateText}
                                                </Grid>
                                                <Grid item xs={12}>
                                                    Catagory : {row.Catagories}
                                                </Grid>
                                                <Grid item xs={12}>
                                                    TrainNumber : {row.TrainNumber}
                                                </Grid>
                                                <Grid item xs={12}>
                                                    TrainName : {row.TrainName}
                                                </Grid>
                                                <Grid item xs={12}>
                                                    DurationTime : {row.DurationTime}
                                                </Grid>
                                                <Grid item xs={12}>
                                                    ArrivalTime : {row.ArrivalTime}
                                                </Grid>
                                                <Grid item xs={12}>
                                                    DepartureTime : {row.DepartureTime}
                                                </Grid>
                                                <Grid item xs={12}>
                                                    AcChairCar : {row.AcChairCar ? 'Yes' : 'No'}
                                                </Grid>
                                                <Grid item xs={12}>
                                                    AC3Tier : {row.AC3Tier ? 'Yes' : 'No'}
                                                </Grid>
                                                <Grid item xs={12}>
                                                    ExecChairCar : {row.ExecChairCar ? 'Yes' : 'No'}
                                                </Grid>
                                                <Grid item xs={12}>
                                                    SecondSitting : {row.SecondSitting ? 'Yes' : 'No'}
                                                </Grid>
                                                <Grid item xs={12}>
                                                    Cost : {row.Cost}
                                                </Grid>
                                                <Grid item xs={12}>
                                                    BookedTime : {row.BookedTime}
                                                </Grid>
                                                <Grid item xs={4}>
                                                    {!row.isPaid ? (
                                                        <Button onClick={() => { payBookList(row) }} variant="contained" endIcon={<PaymentIcon />}>
                                                            PAY NOW
                                                        </Button>
                                                    ) : (
                                                        <Button onClick={() => { CancelBookList(row) }} variant="contained" color='error' endIcon={<CancelIcon />}>
                                                            Cancel Ticket
                                                        </Button>
                                                    )}
                                                </Grid>
                                            </Grid>
                                        </Box>
                                    </Typography>
                                </AccordionDetails>
                            </Accordion>
                        ))
                        }
                    </span>
                </>
            }</>
    )
}

export default Booklist;