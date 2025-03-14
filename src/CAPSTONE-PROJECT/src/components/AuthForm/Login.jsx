import { useRef, useState } from "react";
import axiosClient from "../../axiosClient.js";
import { UseStateContext } from '../../context/contextProvider.jsx';
import { Link } from "react-router-dom";

const Login = () => {
    const { setUser, setToken } = UseStateContext();
    const [errorMessage, setErrorMessage] = useState("");

    const emailRef = useRef();
    const passwordRef = useRef();

    const handleSubmit = (ev) => {
        ev.preventDefault();
        const payload = {
            email: emailRef.current.value,
            password: passwordRef.current.value
        };

        axiosClient.post("/login", payload)
            .then(({ data }) => {
                setUser(data.user);
                setToken(data.token);
            })
            .catch(err => {
                const response = err.response;
                if (response && response.status === 404) {
                    setErrorMessage('Email not found.');
                } else if (response && response.status === 401) {
                    setErrorMessage('Invalid password. Please try again.');
                } else {
                    setErrorMessage('Something went wrong');
                }
            });
    };

    return (
        <form onSubmit={handleSubmit} className="custom-sign-in-form">
            <h2 className="custom-title">Log in</h2>

            <div className="custom-input-field border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 hover:border-blue-500 transition duration-200">
                <i className="fas fa-user"></i>
                <input
                    ref={emailRef}
                    type="email"
                    placeholder="Email"
                />
            </div>

            <div className="custom-input-field border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 hover:border-blue-500 transition duration-200">
                <i className="fas fa-lock"></i>
                <input
                    ref={passwordRef}
                    type="password"
                    placeholder="Password"
                />
            </div>

            <Link to='/reset-password' className="cursor-pointer text-blue-600 hover:underline">Forgot password?</Link>

            {errorMessage && <div className="text-red-600 text-sm">{errorMessage}</div>}

            <input type="submit" className="custom-btn" value="Login" />
        </form>
    );
};

export default Login;
