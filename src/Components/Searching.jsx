import { useState, useEffect } from 'react';
import * as React from 'react';
import { useSearchTrain } from "../Context/SearchTrain";
import { Button } from '@mui/material';
import Paper from '@mui/material/Paper';
import { styled } from '@mui/material/styles';
import TrainBox from './TrainBox'
import trains from './AllTrainDetail';
import { useFirebase } from '../Context/Firebase';

import {
    getFirestore,
    collection,
    getDocs
} from 'firebase/firestore';

export default function Searching() {

    const [isSearch, setIsSearch] = useState(false);
    const [bookList, setBookList] = useState([]);
    // const [listItem, setListItem] = useState(false);

    let bookedTrains = [];

    const firebase = useFirebase();
    const db = getFirestore();


    // onSnapshot(q, (snapshot) => {
    //     let books = [];
    //     snapshot.docs.forEach((doc) => {
    //         books.push({ ...doc.data(), id: doc.id });
    //     });

    //     if (books.length > 0) {
    //         firebase.setUserID(books[0].id);
    //     }
    // });


    const [FromText, setFromText] = useState('');
    const [ToText, setToText] = useState('');
    const [DateText, setDateText] = useState('');


    const SearchTrain = useSearchTrain();

    const printall = () => {
        // const getRandomInt = (min, max) => Math.floor(Math.random() * (max - min) + min);
        // const randomInteger = getRandomInt(3, 7);
        // setListItem(randomInteger);
        const path = 'User/' + firebase.UserID + '/BookList';
        const colRef = collection(db, path);

        getDocs(colRef).then((snapshot) => {
            let books = [];
            snapshot.forEach((doc) => {
                books.push({ ...doc.data(), id: doc.id });
                // bookedTrains.push(doc.TrainNumber);
            });
            books.forEach((element) => {
                bookedTrains.push(element.TrainNumber);
            })
            setBookList(bookedTrains);
            bookedTrains = [];
        }).catch((error) => {
            console.error('Error getting documents:', error);
        });
        setIsSearch(true);
        setFromText(SearchTrain.FromTextContext);
        setToText(SearchTrain.ToTextContext);
        setDateText(SearchTrain.DateSelectedContext);

    };

    const addToBookList = (trainNumber) => {
        setBookList((prevList) => [...prevList, trainNumber]);
    };

    const removeFromBookList = (trainNumber) => {
        setBookList((prevList) => prevList.filter((item) => item !== trainNumber));
    };

    useEffect(() => {
        console.log('Updated bookList', bookList);
    }, [bookList]);
    return (
        <>
            <div className='d-flex justify-content-center'>
                <Button
                    variant="contained"
                    disabled={!SearchTrain.isFromTo}
                    onClick={printall}
                    disableElevation
                >
                    Search
                </Button>
            </div>

            {isSearch &&
                trains.map((row) => (
                    <TrainBox
                        key={row.TrainNumber}
                        data={{ FromText, ToText, DateText, row }}
                        onAddToBookList={addToBookList}
                        onRemoveFromBookList={removeFromBookList}
                        isAddedToBookList={bookList.includes(row.TrainNumber)}
                    />
                ))
            }
        </>
    );
}
