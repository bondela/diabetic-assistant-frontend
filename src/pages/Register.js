import React, {useRef, useState} from 'react';
import {Navigate} from "react-router-dom";
import "../styles/pages/register.css"
import "../styles/pages/errors.css"

const Register = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [redirect, setRedirect] = useState(false);

    const errorLabelRef = useRef(null);

    const submit = async (e) => {
        e.preventDefault();

        if (password.includes(" ")) {
            errorLabelRef.current.textContent = 'Passwords cannot contains spaces'
            errorLabelRef.current.style.opacity = 1;
            return
        }

        if (password !== confirmPassword) {
            errorLabelRef.current.textContent = 'Passwords are different';
            errorLabelRef.current.style.opacity = 1;
            return
        }

        if (password.length < 6) {
            errorLabelRef.current.textContent = 'Password cannot be shorter than 8 symbols';
            errorLabelRef.current.style.opacity = 1;
            return
        }

        if (password.length > 32) {
            errorLabelRef.current.textContent = 'Password cannot be longer than 32 symbols';
            errorLabelRef.current.style.opacity = 1;
            return
        }

        if (name.length < 2) {
            errorLabelRef.current.textContent = 'Name cannot be shorter than 2 symbols';
            errorLabelRef.current.style.opacity = 1;
            return
        }

        if (password.length > 32) {
            errorLabelRef.current.textContent = 'Name cannot be longer than 32 symbols';
            errorLabelRef.current.style.opacity = 1;
            return
        }

        await fetch('http://localhost:8000/api/register', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                name,
                email,
                password
            })
        });

        setRedirect(true);
    };

    const checkCyrillic = (e) => {
        const cyrillic = new RegExp(/[а-яА-Я]/g).test(e.target.value);
        if (errorLabelRef.current) {
            errorLabelRef.current.style.opacity = 0;
        }

        if (cyrillic) {
            if (errorLabelRef.current) {
                errorLabelRef.current.textContent = 'Cyrillic is not allowed';
                errorLabelRef.current.style.opacity = 1;
            }
        } else {
            if (e.target.id === 'passwordInput') setPassword(e.target.value);
            else if (e.target.id === 'confirmPasswordInput') setConfirmPassword(e.target.value);
        }
    };

    if (redirect) {
        return <Navigate to="/login"/>;
    }

    return (
        <div>
            <div className="register-container">
                <span className="register-text">Registration</span>

                <form onSubmit={submit} className="form">
                    <input type="email"
                           className="form-control"
                           placeholder="name@example.com"
                           required
                           onChange={(e) => setEmail(e.target.value)}/>

                    <input type="username"
                           className="form-control"
                           placeholder="Name"
                           required
                           onChange={(e) => setName(e.target.value)}/>

                    <input type="password"
                           id="passwordInput"
                           className="form-control"
                           placeholder="Password"
                           required
                           onChange={(e) => checkCyrillic(e)}/>

                    <input type="password"
                           id="confirmPasswordInput"
                           className="form-control"
                           placeholder="Repeat password"
                           required
                           onChange={(e) => checkCyrillic(e)}/>

                    <button className="submit-button" type="submit">Submit</button>
                </form>
            </div>
            <label className="error-message" ref={errorLabelRef} content="" id="errorLabel" style={{opacity: 0, transition: 'opacity 0.2s'}}></label>

        </div>


    );
};

export default Register;
