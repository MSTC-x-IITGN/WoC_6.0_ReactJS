import React, { useState } from 'react';
import { Button, TextField, Grid, Container, MenuItem, Typography } from '@mui/material';
import {
    getFirestore,
    collection,
    getDocs,
    updateDoc,
    doc,
    snapshot,
    query,
    where,
    deleteDoc,
    onSnapshot
} from 'firebase/firestore';
import { useFirebase } from '../Context/Firebase';
import { useNavigate } from 'react-router-dom';

const countries = [
    { value: 'us', label: 'United States' },
    { value: 'ca', label: 'Canada' },
    // Add more countries as needed
];

const PaymentForm = () => {
    const [cardNumber, setCardNumber] = useState('');
    const [expiryDate, setExpiryDate] = useState('');
    const [cvc, setCvc] = useState('');
    const [selectedCountry, setSelectedCountry] = useState('');

    const firebase = useFirebase();
    const db = getFirestore();
    const navigate = useNavigate();

    const handleCardNumberChange = (e) => {
        // const input = e.target.value.replace(/\D/g, ''); // Remove non-numeric characters
        // let formattedCardNumber = '';

        // for (let i = 0; i < input.length; i += 4) {
        //     formattedCardNumber += input.slice(i, i + 4) + ' ';
        // }

        // setCardNumber(formattedCardNumber.trim());
    };

    const handleCvcChange = (e) => {
        // const input = e.target.value.replace(/\D/g, '').slice(0, 3); // Remove non-numeric characters and limit to 3 digits
        // setCvc(input);
    };

    const handlePayment = () => {

        const searchID = window.localStorage.getItem("PayID");
        const trainID = window.localStorage.getItem("TrainID");
        window.localStorage.removeItem("PayID");
        window.localStorage.removeItem("TrainID");


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
                if (element.id == searchID) {
                    console.log('element.Trains : ', element);
                    element.Trains.forEach((ele) => {
                        if (ele.TrainNumber === trainID) {
                            ele.SearchIsPaid = true;
                        }
                    })
                    myListOfBook = element;
                }
            })
            console.log('myListOfBook...', myListOfBook);
            const docRef = doc(db, path, searchID);
            updateDoc(docRef, {
                ...myListOfBook
            })
                .then(() => {
                    console.log('Booked..');
                })
                .catch((error) => {
                    console.error('Error booked : ', error);
                });
        })
        navigate("/booklist");
    };

    return (
        <Container maxWidth="sm" style={{ marginTop: '10%', marginBottom: '10%' }}>
            <Typography variant="h4" gutterBottom>
                Payment Details
            </Typography>
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <TextField
                        label="Card Number"
                        variant="outlined"
                        fullWidth
                        value={cardNumber}
                        onChange={handleCardNumberChange}
                    />
                </Grid>
                <Grid item xs={6}>
                    <TextField
                        label="Expiry Date"
                        variant="outlined"
                        fullWidth
                        value={expiryDate}
                        onChange={(e) => setExpiryDate(e.target.value)}
                    />
                </Grid>
                <Grid item xs={6}>
                    <TextField
                        label="CVC"
                        variant="outlined"
                        fullWidth
                        value={cvc}
                        onChange={handleCvcChange}
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        select
                        label="Country"
                        variant="outlined"
                        fullWidth
                        value={selectedCountry}
                        onChange={(e) => setSelectedCountry(e.target.value)}
                    >
                        {countries.map((option) => (
                            <MenuItem key={option.value} value={option.value}>
                                {option.label}
                            </MenuItem>
                        ))}
                    </TextField>
                </Grid>
                <Grid item xs={12}>
                    <Button variant="contained" color="primary" onClick={handlePayment}>
                        Pay Now
                    </Button>
                </Grid>
            </Grid>
        </Container>
    );
};

export default PaymentForm;
