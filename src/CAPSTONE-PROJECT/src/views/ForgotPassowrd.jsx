import { useState } from "react";
import axiosClient from "../axiosClient";
import { useNavigate } from "react-router-dom";

const ForgotPassword = () => {
    const [email, setEmail] = useState("");
    const [emailError, setEmailError] = useState("");
    const [step, setStep] = useState(1);
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [passwordError, setPasswordError] = useState("");
    const navigate = useNavigate();

    const handleEmailSubmit = async () => {
        try {
            setEmailError("");
            const response = await axiosClient.post("/forgot-password", { email });

            if (response.data.success) {
                setStep(2);
            }
        // eslint-disable-next-line no-unused-vars
        } catch (error) {
            setEmailError("Email not found. Please try again.");
        }
    };

    const handlePasswordSubmit = async () => {
        if (newPassword !== confirmPassword) {
            setPasswordError("Passwords do not match.");
            return;
        }

        try {
            const response = await axiosClient.post("/reset-password", {
                email,
                password: newPassword,
                password_confirmation: confirmPassword,
            });

            if (response.data.success) {
                alert("Password reset successfully! You can now log in.");
                navigate("/auth");
            }
        // eslint-disable-next-line no-unused-vars
        } catch (error) {
            setPasswordError("Something went wrong. Try again.");
        }
    };

    return (
        <div className="flex items-center justify-center h-screen">
            <div className="max-w-md mx-auto p-6 bg-white shadow-md rounded-lg">
            {step === 1 ? (
                <>
                    <h2 className="text-2xl font-semibold mb-4">Forgot Password</h2>
                    <p className="text-gray-600 mb-4">Enter your email to reset your password.</p>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Enter your email"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    {emailError && <p className="text-red-500">{emailError}</p>}
                    <button onClick={handleEmailSubmit} className="w-full mt-4 bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition">
                        Submit
                    </button>
                </>
            ) : (
                <>
                    <h2 className="text-2xl font-semibold mb-4">Reset Your Password</h2>
                    <input
                        type="password"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        placeholder="New Password"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <input
                        type="password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        placeholder="Confirm Password"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md mt-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    {passwordError && <p className="text-red-500">{passwordError}</p>}
                    <button onClick={handlePasswordSubmit} className="w-full mt-4 bg-green-600 text-white py-2 rounded-md hover:bg-green-700 transition">
                        Reset Password
                    </button>
                </>
            )}
            </div>
        </div>
    );
};

export default ForgotPassword;
