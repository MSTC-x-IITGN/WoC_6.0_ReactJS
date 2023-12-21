import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import CancelIcon from '@mui/icons-material/Cancel';
import { useFirebase } from '../Context/Firebase';
import { useNavigate } from 'react-router-dom';
import {
    getFirestore,
    onSnapshot,
    doc,
    updateDoc,
    collection,
    getDocs
} from 'firebase/firestore';

export default function CancelTicket() {

    const firebase = useFirebase();
    const db = getFirestore();
    const navigate = useNavigate();

    const handleCancelTicket = () => {

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
                            ele.SearchIsPaid = false;
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

    const handleIgnore = () => {
        navigate("/booklist");
    }

    return (
        <Card sx={{ maxWidth: 345, margin: 'auto', marginTop: '6%', marginBottom: '6%', textAlign: 'center', paddingTop: '20px' }}>
            <CancelIcon sx={{ fontSize: 80, color: 'error' }} />
            <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                    Are You Sure?
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    Do you really want cancel the ticket? This process cannot be undone.
                </Typography>
            </CardContent>
            <CardActions sx={{ justifyContent: 'center' }}>
                <Button onClick={handleIgnore} variant="outlined" color='info'>Ignore</Button>
                <Button onClick={handleCancelTicket} variant="contained" color='error'>Cancel ticket</Button>
            </CardActions>
        </Card>
    );
}