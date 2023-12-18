import React, { useState } from 'react';
import { Button, TextField, Grid, Container, MenuItem, Typography } from '@mui/material';

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

    const handlePayment = async () => {
        // Actual payment processing logic here
        console.log('Processing payment...');
    };

    return (
        <Container maxWidth="sm" style={{ marginTop: '2%', marginBottom: '2%' }}>
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
                        onChange={(e) => setCardNumber(e.target.value)}
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
                        onChange={(e) => setCvc(e.target.value)}
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
