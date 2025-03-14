import { useState, useEffect } from "react";
import axiosClient from "../../axiosClient";
import DeleteUser from "./deleteUser";
import { Search } from "lucide-react";

function GetUsers() {
    const [users, setUsers] = useState([]);
    const [searchQuery, setSearchQuery] = useState("");

    useEffect(() => {
        axiosClient.get('/users')
            .then((response) => {
                setUsers(response.data);
            }).catch((error) => {
                console.log("error fetching", error);
            });
    }, []);
    const filteredUser = users.filter((user) => {
        return (
            user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            user.email.toLowerCase().includes(searchQuery.toLowerCase())
        );
    });

    return (
        <div>
            <h1 className="title mb-4">Search User or Delete</h1>
            <div className="card">
                <div className="card-header flex-row justify-between">
                    <p className="card-title">Messages</p>
                    <div className="input">
                        <Search
                            size={20}
                            className="text-slate-300"
                        />
                        <input
                            type="text"
                            name="search"
                            id="search"
                            placeholder="Search..."
                            className="w-full bg-transparent text-slate-900 outline-0 placeholder:text-slate-300 dark:text-slate-50"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                    </div>
                </div>
                <div className="card-body p-0">
                    <div className="relative h-[500px] w-full flex-shrink-0 overflow-auto rounded-none [scrollbar-width:_thin]">
                        <table className="table">
                            <thead className="table-header">
                                <tr className="table-row">
                                    <th className="table-head">#</th>
                                    <th className="table-head">Name</th>
                                    <th className="table-head w-[200px]">Created_At</th>
                                    <th className="table-head text-center w-16">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="table-body">
                                {filteredUser.map((user) => (
                                    <tr
                                        key={user.id}
                                        className="table-row"
                                    >
                                        <td className="table-cell w-10">{user.id}</td>
                                        <td className="table-cell w-24">
                                            <div className="flex w-max gap-x-2">
                                                <img
                                                    src={user.profile_picture_url}
                                                    alt={user.name}
                                                    className="size-12 rounded-full object-cover"
                                                />
                                                <div className="flex flex-col">
                                                    <p>{user.name}</p>
                                                    <p className="font-normal text-slate-600 dark:text-slate-400">{user.email}</p>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="table-cell">{user.created_at}</td>
                                        <td className="table-cell text-center">
                                            <DeleteUser userId={user.id}/>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default GetUsers;
