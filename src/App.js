import React, {useEffect, useState} from 'react';
import Login from "./pages/Login";
import Register from "./pages/Register";
import Home from "./pages/Home";
import Sidebar from "./components/Sidebar";
import Products from "./pages/Products";
import Journal from "./pages/Journal";
import Profile from "./pages/Profile";

import './App.css';
import {BrowserRouter, Navigate, Route, Routes} from "react-router-dom";
import {Calculator} from "lucide-react";

function App() {

    const [name, setName] = useState("")
    const [message, gotMessage] = useState("")

    useEffect(() => {
        (
            async () => {
                const response = await fetch("http://localhost:8000/api/user", {
                    headers: {"Content-Type": "application/json"},
                    credentials: "include",
                })

                const content = await response.json()
                if (content.message) {
                    gotMessage(content.message)
                }

                if (content.name) {
                    setName(content.name)
                }
            }
        )()
    })

    return (
        <body>
            <BrowserRouter>
                {/*<Nav name={name} setName={setName}/>*/}
                <Sidebar name={name}/>
                <main className="form-signin w-100 m-auto">
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/sugars" element={<Journal />} />
                        <Route path="/products" element={<Products />} />
                        <Route path="/calculator" element={<Calculator />} />
                        <Route path="/login" element={<Login setName={setName}/>} />
                        <Route path="/register" element={<Register />} />
                        <Route path="/profile" element={<Profile />} />
                        <Route path='*' element={<Navigate to='/'/>} />
                    </Routes>

                </main>

            </BrowserRouter>
        </body>

    );
}

export default App;
