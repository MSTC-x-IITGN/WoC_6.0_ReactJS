import React from 'react';
import { Link } from 'react-router-dom';
import '../CSS/Navbar.css';


//new
import { useFirebase } from '../Context/Firebase';


function NavBar() {
    const firebase = useFirebase();

    const navbarStyle = {
        position: 'sticky',
        top: '1%',
        zIndex: 100,
        backgroundColor: '#f0fcf3',
        borderRadius: '15px'
    };

    return (
        <nav className="my-2 mx-2 navbar navbar-expand-lg border p-2" style={navbarStyle}>
            <div className="container-fluid">
                <Link className="navbar-brand" to="/home">
                    Navbar
                </Link>
                <button
                    className="navbar-toggler"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#navbarSupportedContent"
                    aria-controls="navbarSupportedContent"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
                >
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                            <div className="my-button">
                                <Link className="nav-link active" to="/">
                                    Home
                                </Link>
                            </div>
                        </li>
                        <li className="nav-item">
                            <div className="my-button">
                                <Link className="nav-link" to="/payment">
                                    Payment
                                </Link>
                            </div>
                        </li>
                        <li className="nav-item">
                            <div className="my-button">
                                <Link className="nav-link" to="/booklist">
                                    Booklist
                                </Link>
                            </div>
                        </li>
                        <div className="my-button">
                            <li className="nav-item dropdown">
                                <Link
                                    className="nav-link dropdown-toggle"
                                    to="#home"
                                    role="button"
                                    data-bs-toggle="dropdown"
                                    aria-expanded="false"
                                >
                                    Dropdown
                                </Link>
                                <ul className="dropdown-menu">
                                    <li>
                                        <Link className="dropdown-item" to="#action">
                                            Action
                                        </Link>
                                    </li>
                                    <li>
                                        <Link className="dropdown-item" to="#another-action">
                                            Another action
                                        </Link>
                                    </li>
                                    <li>
                                        <hr className="dropdown-divider" />
                                    </li>
                                    <li>
                                        <Link className="dropdown-item" to="#something-else">
                                            Something else here
                                        </Link>
                                    </li>
                                </ul>
                            </li>
                        </div>
                        <li className="nav-item">
                            <div className="my-button user-data">
                                {firebase.isLoggedIn ?
                                    <Link className="nav-link" to="/profile">
                                        Profile
                                    </Link>
                                    :
                                    <Link className="nav-link" to="/login">
                                        LogIn/SignUP
                                    </Link>
                                }
                            </div>
                        </li>

                    </ul>
                </div>
            </div>
        </nav>
    );
}

export default NavBar;
