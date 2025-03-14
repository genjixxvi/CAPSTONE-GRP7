import { useState } from "react";
import axiosClient from "../../axiosClient";
import { UseStateContext } from "../../context/contextProvider";
import { FiEdit } from "react-icons/fi";
import { MdClose } from "react-icons/md";
import profile from "../../assets/profile.jpg";

const ProfileUpdate = () => {
    const { user, setUser } = UseStateContext();
    const [file, setFile] = useState(null);
    const [isNameModalOpen, setIsNameModalOpen] = useState(false);
    const [newName, setNewName] = useState(user.name);
    const [passwords, setPasswords] = useState({
        current_password: "",
        new_password: "",
        confirm_password: "",
    });
    const [errors, setErrors] = useState({
        current_password: "",
        new_password: "",
        confirm_password: "",
    });
    const profilePictureUrl = user.profile_picture ? user.profile_picture : profile;

    const [isPhotoModalOpen, setIsPhotoModalOpen] = useState(false);

    const handleProfileUpdate = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append("name", newName);
        if (file) formData.append("profile_picture", file);

        try {
            const response = await axiosClient.post("/update-profile", formData, {
                headers: { "Content-Type": "multipart/form-data" },
            });
            alert("Profile updated successfully!");
            setUser(response.data.user);
            setIsNameModalOpen(false);
        } catch (error) {
            console.error("Error updating profile:", error.response?.data);
            alert(error.response?.data?.error || "Something went wrong");
        }
    };

    const handleChangePassword = async (e) => {
        e.preventDefault();

        let validationErrors = { ...errors };

        if (passwords.new_password !== passwords.confirm_password) {
            validationErrors.confirm_password = "Passwords do not match";
        } else {
            validationErrors.confirm_password = "";
        }

        if (!passwords.current_password) {
            validationErrors.current_password = "Current password is required";
        } else {
            validationErrors.current_password = "";
        }

        if (!passwords.new_password) {
            validationErrors.new_password = "New password is required";
        } else {
            validationErrors.new_password = "";
        }

        setErrors(validationErrors);
        if (Object.values(validationErrors).some((error) => error !== "")) {
            return;
        }

        try {
            await axiosClient.post("/change-password", {
                current_password: passwords.current_password,
                new_password: passwords.new_password,
                new_password_confirmation: passwords.confirm_password,
            });

            alert("Password changed successfully!");
            setPasswords({ current_password: "", new_password: "", confirm_password: "" });
        } catch (error) {
            console.error("Error changing password:", error.response?.data);
            setErrors({
                ...errors,
                current_password: "Incorrect current password",
            });
        }
    };

    const isPasswordMatching = passwords.new_password && passwords.new_password === passwords.confirm_password;

    const handlePhotoUpdate = (e) => {
        setFile(e.target.files[0]);
    };

    const handleClosePhotoModal = () => {
        setIsPhotoModalOpen(false);
        setFile(null);
    };

    const handleUpdatePhoto = async () => {
        if (file) {
            const formData = new FormData();
            formData.append("profile_picture", file);
            formData.append("name", user.name);

            try {
                const response = await axiosClient.post("/update-profile", formData, {
                    headers: { "Content-Type": "multipart/form-data" },
                });
                alert("Profile picture updated successfully!");
                setUser(response.data.user);
                setIsPhotoModalOpen(false);
            } catch (error) {
                console.error("Error updating profile picture:", error.response?.data);
                alert("Something went wrong with updating the photo.");
            }
        }
    };

    return (
        <div className="max-w-6xl mx-auto p-6 bg-gray-50 rounded-lg shadow-xl mt-[100px]">
            <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">Update Profile</h2>

            <div className="flex flex-col lg:flex-row lg:space-x-10">
                <div className="flex-1 mb-6 lg:mb-0 space-y-4">
                    <div className="flex flex-col items-center mb-4">
                    <label htmlFor="profilePic" className="cursor-pointer relative">
                        <img
                            src={profilePictureUrl}
                            alt="Profile"
                            className="w-32 h-32 rounded-full border-4 border-gray-300 object-cover transition-all hover:border-blue-500"
                            onClick={() => setIsPhotoModalOpen(true)}
                        />
                        <div className="absolute bottom-1 right-1 p-2 rounded-full text- transition-all">
                            <FiEdit 
                                className="w-5 h-5 cursor-pointer text-blue-500 bg-white transition-all rounded-full p-1"
                                onClick={() => setIsPhotoModalOpen(true)}
                                />
                        </div>
                    </label>
                        {isPhotoModalOpen && (
                            <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 ml-12">
                                <div className="bg-white p-6 rounded-lg shadow-lg w-96 sm:w-80 md:w-96 lg:w-96 xl:w-1/3">
                                    <div className="flex justify-between items-center mb-4">
                                        <h2 className="text-lg font-bold">Upload New Profile Picture</h2>
                                        <MdClose
                                            className="cursor-pointer text-gray-600 hover:text-gray-800"
                                            onClick={handleClosePhotoModal}
                                        />
                                    </div>

                                    <label htmlFor="profilePicUpload" className="cursor-pointer flex justify-center items-center w-32 h-32 sm:w-40 sm:h-40 rounded-full bg-gray-200 border-4 border-gray-300 overflow-hidden mx-auto mb-4 relative">
                                        <img
                                            src={file ? URL.createObjectURL(file) : profilePictureUrl}
                                            alt="Profile"
                                            className="w-full h-full object-cover"
                                        />
                                        <div className="absolute text-white text-xl sm:text-2xl bg-blue-500 p-2 sm:p-3 rounded-full">
                                            <FiEdit />
                                        </div>
                                    </label>

                                    <input
                                        type="file"
                                        id="profilePicUpload"
                                        className="hidden"
                                        onChange={handlePhotoUpdate}
                                    />

                                    <div className="flex justify-end gap-2 mt-4">
                                        <button onClick={handleClosePhotoModal} className="px-4 py-2 bg-gray-400 text-white rounded-md hover:bg-gray-500 transition-all">Cancel</button>
                                        <button onClick={handleUpdatePhoto} className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-all">Update</button>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>

                    <div className="mb-4">
                        <label className="block text-lg font-semibold text-gray-700">Email</label>
                        <input
                            type="email"
                            value={user.email}
                            disabled
                            className="w-full p-3 border border-gray-300 rounded-lg bg-gray-100 text-gray-500 cursor-not-allowed"
                        />
                    </div>

                    <div className="mb-4 flex items-center justify-between">
                        <label className="block text-lg font-semibold text-gray-700">Name</label>
                        <div className="flex items-center gap-2">
                            <span className="text-gray-700">{user.name}</span>
                            <FiEdit className="cursor-pointer text-blue-500 hover:text-blue-600 transition-all" onClick={() => setIsNameModalOpen(true)} />
                        </div>
                    </div>
                </div>

                <div className="hidden lg:block w-px bg-gray-300 mx-6"></div>

                <div className="flex-1">
                    <form onSubmit={handleChangePassword}>
                        <div className="mb-6">
                            <label className="block text-lg font-semibold text-gray-700">Current Password</label>
                            <input
                                type="password"
                                value={passwords.current_password}
                                onChange={(e) => setPasswords({ ...passwords, current_password: e.target.value })}
                                className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 ${errors.current_password || errors.confirm_password ? 'border-red-500' : 'border-gray-300'}`}
                            />
                        </div>
                        <div className="mb-6">
                            <label className="block text-lg font-semibold text-gray-700">New Password</label>
                            <input
                                type="password"
                                value={passwords.new_password}
                                onChange={(e) => setPasswords({ ...passwords, new_password: e.target.value })}
                                className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 ${errors.new_password || errors.confirm_password ? 'border-red-500' : 'border-gray-300'}`}
                            />
                            {errors.new_password && <p className="text-red-500 text-sm mt-1">{errors.new_password}</p>}
                        </div>
                        <div className="mb-6">
                            <label className="block text-lg font-semibold text-gray-700">Confirm New Password</label>
                            <input
                                type="password"
                                value={passwords.confirm_password}
                                onChange={(e) => setPasswords({ ...passwords, confirm_password: e.target.value })}
                                className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 ${errors.confirm_password ? 'border-red-500' : isPasswordMatching ? 'border-green-500' : 'border-gray-300'}`}
                            />
                            {errors.confirm_password && <p className="text-red-500 text-sm mt-1">{errors.confirm_password}</p>}
                        </div>
                        <button type="submit" className="w-[220px] py-3 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-all">
                            Change Password
                        </button>
                    </form>
                </div>
            </div>

            {isNameModalOpen && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 ml-12">
                    <div className="bg-white p-6 rounded-lg shadow-lg w-96">
                        <div className="flex justify-between items-center mb-4">
                            <h2 className="text-lg font-bold">Edit Name</h2>
                            <MdClose className="cursor-pointer text-gray-600 hover:text-gray-800" onClick={() => setIsNameModalOpen(false)} />
                        </div>
                        <input
                            type="text"
                            value={newName}
                            onChange={(e) => setNewName(e.target.value)}
                            className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
                        />
                        <div className="flex justify-end gap-2 mt-4">
                            <button onClick={() => setIsNameModalOpen(false)} className="px-4 py-2 bg-gray-400 text-white rounded-md hover:bg-gray-500 transition-all">Cancel</button>
                            <button onClick={handleProfileUpdate} className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-all">Update</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ProfileUpdate;
