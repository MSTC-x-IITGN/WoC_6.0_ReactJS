import Stations from "./Stations";

const getRandomStation = () => {
    const randomIndex = Math.floor(Math.random() * Stations.length);
    return Stations[randomIndex];
};

const generateRandomTrain = () => {
    const randomTrain = {
        TrainName: "Train" + Math.floor(Math.random() * 1000),
        TrainNumber: Math.floor(Math.random() * 100000).toString(),
        FromStations: getRandomStation(),
        DestinationStation: getRandomStation(),
        JourneyClass:
        {
            AcChairCar: Math.random() < 0.2,
            AC3Tier: Math.random() < 0.1,
            SecondSitting: true,
            ExecChairCar: true,
        },

        RunsOn: {
            Monday: Math.random() < 0.5,
            Tuesday: Math.random() < 0.5,
            Wednesday: Math.random() < 0.5,
            Thursday: Math.random() < 0.5,
            Friday: Math.random() < 0.5,
            Saturday: Math.random() < 0.5,
            Sunday: Math.random() < 0.5,
        },
        Stations: Array.from({ length: Math.floor(Math.random() * 20) + 5 }, (_, index) => {
            const station = getRandomStation();
            station.RouteNumber = (index + 1).toString();
            station.SN = (index + 1).toString(); // Serial Number
            return station;
        }),
    };

    let previousDepartureTime = "00:00"; // Initial departure time

    randomTrain.Stations.forEach((station, index) => {
        station.ArrivalTime = previousDepartureTime;
        const departureHour = parseInt(previousDepartureTime.split(":")[0], 10);
        const departureMinute = parseInt(previousDepartureTime.split(":")[1], 10);
        const newDepartureHour = (departureHour + 1) % 24; // Wrap within 0 to 23
        const newDepartureMinute = Math.min(Math.floor(Math.random() * 60), 59);
        station.DepartureTime = `${newDepartureHour.toString().padStart(2, '0')}:${newDepartureMinute.toString().padStart(2, '0')}`;
        station.HaltTime = "02:00";
        station.Distance = ((index + 1) * 10).toString();
        station.Day = "1";

        previousDepartureTime = station.DepartureTime;
    });

    randomTrain.Stations.sort((a, b) => {
        return a.ArrivalTime.localeCompare(b.ArrivalTime);
    });

    return randomTrain;
};

const numberOfTrains = 100;
const trains = Array.from({ length: numberOfTrains }, generateRandomTrain);
console.log(trains);

export default trains;
