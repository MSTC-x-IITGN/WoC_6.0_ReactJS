import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

const rows = [
    {
        SN: 1,
        StationCode: "MMCT",
        StationName: "MUMBAI CENTRAL",
        RouteNumber: "1",
        ArrivalTime: "---",
        DepartureTime: "06:00",
        HaltTime: "---",
        Distance: "0",
        Day: "1"
    },
    {
        SN: 2,
        StationCode: "BVI",
        StationName: "BORIVALI",
        RouteNumber: "1",
        ArrivalTime: "06:23",
        DepartureTime: "06:25",
        HaltTime: "02:00",
        Distance: "30",
        Day: "1"
    },
    {
        SN: 3,
        StationCode: "VAPI",
        StationName: "VAPI",
        RouteNumber: "1",
        ArrivalTime: "07:56",
        DepartureTime: "07:58",
        HaltTime: "02:00",
        Distance: "170",
        Day: "1"
    },
    {
        SN: 4,
        StationCode: "ST",
        StationName: "SURAT",
        RouteNumber: "1",
        ArrivalTime: "08:55",
        DepartureTime: "08:58",
        HaltTime: "03:00",
        Distance: "263",
        Day: "1"
    },
    {
        SN: 5,
        StationCode: "BRC",
        StationName: "VADODARA JN",
        RouteNumber: "1",
        ArrivalTime: "10:13",
        DepartureTime: "10:16",
        HaltTime: "03:00",
        Distance: "392",
        Day: "1"
    },
    {
        SN: 6,
        StationCode: "ADI",
        StationName: "AHMEDABAD JN",
        RouteNumber: "1",
        ArrivalTime: "11:25",
        DepartureTime: "11:30",
        HaltTime: "05:00",
        Distance: "491",
        Day: "1"
    },
    {
        SN: 7,
        StationCode: "GNC",
        StationName: "GANDHINAGAR CAP",
        RouteNumber: "1",
        ArrivalTime: "12:25",
        DepartureTime: "---",
        HaltTime: "---",
        Distance: "520",
        Day: "1"
    }
];

export default function AccessibleTable() {
    return (
        <TableContainer component={Paper}>
            <Table aria-label="caption table">
                <TableHead>
                    <TableRow>
                        <TableCell align="right">SN</TableCell>
                        <TableCell align="right">Station Code</TableCell>
                        <TableCell align="right">Station Name</TableCell>
                        <TableCell align="right">Route Number</TableCell>
                        <TableCell align="right">Arrival Time</TableCell>
                        <TableCell align="right">Departure Time</TableCell>
                        <TableCell align="right">HaltTime</TableCell>
                        <TableCell align="right">Distance</TableCell>
                        <TableCell align="right">Day</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {rows.map((row) => (
                        <TableRow key={row.name}>
                            <TableCell align="right">{row.SN}</TableCell>
                            <TableCell align="right">{row.StationCode}</TableCell>
                            <TableCell align="right">{row.StationName}</TableCell>
                            <TableCell align="right">{row.RouteNumber}</TableCell>
                            <TableCell align="right">{row.ArrivalTime}</TableCell>
                            <TableCell align="right">{row.DepartureTime}</TableCell>
                            <TableCell align="right">{row.HaltTime}</TableCell>
                            <TableCell align="right">{row.Distance}</TableCell>
                            <TableCell align="right">{row.Day}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}