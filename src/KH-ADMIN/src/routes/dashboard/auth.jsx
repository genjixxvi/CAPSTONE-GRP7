import logo from "../../assets/logo-no-bg.png";
import { useRef, useState } from "react";
import axiosClient from "../../axiosClient";
import { UseStateContext } from "../../contexts/contextProvider";
import { Navigate } from "react-router-dom";

const Auth = () => {
    const emailRef = useRef();
    const passwordRef = useRef();
    const { setUser, setToken } = UseStateContext();
    const [errorMessage, setErrorMessage] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        const email = emailRef.current.value;
        const password = passwordRef.current.value;

        const payload = { email, password };
        
        axiosClient.post("/login", payload)
            .then(({ data }) => {
                setUser(data.user);
                setToken(data.token);
                <Navigate to="/" />
            })
            .catch(err => {
                const response = err.response;
                if (response && response.status === 404) {
                    setErrorMessage('Unauthorized Email.');
                } else if (response && response.status === 401) {
                    setErrorMessage('access denied');
                } else {
                    setErrorMessage('Something went wrong');
                }
            });
    };

    return (
        <div className="flex items-center justify-center h-screen bg-gray-100">
            <form onSubmit={handleSubmit}>
                <div className="bg-white w-96 p-6 rounded-lg shadow-lg">
                    <div className="flex flex-center m-auto justify-center mb-4 w-36 h-36 border-[2px] border-black rounded-full">
                        <img src={logo} alt="Logo" />
                    </div>

                    {errorMessage && (
                        <div className="bg-red-500 px-3 py-2 rounded text-gray-100 mb-3">
                            <p>{errorMessage}</p>
                        </div>
                    )}

                    <label className="text-gray-700">Email</label>
                    <input
                        ref={emailRef}
                        type="email"
                        className="w-full py-2 bg-gray-50 text-gray-500 px-1 mb-4 rounded border border-gray-300 focus:outline-none"
                    />
                    <label className="text-gray-700 mt-4">Password</label>
                    <input
                        ref={passwordRef}
                        type="password"
                        className="w-full py-2 bg-gray-50 text-gray-500 px-1 mb-4 rounded border border-gray-300 focus:outline-none"
                    />
                    <button type="submit" className="bg-blue-500 w-full text-gray-100 py-2 mt-2 rounded hover:bg-blue-600 transition-colors">
                        Login
                    </button>
                </div>
            </form>
        </div>
    );
};

export default Auth;
