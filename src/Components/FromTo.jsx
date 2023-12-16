import React, { useState } from 'react';
import words from './Stations.jsx'

class TrieNode {
    constructor() {
        this.children = {};
        this.isEndOfWord = false;
        this.data = null; // Store the whole object in the Trie node
    }
}

class Trie {
    constructor() {
        this.root = new TrieNode();
    }

    insert(obj) {
        let node = this.root;
        const stationName = obj.station.toLowerCase();

        for (const char of stationName) {
            if (!node.children[char]) {
                node.children[char] = new TrieNode();
            }
            node = node.children[char];
        }

        node.isEndOfWord = true;
        node.data = obj;
    }

    search(prefix) {
        let node = this.root;
        const prefixLowerCase = prefix.toLowerCase();

        for (const char of prefixLowerCase) {
            if (!node.children[char]) {
                return [];
            }
            node = node.children[char];
        }

        const suggestions = [];
        this.findSuggestions(node, prefixLowerCase, suggestions);
        return suggestions;
    }

    findSuggestions(node, prefix, suggestions) {
        if (node.isEndOfWord) {
            suggestions.push(node.data);
        }
        for (const [char, child] of Object.entries(node.children)) {
            this.findSuggestions(child, prefix + char, suggestions);
        }
    }
}

function FromTo() {
    const [FromText, setFromText] = useState('');
    const [ToText, setToText] = useState('');
    const [suggestionsFrom, setSuggestionsFrom] = useState([]);
    const [suggestionsTo, setSuggestionsTo] = useState([]);

    const trie = new Trie();

    words.forEach((word) => trie.insert(word));

    const changingFromText = (e) => {
        const input = e.target.value;
        setFromText(input);
        const filteredSuggestions = trie.search(input);
        setSuggestionsFrom(filteredSuggestions);
    }

    const changingToText = (e) => {
        const input = e.target.value;
        setToText(input);
        const filteredSuggestions = trie.search(input);
        setSuggestionsTo(filteredSuggestions);
    }

    const selectThisFromCity = (selectedCity) => {
        setFromText(selectedCity.station);
        setSuggestionsFrom([]);
    }

    const selectThisToCity = (selectedCity) => {
        setToText(selectedCity.station);
        setSuggestionsTo([]);
    }

    const swapText = () => {
        let temp1 = FromText;
        let temp2 = ToText;

        setToText(temp1);
        setFromText(temp2);
    }

    return (
        <div className="container d-flex justify-content-center align-items-center my-5">
            <div className="card w-50 border-0">
                <h3 className="card my-2 py-3 text-center">
                    Select Your Journey
                </h3>
                <div className="card-body">
                    <div className="mb-3 input-group-lg">
                        <label htmlFor="FromText" className="form-label fs-5">From : </label>
                        <input
                            type="text"
                            className="form-control"
                            id="FromText"
                            placeholder="Your location"
                            value={FromText}
                            onChange={changingFromText}
                        />
                        <div className="list-group">
                            {FromText !== '' && suggestionsFrom.map((suggestion, index) => (
                                <button key={index} type="button" className="list-group-item list-group-item-action"
                                    onClick={() => selectThisFromCity(suggestion)}>
                                    <div>
                                        {suggestion.station} - {suggestion.code}
                                    </div>
                                    <div className='fw-semibold'>
                                        {suggestion.state}
                                    </div>
                                </button>
                            ))}
                        </div>
                    </div>
                    <div className="text-center">
                        <button type="button" className="btn btn-outline-primary" onClick={swapText}>
                            <i className="fa-solid fa-arrow-right-arrow-left fa-rotate-90 fa-2xl"></i>
                        </button>
                    </div>
                    <div className="mb-3 input-group-lg">
                        <label htmlFor="ToText" className="form-label fs-5">To : </label>
                        <input type="text"
                            className="form-control"
                            id="ToText"
                            placeholder="Destination"
                            value={ToText}
                            onChange={changingToText}
                        />
                        <div className="list-group">
                            {ToText !== '' && suggestionsTo.map((suggestion, index) => (
                                <button key={index} type="button" className="list-group-item list-group-item-action"
                                    onClick={() => selectThisToCity(suggestion)}>
                                    <div>
                                        {suggestion.station} - {suggestion.code}
                                    </div>
                                    <div className='fw-semibold'>
                                        {suggestion.state}
                                    </div></button>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
            <div className='mx-5'>
                <ul className="list-group">
                    <li className="list-group-item">
                        <div className="form-check">
                            <input className="form-check-input" type="checkbox" value="" id="flexCheckDefault" />
                            <label className="form-check-label" htmlFor="flexCheckDefault">
                                Railway Pass Concession
                            </label>
                        </div>
                    </li>
                    <li className="list-group-item">
                        <div className="form-check">
                            <input className="form-check-input" type="checkbox" value="" id="flexCheckDefault" />
                            <label className="form-check-label" htmlFor="flexCheckDefault">
                                Flexible With Date
                            </label>
                        </div>
                    </li>
                    <li className="list-group-item">
                        <div className="form-check">
                            <input className="form-check-input" type="checkbox" value="" id="flexCheckDefault" />
                            <label className="form-check-label" htmlFor="flexCheckDefault">
                                Person With Disability Concession
                            </label>
                        </div>
                    </li>
                    <li className="list-group-item">
                        <div className="form-check">
                            <input className="form-check-input" type="checkbox" value="" id="flexCheckDefault" />
                            <label className="form-check-label" htmlFor="flexCheckDefault">
                                Train with Available Berth
                            </label>
                        </div>
                    </li>
                </ul>
            </div>
        </div>
    );
}

export default FromTo;
