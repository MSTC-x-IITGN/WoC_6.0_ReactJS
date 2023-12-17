import { useState, useEffect } from "react";
import DatePicker from "react-datetime";
import moment from "moment";
import "react-datetime/css/react-datetime.css";
import { useSearchTrain } from "../Context/SearchTrain";

function Filters() {

    const SearchTrain = useSearchTrain();

    const yesterday = moment().subtract(1, "day");
    const currentDate = moment().format("DD-MM-YYYY");
    const [selectedDate, setSelectedDate] = useState(currentDate);
    const [selectedValue, setSelectedValue] = useState("All Classes");
    const [selectedValueCatagories, setSelectedValueCatagories] = useState("GENERAL");

    const handleSelectChange = (event) => {
        const selectedOption = event.target.value;
        setSelectedValue(selectedOption);
    };
    const handleSelectChangeONCatagories = (event) => {
        const selectedOption = event.target.value;
        setSelectedValueCatagories(selectedOption);
    };

    const disPastDate = (current) => {
        return current.isAfter(yesterday);
    };
    const handleDateChange = (date) => {
        const formattedDate = moment(date).format("DD-MM-YYYY");
        setSelectedDate(formattedDate);
    };

    useEffect(() => {
        SearchTrain.setCatagoriesContext(selectedValueCatagories);
        SearchTrain.setAllClassesContext(selectedValue);

        // const originalString = selectedDate._d;
        // const index = originalString.search(/ {4}/);
        // const cutString = originalString.substring(0, index);

        SearchTrain.setDateSelectedContext(selectedDate);
    }, [selectedValueCatagories, selectedValue, selectedDate]);

    return (
        <>
            {/* ________________________________________________________________________ */}


            <div className="card" style={{ margin: "2%" }}>
                <div className="card-group">
                    <div className="card">
                        {/* <img src="..." className="card-img-top" alt="..." /> */}
                        <div className="card-body">
                            <h5 className="card-title">Date :</h5>
                            <DatePicker
                                dateFormat="DD-MM-YYYY"
                                timeFormat={false}
                                isValidDate={disPastDate}
                                value={selectedDate}
                                onChange={handleDateChange}
                                inputProps={{ readOnly: true }}
                            />
                        </div>
                    </div>
                    <div className="card">
                        {/* <img src="..." className="card-img-top" alt="..." /> */}
                        <div className="card-body">
                            <h5 className="card-title">All Classes</h5>
                            <select
                                className="form-select"
                                aria-label="Default select example"
                                value={selectedValue}
                                onChange={handleSelectChange}
                            >
                                <option value>All Classes</option>
                                <option value="Anubhuti Class (EA)">Anubhuti Class (EA)</option>
                                <option value="AC First Class (1A)">AC First Class (1A)</option>
                                <option value="Vistadome AC (EV)">Vistadome AC (EV)</option>
                                <option value="Exec. Chair Car (EC)">Exec. Chair Car (EC)</option>
                                <option value="AC 2 Tier (2A)">AC 2 Tier (2A)</option>
                                <option value="First Class (FC)">First Class (FC)</option>
                                <option value="AC 3 Tier (3A)">AC 3 Tier (3A)</option>
                                <option value="AC 3 Economy (3E)">AC 3 Economy (3E)</option>
                                <option value="Vistadome Chair Car (VC)">Vistadome Chair Car (VC)</option>
                                <option value="AC Chair car (CC)">AC Chair car (CC)</option>
                                <option value="Sleeper (SL)">Sleeper (SL)</option>
                                <option value="Vistadome Non AC (VS)">Vistadome Non AC (VS)</option>
                                <option value="Second Sitting (2S)">Second Sitting (2S)</option>
                            </select>

                        </div>
                    </div>
                    <div className="card">
                        {/* <img src="..." className="card-img-top" alt="..." /> */}
                        <div className="card-body">
                            <h5 className="card-title">CATAGORIES</h5>
                            <select
                                className="form-select"
                                aria-label="Default select example"
                                value={selectedValueCatagories}
                                onChange={handleSelectChangeONCatagories}
                            >
                                <option value="GENERAL">GENERAL</option>
                                <option value="LADIES">LADIES</option>
                                <option value="LOWER BERTH/SR.CITIZEN">LOWER BERTH/SR.CITIZEN</option>
                                <option value="PERSON WITH DISABILITY">PERSON WITH DISABILITY</option>
                                <option value="DUTY PASS">DUTY PASS</option>
                                <option value="TATKAL">TATKAL</option>
                            </select>
                        </div>
                    </div>
                </div>
            </div >
        </>
    )
}

export default Filters;