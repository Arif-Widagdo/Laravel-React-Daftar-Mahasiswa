import React, { useRef, useContext } from "react";
import axios from "axios";
import Cookies from "universal-cookie";
import { UserContext } from "../App";
import { toast } from "react-toastify";

export default function LoginModal() {
    const inputEmail = useRef(null);
    const inputPassword = useRef(null);
    const closeBtnModal = useRef(null);
    const cookies = new Cookies();
    const { authenticatedUser, setAuthenticatedUser } = useContext(UserContext);

    async function handleLogin() {
        const email = inputEmail.current.value;
        const password = inputPassword.current.value;
        // console.log({ email, password });

        await axios.get("http://127.0.0.1:8000/sanctum/csrf-cookie");
        // await axios.get("http://127.0.0.1:8000/sanctum/csrf-cookie").then((response) => {
        //     console.log(response);
        // });

        // Fetch Data
        const loginPromise = axios
            .post(
                "http://127.0.0.1:8000/api/auth/login",
                { email: email, password: password },
                {
                    withCredentials: true,
                }
            )
            .then(async (response) => {
                // Tutup Modal Login
                closeBtnModal.current.click();

                cookies.set("Authorization", response.data.token);
                // console.log(response);
                return await axios
                    .get("http://127.0.0.1:8000/api/auth/user", {
                        headers: {
                            Authorization: `Bearer ${cookies.get("Authorization")}`,
                        },
                    })
                    .then((response) => {
                        // console.log(response);
                        setAuthenticatedUser(response.data.user);
                        return response;
                    });
            });

        // Toast
        toast.promise(loginPromise, {
            pending: {
                render() {
                    return "Proccessing...";
                },
                icon: false,
            },
            success: {
                render({ data }) {
                    return `Welcome ${data.data.user.name}`;
                },
                // other options
                icon: "🟢",
            },
            error: {
                render({ data }) {
                    // When the promise reject, data will contains the error
                    return `Error: ${data.response.error.message}`;
                },
            },
        });
    }

    return (
        <div className="modal fade" id="loginModal" tabIndex="-1">
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h1 className="modal-title fs-5" id="exampleModalLabel">
                            Login
                        </h1>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div className="modal-body">
                        <form action="">
                            <div className="mb-3">
                                <label htmlFor="inputEmail" className="form-label">
                                    Email address
                                </label>
                                <input type="email" className="form-control" id="inputEmail" ref={inputEmail} />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="inputPassword" className="form-label">
                                    Password
                                </label>
                                <input type="password" className="form-control" id="inputPassword" ref={inputPassword} />
                            </div>
                        </form>
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal" ref={closeBtnModal}>
                            Close
                        </button>
                        <button type="button" className="btn btn-primary" onClick={handleLogin}>
                            Login
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
