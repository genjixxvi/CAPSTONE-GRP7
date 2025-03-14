import { useState, useEffect } from "react";
import axiosClient from "../../axiosClient";
import DeleteFeedbacks from "./deleteFeedbacks";
import { Search } from "lucide-react";
import { Star } from "lucide-react";

function Feedback() {
    const [userFeedBack, setUserFeedBack] = useState([]);
    const [searchQuery, setSearchQuery] = useState("");

    useEffect(() => {
        axiosClient.get('/feedback')
            .then((response) => {
                setUserFeedBack(response.data.feedback);
            }).catch((error) => {
                console.log("error fetching", error);
            })
    }, []);
    const filteredFeebacks = userFeedBack.filter((feedBacks) => {
        return (
            feedBacks.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            feedBacks.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
            feedBacks.feedback.toLowerCase().includes(searchQuery.toLowerCase())
        );
    });

    return (
        <div>
            <h1 className="title mb-4">Feedback</h1>
            <div className="card">
                <div className="card-header flex-row justify-between">
                    <p className="card-title">User feedbacks</p>
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
                                    <th className="table-head">FeedBack</th>
                                    <th className="table-head w-24">Rating</th>
                                    <th className="table-head text-center w-10">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="table-body">
                                {filteredFeebacks.length > 0 ? (
                                    filteredFeebacks.map((feedBacks) => (
                                        <tr key={feedBacks.id} className="table-row">
                                            <td className="table-cell w-24">
                                                <div className="flex w-max gap-x-4">
                                                <img
                                                    src={feedBacks.profile_picture}
                                                    alt={feedBacks.name}
                                                    className="size-14 rounded-lg object-cover"
                                                />
                                                    <div className="flex flex-col">
                                                        <p>{feedBacks.name}</p>
                                                        <p className="font-normal text-slate-600 dark:text-slate-400">{feedBacks.email}</p>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="table-cell">{feedBacks.feedback}</td>
                                            <td className="table-cell">
                                            <div className="flex items-center gap-x-1">
                                                <Star
                                                    size={18}
                                                    className="fill-yellow-600 stroke-yellow-600"
                                                />
                                                {feedBacks.rating}
                                            </div>
                                             </td>
                                            <td className="table-cell text-center">
                                                <DeleteFeedbacks userId={feedBacks.id} />
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan="4" className="text-center">No feedbacks found.</td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Feedback;