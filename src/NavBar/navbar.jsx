import React from 'react';
import './navbar.css';

function NavBar() {
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
                <a className="navbar-brand" href="#home">
                    Navbar
                </a>
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
                                <a className="nav-link active" href="#home">
                                    Home
                                </a>
                            </div>
                        </li>
                        <li className="nav-item">
                            <div className="my-button">
                                <a className="nav-link" href="#link">
                                    Link
                                </a>
                            </div>
                        </li>
                        <div className="my-button">
                            <li className="nav-item dropdown">
                                <a
                                    className="nav-link dropdown-toggle"
                                    href="#home"
                                    role="button"
                                    data-bs-toggle="dropdown"
                                    aria-expanded="false"
                                >
                                    Dropdown
                                </a>
                                <ul className="dropdown-menu">
                                    <li>
                                        <a className="dropdown-item" href="#action">
                                            Action
                                        </a>
                                    </li>
                                    <li>
                                        <a className="dropdown-item" href="#another-action">
                                            Another action
                                        </a>
                                    </li>
                                    <li>
                                        <hr className="dropdown-divider" />
                                    </li>
                                    <li>
                                        <a className="dropdown-item" href="#something-else">
                                            Something else here
                                        </a>
                                    </li>
                                </ul>
                            </li>
                        </div>

                        <li className="nav-item">
                            <div className="my-button">
                                <a className="nav-link" href="#link">
                                    Profile
                                </a>
                            </div>
                        </li>
                    </ul>
                    {/* <form className="d-flex" role="search">
                  <input
                      className="form-control me-2"
                      type="search"
                      placeholder="Search"
                      aria-label="Search"
                  />
                  <button className="btn btn-outline-success" type="submit">
                      Search
                  </button>
              </form> */}
                </div>
            </div>
        </nav >
    );
}

export default NavBar;
