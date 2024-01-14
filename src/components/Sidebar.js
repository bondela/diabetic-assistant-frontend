import React, {useState} from 'react';
import "bootstrap-icons/font/bootstrap-icons.css"
import "bootstrap"
import "../styles/components/sidebar.css"
import {NavLink} from 'react-router-dom'; // Импортируйте NavLink

const Sidebar = (props) => {
    const [name, setName] = useState(props.name)

    const logout = async () => {
        await fetch("http://localhost:8000/api/logout", {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            credentials: "include"
        })
        window.location.reload()
    }

    return (
        <div className="sidebar">

            {/*<NavLink to="/" className="sidebar-logo">*/}
            {/*    <i className="bi bi-gear"></i>*/}
            {/*</NavLink>*/}
            {/*<hr/>*/}
            <ul className="nav flex-column mb-auto">

                <div className="sidebar-buttons-column">
                    <li>

                        <NavLink to="/" className="nav-link" activeclassname="acitve">
                            <i className="bi bi-house-fill"/>
                            <span className="sidebar-button-text">Home</span>
                        </NavLink>
                    </li>

                    <li>
                        <NavLink to="/sugars" className="nav-link" activeclassname="active">
                            <i className="bi bi-file-diff"/>
                            <span className="sidebar-button-text">Sugars</span>
                        </NavLink>

                    </li>

                    <li>
                        <NavLink to="/products" className="nav-link" activeclassname="active">
                            <i className="bi bi-card-list"/>
                            <span className="sidebar-button-text">Products</span>
                        </NavLink>

                    </li>

                    <li>
                        <NavLink to="/calculator" className="nav-link" activeclassname="active">
                            <i className="bi bi-card-list"/>
                            <span className="sidebar-button-text">Calculator</span>
                        </NavLink>

                    </li>

                </div>

            </ul>
            <hr/>
            <div className="dropdown">
                <a href="#"
                   className="d-flex align-items-center link-body-emphasis text-decoration-none dropdown-toggle"
                   data-bs-toggle="dropdown" aria-expanded="false">
                <i className="bi bi-person" style={{color: "white"}}/>
                    <strong style={{
                        color: "white",
                        margin: "5px"
                    }}>{props.name ? "Hi, " + props.name : "Authorize"}</strong>
                </a>
                <ul className="dropdown-menu text-small shadow">
                    {props.name ? (
                        <>
                            <div className="dropdown-buttons">
                                <li><a className="dropdown-item" href="/profile">Profile</a></li>
                                <hr className="dropdown-divider"></hr>
                                <li><a className="dropdown-item" onClick={logout}>Log out</a></li>
                            </div>
                        </>
                    ) : (
                        <>
                            <div className="dropdown-buttons">
                                <li><a className="dropdown-item" href="/login">Login</a></li>
                                <li><a className="dropdown-item" href="/register">Register</a></li>
                            </div>
                        </>
                    )}
                </ul>
            </div>

        </div>
    );
};

export default Sidebar;
