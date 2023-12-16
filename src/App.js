import { BrowserRouter, Route, Routes } from 'react-router-dom';
import NavBar from './Components/Navbar.jsx';
import Payment from './Components/Payment.jsx';
import Profile from './Components/Profile.jsx';
import Homepage from './Components/Homepage.jsx';

//Pages
import RegisterPage from './Pages/Register.jsx';
import LoginPage from './Pages/Login.jsx';

//CSS
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <>
      <NavBar />
      <Routes>
        <Route exact path="/" element={<Homepage />} />
        <Route exact path="/login" element={<LoginPage />} />
        <Route exact path="/register" element={<RegisterPage />} />
        <Route exact path="/profile" element={<Profile />} />
        <Route exact path="/payment" element={<Payment />} />
      </Routes>
    </>
  );
}

export default App;
