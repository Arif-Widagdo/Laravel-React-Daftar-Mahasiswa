import axios from "axios";
import React, { useContext } from "react";
import { UserContext } from "../App";
import LoginModal from "./LoginModal";
import Cookies from "universal-cookie";
import { toast } from "react-toastify";
import RegisterModal from "./RegisterModal";

export default function Navbar({ setStudents }) {
    const { authenticatedUser, setAuthenticatedUser } = useContext(UserContext);

    const handleLogout = () => {
        setAuthenticatedUser(null);

        axios.post(
            "http://127.0.0.1:8000/api/auth/logout",
            {},
            {
                withCredentials: true,
                headers: {
                    Authorization: `Bearer ${new Cookies().get("Authorization")}`,
                },
            }
        );
        toast.success("Berhasil Logout");
    };

    return (
        <>
            <nav className="navbar navbar-expand-lg bg-body-tertiary mb-3">
                <div className="container-fluid">
                    <a className="navbar-brand" href="#">
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
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                <a className="nav-link active" aria-current="page" href="#">
                                    Home
                                </a>
                            </li>
                        </ul>
                        <div className="dropdown">
                            <button className="btn dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                                Authentication
                            </button>
                            <ul className="dropdown-menu">
                                {!authenticatedUser ? (
                                    <>
                                        <li>
                                            <a className="dropdown-item" href="#" data-bs-toggle="modal" data-bs-target="#loginModal">
                                                Login
                                            </a>
                                        </li>
                                        <li>
                                            <a className="dropdown-item" href="#" data-bs-toggle="modal" data-bs-target="#registerModal">
                                                Register
                                            </a>
                                        </li>
                                    </>
                                ) : (
                                    <li>
                                        <a className="dropdown-item" href="#" onClick={handleLogout}>
                                            Logout
                                        </a>
                                    </li>
                                )}
                            </ul>
                        </div>
                    </div>
                </div>
            </nav>

            <LoginModal />
            <RegisterModal setStudents={setStudents} />
        </>
    );
}
