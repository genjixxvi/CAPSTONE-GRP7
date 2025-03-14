import { useRef, useState } from "react";
import axiosClient from "../../axiosClient.js";
import { UseStateContext } from '../../context/contextProvider.jsx';

const Register = () => {
    const { setUser, setToken } = UseStateContext();
    const [errors, setErrors] = useState({});

    const nameRef = useRef();
    const emailRef = useRef();
    const passwordRef = useRef();
    const confirmPasswordRef = useRef();

    const handleSubmit = (ev) => {
        ev.preventDefault();
        
        if (passwordRef.current.value !== confirmPasswordRef.current.value) {
            setErrors({ confirm_password: ["Passwords do not match"] });
            return;
        }

        const payload = {
            name: nameRef.current.value,
            email: emailRef.current.value,
            password: passwordRef.current.value,
        };

        axiosClient.post("/register", payload)
            .then(({ data }) => {
                setUser(data.user);
                setToken(data.token);
            })
            .catch(err => {
                const response = err.response;
                if (response && response.status === 422) {
                    setErrors(response.data.errors);
                }
            });
    };

    return (
        <form onSubmit={handleSubmit} className="custom-sign-up-form">
            <h2 className="custom-title">Sign up</h2>

            <div className="custom-input-field border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 hover:border-blue-500 transition duration-200">
                <i className="fas fa-user"></i>
                <input ref={nameRef} type="text" placeholder="Username" />

            </div>

            <div className="custom-input-field border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 hover:border-blue-500 transition duration-200">
                <i className="fas fa-envelope"></i>
                <input ref={emailRef} type="email" placeholder="Email" />
            </div>

            <div className="custom-input-field border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 hover:border-blue-500 transition duration-200">
                <i className="fas fa-lock"></i>
                <input ref={passwordRef} type="password" placeholder="Password" />
            </div>

            <div className="custom-input-field border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 hover:border-blue-500 transition duration-200">
                <i className="fas fa-lock"></i>
                <input ref={confirmPasswordRef} type="password" placeholder="Confirm Password" />
            </div>
            {errors.name && <div className="text-red-600 text-sm">{errors.name[0]}</div>}
            {errors.email && <div className="text-red-600 text-sm">{errors.email[0]}</div>}
            {errors.password && <div className="text-red-600 text-sm">{errors.password[0]}</div>}
            {errors.confirm_password && <div className="text-red-600 text-sm">{errors.confirm_password[0]}</div>}
            <input type="submit" className="custom-btn" value="Sign up" />
        </form>
    );
};

export default Register;
