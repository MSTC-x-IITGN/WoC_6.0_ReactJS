import { useState } from "react";
import DatePicker from "react-datetime";
import moment from "moment";
import "react-datetime/css/react-datetime.css";

function Filters() {
    const yesterday = moment().subtract(1, "day");
    const currentDate = moment().format("DD-MM-YYYY");
    const [selectedDate, setSelectedDate] = useState(currentDate);

    const disPastDate = (current) => {
        return current.isAfter(yesterday);
    };
    const handleDateChange = (date) => {
        setSelectedDate(date);
    };

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
                            <select className="form-select" aria-label="Default select example">
                                <option value>All Classes</option>
                                <option value="1">Anubhuti Class (EA)</option>
                                <option value="2">AC First Class (1A)</option>
                                <option value="3">Vistadome AC (EV)</option>
                                <option value="4">Exec. Chair Car (EC)</option>
                                <option value="5">AC 2 Tier (2A)</option>
                                <option value="6">First Class (FC)</option>
                                <option value="7">AC 3 Tier (3A)</option>
                                <option value="8">AC 3 Economy (3E)</option>
                                <option value="9">Vistadome Chair Car (VC)</option>
                                <option value="10">AC Chair car (CC)</option>
                                <option value="11">Sleeper (SL)</option>
                                <option value="12">Vistadome Non AC (VS)</option>
                                <option value="13">Second Sitting (2S)</option>
                            </select>
                        </div>
                    </div>
                    <div className="card">
                        {/* <img src="..." className="card-img-top" alt="..." /> */}
                        <div className="card-body">
                            <h5 className="card-title">CATAGORIES</h5>
                            <select className="form-select" aria-label="Default select example">
                                <option value>GENERAL</option>
                                <option value="1">LADIES</option>
                                <option value="2">LOWER BERTH/SR.CITIZEN</option>
                                <option value="3">PERSON WITH DISABILITY</option>
                                <option value="4">DUTY PASS</option>
                                <option value="5">TATKAL</option>
                            </select>
                        </div>
                    </div>
                </div>
            </div >
        </>
    )
}

export default Filters;