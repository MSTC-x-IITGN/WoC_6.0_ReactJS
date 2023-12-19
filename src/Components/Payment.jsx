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
        const input = e.target.value.replace(/\D/g, ''); // Remove non-numeric characters
        let formattedCardNumber = '';

        for (let i = 0; i < input.length; i += 4) {
            formattedCardNumber += input.slice(i, i + 4) + ' ';
        }

        setCardNumber(formattedCardNumber.trim());
    };

    const handleCvcChange = (e) => {
        const input = e.target.value.replace(/\D/g, '').slice(0, 3); // Remove non-numeric characters and limit to 3 digits
        setCvc(input);
    };

    const handlePayment = () => {
        const path = 'User/' + firebase.UserID + '/PayList';
        const colRef = collection(db, path);

        // const path = 'User/' + firebase.UserID + '/BookList';
        // const colRef = collection(db, path);

        getDocs(colRef).then((snapshot) => {
            let books = [];
            snapshot.forEach((doc) => {
                books.push({ ...doc.data(), id: doc.id });
            });
            // PayListID = books[0].DataId;
            const newPath = 'User/' + firebase.UserID + '/BookList';
            const docRef = doc(db, newPath, books[0].DataId);
            updateDoc(docRef, {
                isPaid: true
            })
                .then(() => {
                    console.log('updated../Paid', books[0].DataId);
                })
                .catch((error) => {
                    console.error('Error updating document: ', error);
                });

            const deletePath = 'User/' + firebase.UserID + '/PayList';

            books.forEach((element) => {
                const myDelDocRef = doc(db, deletePath, element.id);
                deleteDoc(myDelDocRef)
                    .then(() => {
                        console.log('deleted.../paylist');
                    })
            })

            // console.log('Processing payment...');
            // console.log(PayListID);
        }).catch((error) => {
            console.error('Error getting documents:', error);
        });



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
