import { useState, useEffect } from "react";
import axiosClient from "../../axiosClient";
import DeleteMail from "./deleteMail";
import { Search } from "lucide-react";

function Mail() {
    const [email, setEmail] = useState([]);
    const [searchQuery, setSearchQuery] = useState("");

    useEffect(() => {
        axiosClient.get('/contact-us')
            .then((response) => {
                setEmail(response.data);
            }).catch((error) => {
                console.log("error fetching", error);
            });
    }, []);
    const filteredEmails = email.filter((contact) => {
        return (
            contact.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            contact.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
            contact.message.toLowerCase().includes(searchQuery.toLowerCase())
        );
    });

    return (
        <div>
            <h1 className="title mb-4">Mail</h1>
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
                                    <th className="table-head">Name</th>
                                    <th className="table-head">Message</th>
                                    <th className="table-head text-center w-10">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="table-body">
                                {filteredEmails.map((contact) => (
                                    <tr
                                        key={contact.id}
                                        className="table-row"
                                    >
                                        <td className="table-cell w-24">
                                            <div className="flex w-max gap-x-4">
                                                <div className="flex flex-col">
                                                    <p>{contact.name}</p>
                                                    <p className="font-normal text-slate-600 dark:text-slate-400">{contact.email}</p>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="table-cell">{contact.message}</td>
                                        <td className="table-cell text-center">
                                            <DeleteMail userId={contact.id}/>
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

export default Mail;
