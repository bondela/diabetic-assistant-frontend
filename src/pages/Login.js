import React, {useRef} from 'react';
import {Navigate} from "react-router-dom";
import "../styles/pages/login.css"
import "../styles/pages/errors.css"

const Login = (props) => {
    const [email, setEmail] = React.useState("")
    const [password, setPassword] = React.useState("")
    const [remember, setRemember] = React.useState(false)
    const [redirect, setRedirect] = React.useState(false)

    const errorLabelRef = useRef(null);


    const submit = async (e) => {
        e.preventDefault()

        const rememberString = remember.toString()
        const response = (await fetch("http://localhost:8000/api/login", {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            credentials: "include",
            body: JSON.stringify({
                email,
                password,
                rememberString,
            })
        }))
        const data = await response.json()

        if (errorLabelRef.current) {
            errorLabelRef.current.style.opacity = 0;
        }

        if (data.message === "user not found") {
            errorLabelRef.current.textContent = "Profile with this email do not exists";
            errorLabelRef.current.style.opacity = 1;
            return
        }

        if (data.message === "incorrect password") {
            errorLabelRef.current.textContent = "Wrong password";
            errorLabelRef.current.style.opacity = 1;
            return
        }

        props.setName(data.name)
        setRedirect(true)
    }

    if (redirect) {
        return <Navigate to="/"/>
    }

    return (
        <div>
            <div className="login-container">
                <span className="login-text">Sign in 👋</span>

                <form onSubmit={submit} className="form">
                    <input type="email"
                           className="form-control"
                           placeholder="name@example.com"
                           onChange={e => setEmail(e.target.value)}/>

                    <input type="password"
                           className="form-control"
                           placeholder="Password"
                           required
                           onChange={e => setPassword(e.target.value)}/>

                    <div className="login-checkbox">
                        <input type="checkbox" defaultChecked={true} onChange={e => setRemember((e.target.checked))}/>
                        <label className="login-checkbox-text">Remember me</label>
                    </div>

                    <button className="submit-button"
                            type="submit">Sign in
                    </button>
                </form>

            </div>
        <label className="error-message" ref={errorLabelRef} content="" id="errorLabel"
               style={{opacity: 0, transition: 'opacity 0.2s'}}></label>
    </div>

)
    ;
};

export default Login;
