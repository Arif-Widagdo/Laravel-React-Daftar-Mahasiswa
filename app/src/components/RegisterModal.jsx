import React, { useRef, useContext } from "react";
import axios from "axios";
import Cookies from "universal-cookie";
import { UserContext } from "../App";
import { toast } from "react-toastify";

export default function RegisterModal({ setStudents }) {
    const inputName = useRef(null);
    const inputEmail = useRef(null);
    const inputUsername = useRef(null);
    const inputPassword = useRef(null);
    const closeBtnModal = useRef(null);

    async function handleRegister() {
        const name = inputName.current.value;
        const username = inputUsername.current.value;
        const email = inputEmail.current.value;
        const password = inputPassword.current.value;

        // console.log({ name, username, email, password });

        axios
            .post("http://127.0.0.1:8000/api/students", {
                name: name,
                username: username,
                email: email,
                password: password,
            })
            .then((response) => {
                axios.get("http://127.0.0.1:8000/api/students").then((response) => {
                    const student = response.data.data;
                    // console.log(student);
                    setStudents(student);
                    toast.success("Mahasiswa berhasil ditambahkan");
                });
            });
    }

    return (
        <div className="modal fade" id="registerModal" tabIndex="-1">
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h1 className="modal-title fs-5" id="exampleModalLabel">
                            Register
                        </h1>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div className="modal-body">
                        <form action="">
                            <div className="mb-3">
                                <label htmlFor="inputName" className="form-label">
                                    Name
                                </label>
                                <input type="text" className="form-control" id="inputName" ref={inputName} />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="inputUsername" className="form-label">
                                    Username
                                </label>
                                <input type="text" className="form-control" id="inputUsername" ref={inputUsername} />
                            </div>
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
                        <button type="button" className="btn btn-primary" onClick={handleRegister}>
                            Register
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
