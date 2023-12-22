import React, { useEffect, useState } from 'react';
import { Button, TextField, Grid, Container, MenuItem, Typography } from '@mui/material';
import {
    getFirestore,
    collection,
    getDocs,
    updateDoc,
    doc,
} from 'firebase/firestore';
import { useFirebase } from '../Context/Firebase';
import { useNavigate } from 'react-router-dom';
import DateRangeIcon from '@mui/icons-material/DateRange';
import Alert from '@mui/material/Alert';

const countries = [
    { value: 'us', label: 'United States' },
    { value: 'ca', label: 'Canada' },
    { value: 'in', label: 'India' }
    // Add more countries as needed
];

const PaymentForm = () => {

    let PAYDATA;

    const [cardNumber, setCardNumber] = useState('');
    const [cardNumberDisplay, setCardNumberDisplay] = useState('');
    const [isCardNumberValid, setIsCardNumberValid] = useState(false);
    const [month, setMonth] = useState('');
    const [isValidMonth, setIsValidMonth] = useState(true);
    const [isValidYear, setIsValidYear] = useState(true);
    const [year, setYear] = useState('');
    const [cvc, setCvc] = useState('');
    const [selectedCountry, setSelectedCountry] = useState('');
    const [isValidPayment, setIsValidPayment] = useState(true);

    const firebase = useFirebase();
    const db = getFirestore();
    const navigate = useNavigate();

    const handleCardNumberChange = (e) => {
        const input = e.target.value.replace(/\D/g, ''); // Remove non-numeric characters
        // setCardNumber(input);

        // Format for display
        let formattedCardNumber = '';
        for (let i = 0; i < input.length; i += 4) {
            formattedCardNumber += input.slice(i, i + 4) + ' ';
        }

        // Set the formatted number with spaces for display
        const temp = formattedCardNumber.trim();
        if (temp.length < 20) {
            setCardNumberDisplay(formattedCardNumber.trim());
        }
    };

    const handleCvcChange = (e) => {
        const input = e.target.value.replace(/\D/g, '').slice(0, 3); // Remove non-numeric characters and limit to 3 digits
        setCvc(input);
    };

    const handleMonthChange = (e) => {
        const input = e.target.value.replace(/\D/g, '').slice(0, 2); // Remove non-numeric characters and limit to 3 digits
        setMonth(input);

        const val = Number(input);
        if (val > 12) {
            setIsValidMonth(false);
        } else {
            setIsValidMonth(true);
        }
    };

    const handleYearChange = (e) => {
        const input = e.target.value.replace(/\D/g, '').slice(0, 2); // Remove non-numeric characters and limit to 3 digits
        setYear(input);

        const val = Number(input);
        if (val < 24) {
            setIsValidYear(false);
        } else {
            setIsValidYear(true);
        }
    };

    const handlePayment = () => {

        if (cardNumberDisplay.length === 19 &&
            isValidMonth &&
            isValidYear &&
            cvc.length === 3 &&
            selectedCountry != '') {
            setIsValidPayment(true);

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

                let myListOfBook;
                upperbooks.forEach((element) => {
                    if (element.id === searchID) {
                        element.Trains.forEach((ele) => {
                            if (ele.TrainNumber === trainID) {
                                ele.SearchIsPaid = true;
                            }
                        });
                        myListOfBook = element;
                    }
                });

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
            });

            navigate("/booklist");
        }
        else {
            setIsValidPayment(false);
        }
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
                        value={cardNumberDisplay}
                        onChange={handleCardNumberChange}
                    />
                </Grid>
                <Grid item xs={2} style={{ display: 'flex', justifyContent: 'center' }}>
                    <DateRangeIcon style={{ margin: '0.3em', fontSize: '2em' }} />
                </Grid>
                <Grid item xs={2}>
                    <TextField
                        label="Month"
                        variant="outlined"
                        color={isValidMonth ? 'info' : 'error'}
                        fullWidth
                        placeholder='MM'
                        value={month}
                        onChange={handleMonthChange}
                    />
                </Grid>
                <Grid item xs={2}>
                    <TextField
                        label="Year"
                        variant="outlined"
                        color={isValidYear ? 'info' : 'error'}
                        fullWidth
                        placeholder='YY'
                        value={year}
                        onChange={handleYearChange}
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
                {!isValidPayment && <Grid item xs={12}>
                    <Alert severity="error">Please, Enter valid details</Alert>
                </Grid>}
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
