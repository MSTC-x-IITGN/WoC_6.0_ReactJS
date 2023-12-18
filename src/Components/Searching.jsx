import { useState } from 'react';
import * as React from 'react';
import { useSearchTrain } from "../Context/SearchTrain";
import { Button } from '@mui/material';
import Paper from '@mui/material/Paper';
import { styled } from '@mui/material/styles';
import TrainBox from './TrainBox'

export default function Searching() {

    const [isSearch, setIsSearch] = useState(false);
    const [listItem, setListItem] = useState(false);

    const [FromText, setFromText] = useState('');
    const [ToText, setToText] = useState('');
    const [DateText, setDateText] = useState('');


    const SearchTrain = useSearchTrain();

    const printall = () => {
        const getRandomInt = (min, max) => Math.floor(Math.random() * (max - min) + min);
        const randomInteger = getRandomInt(3, 7);
        setListItem(randomInteger);
        setIsSearch(true);
        setFromText(SearchTrain.FromTextContext);
        setToText(SearchTrain.ToTextContext);
        setDateText(SearchTrain.DateSelectedContext);

    };
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
                <>
                    {Array.from({ length: listItem }).map((_, index) => (
                        <TrainBox key={index} data={{ FromText, ToText, DateText }} />
                    ))}
                </>
            }
        </>
    );
}
