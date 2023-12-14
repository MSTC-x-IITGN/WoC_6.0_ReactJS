import { BrowserRouter as Main, Route, Routes } from 'react-router-dom';
import NavBar from './Components/Navbar.jsx';
import Payment from './Components/Payment.jsx';
import Profile from './Components/Profile.jsx';
import Homepage from './Components/Homepage.jsx';

function App() {
  return (
    <>
      <Main>
        <NavBar />
        <Routes>
          <Route exact path="/" element={<Homepage />} />
          <Route exact path="/profile" element={<Profile />} />
          <Route exact path="/payment" element={<Payment />} />
        </Routes>
      </Main>
    </>
  );
}

export default App;
