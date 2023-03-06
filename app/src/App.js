import React, { useState, useEffect } from "react";
import "./assets/css/style.css";
import axios from "axios";
import Student from "./components/Student";
import Navbar from "./components/Navbar";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const UserContext = React.createContext();

function App() {
    const [students, setStudents] = useState(null);
    const [authenticatedUser, setAuthenticatedUser] = useState(null);

    useEffect(function () {
        axios.get("http://127.0.0.1:8000/api/students").then(function (response) {
            const student = response.data.data;
            // console.log(student);
            setStudents(student);
        });
    }, []);
    // [] => adalah Depedency dan kalo kosong berarti setiap merefresh menjalani lagi fungsi useEffect 1x

    // useEffect(
    //     function () {
    //         console.log(authenticatedUser);
    //     },
    //     [authenticatedUser]
    // );

    return (
        <UserContext.Provider value={{ authenticatedUser, setAuthenticatedUser }}>
            <div className="App">
                <Navbar setStudents={setStudents} />
                <div className="container-fluid card-container d-flex justify-content-center align-items-center gap-2 flex-wrap">
                    {students && students.map((student) => <Student key={student.email} student={student} />)}
                </div>
                <ToastContainer />
            </div>
        </UserContext.Provider>
    );
}

export default App;
