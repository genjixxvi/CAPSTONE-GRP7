import { Area, AreaChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { useTheme } from "@/hooks/use-theme";
import { Footer } from "@/layouts/footer";
import { Send, User, NotepadText  } from "lucide-react";
import axiosClient from "../../axiosClient";
import { useState, useEffect } from "react";
import DeleteUser from "./deleteUser";

const DashboardPage = () => {
    const { theme } = useTheme();
    const [ users, setUsers, ] = useState([]);
    const [loading, setLoading] = useState(true);
    const [userCount, setUserCount] = useState(0);
    const [feedbackCount, setFeedbackCount] = useState(0);
    const [contactCount, setContactCount] = useState(0);
    const [monthlyUserData, setMonthlyUserData] = useState([]);

    const months = [
        "Jan", "Feb", "Mar", "Apr", "May", "Jun",
        "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
      ];

      useEffect(() => {
        axiosClient.get("/users-by-month")
            .then((response) => {
                const data = response.data;
                const monthData = months.map(month => {
                    const monthData = data.find(d => d.month === month);
                    return {
                        name: month,
                        total: monthData ? monthData.count : 0
                    };
                });
                setMonthlyUserData(monthData);
            })
            .catch((error) => {
                console.error("Error fetching monthly user data:", error);
            });
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);  

    useEffect(() => {
        axiosClient.get("/users")
        .then((response) => {
            setUsers(response.data);
            setLoading(false);  
        })
        .catch((error) => {
           console.error("error fetching", error);
           setLoading(false);
        });
    }, []);

    useEffect(() => {
        axiosClient.get("/user-count")
            .then((response) => {
                setUserCount(response.data.user_count);
            })
            .catch((error) => {
                console.error("Error fetching user count:", error);
            });
    }, []);
    
    useEffect(() => {
        axiosClient.get("/feedback")
            .then((response) => {
                setFeedbackCount(response.data.total);
            })
            .catch((error) => {
                console.error("Error fetching feedback count:", error);
            });
    }, []);
    
    useEffect(() => {
        axiosClient.get("/contact-count")
            .then((response) => {
                setContactCount(response.data);
            })
            .catch((error) => {
                console.error("Error fetching feedback count:", error);
            });
    }, []);

    if (loading) {
        return <div>Loadingg...</div>
    }

    return (
        <div className="flex flex-col gap-y-4">
            <h1 className="title">Dashboard</h1>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3">
                <div className="card">
                    <div className="card-header">
                        <div className="w-fit rounded-lg bg-blue-500/20 p-2 text-blue-500 transition-colors dark:bg-blue-600/20 dark:text-blue-600">
                            <User size={26} />
                        </div>
                        <p className="card-title">Users</p>
                    </div>
                    <div className="card-body bg-slate-100 transition-colors dark:bg-slate-950">
                        <p className="text-3xl font-bold text-slate-900 transition-colors dark:text-slate-50">{userCount}</p>
                        <span className="flex w-fit items-center gap-x-2 rounded-full border border-blue-500 px-2 py-1 font-medium text-blue-500 dark:border-blue-600 dark:text-blue-600">
                            TOTAL
                        </span>
                    </div>
                </div>
                <div className="card">
                    <div className="card-header">
                        <div className="rounded-lg bg-blue-500/20 p-2 text-blue-500 transition-colors dark:bg-blue-600/20 dark:text-blue-600">
                            <NotepadText  size={26} />
                        </div>
                        <p className="card-title">feedback</p>
                    </div>
                    <div className="card-body bg-slate-100 transition-colors dark:bg-slate-950">
                        <p className="text-3xl font-bold text-slate-900 transition-colors dark:text-slate-50">{feedbackCount}</p>
                        <span className="flex w-fit items-center gap-x-2 rounded-full border border-blue-500 px-2 py-1 font-medium text-blue-500 dark:border-blue-600 dark:text-blue-600">
                            TOTAL
                        </span>
                    </div>
                </div>
                <div className="card">
                    <div className="card-header">
                        <div className="rounded-lg bg-blue-500/20 p-2 text-blue-500 transition-colors dark:bg-blue-600/20 dark:text-blue-600">
                            <Send size={26} />
                        </div>
                        <p className="card-title">Suggestions</p>
                    </div>
                    <div className="card-body bg-slate-100 transition-colors dark:bg-slate-950">
                        <p className="text-3xl font-bold text-slate-900 transition-colors dark:text-slate-50">{contactCount}</p>
                        <span className="flex w-fit items-center gap-x-2 rounded-full border border-blue-500 px-2 py-1 font-medium text-blue-500 dark:border-blue-600 dark:text-blue-600">
                            TOTAL
                        </span>
                    </div>
                </div>
            </div>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-7">
                <div className="card col-span-1 md:col-span-2 lg:col-span-4">
                    <div className="card-header">
                        <p className="card-title">Overview</p>
                    </div>
                    <div className="card-body p-0">
                        <ResponsiveContainer
                            width="100%"
                            height={300}
                        >
                            <AreaChart
                                data={monthlyUserData}
                                margin={{
                                    top: 0,
                                    right: 0,
                                    left: 0,
                                    bottom: 0,
                                }}
                            >
                                <defs>
                                    <linearGradient
                                        id="colorTotal"
                                        x1="0"
                                        y1="0"
                                        x2="0"
                                        y2="1"
                                    >
                                        <stop
                                            offset="5%"
                                            stopColor="#2563eb"
                                            stopOpacity={0.8}
                                        />
                                        <stop
                                            offset="95%"
                                            stopColor="#2563eb"
                                            stopOpacity={0}
                                        />
                                    </linearGradient>
                                </defs>
                                <Tooltip
                                    cursor={false}
                                    formatter={(value) => `${value}`}
                                />

                                <XAxis
                                    dataKey="name"
                                    strokeWidth={0}
                                    stroke={theme === "light" ? "#475569" : "#94a3b8"}
                                    tickMargin={6}
                                />
                                <YAxis
                                    dataKey="total"
                                    strokeWidth={0}
                                    stroke={theme === "light" ? "#475569" : "#94a3b8"}
                                    tickFormatter={(value) => Math.round(value)}
                                    tickMargin={6}
                                />

                                <Area
                                    type="monotone"
                                    dataKey="total"
                                    stroke="#2563eb"
                                    fillOpacity={1}
                                    fill="url(#colorTotal)"
                                />
                            </AreaChart>
                        </ResponsiveContainer>
                    </div>
                </div>
                <div className="card col-span-1 md:col-span-2 lg:col-span-3">
                    <div className="card-header">
                        <p className="card-title">Users</p>
                    </div>
                    <div className="card-body h-[300px] overflow-auto p-0">
                        {users.map((user) => (
                            <div
                                key={user.id}
                                className="flex items-center justify-between gap-x-4 py-2 pr-2"
                            >
                                <div className="flex items-center gap-x-4">
                                    <img
                                        src={user.profile_picture_url}
                                        alt={user.name}
                                        className="size-10 flex-shrink-0 rounded-full object-cover"
                                    />
                                    <div className="flex flex-col gap-y-2">
                                        <p className="font-medium text-slate-900 dark:text-slate-50">{user.name}</p>
                                        <p className="text-sm text-slate-600 dark:text-slate-400">{user.email}</p>
                                    </div>
                                </div>
                                <p className="font-medium text-slate-900 dark:text-slate-50">user</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            <div className="card">
                <div className="card-header">
                    <p className="card-title">Manage User</p>
                </div>
                <div className="card-body p-0">
                    <div className="relative h-[500px] w-full flex-shrink-0 overflow-auto rounded-none [scrollbar-width:_thin]">
                        <table className="table">
                            <thead className="table-header">
                                <tr className="table-row">
                                    <th className="table-head">Name</th>
                                    <th className="table-head">Created_At</th>
                                    <th className="table-head">Updated_At</th>
                                    <th className="table-head text-center">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="table-body">
                                {users.map((user) => (
                                    <tr
                                        key={user.id}
                                        className="table-row"
                                    >
                                        <td className="table-cell">
                                            <div className="flex w-max gap-x-4">
                                                <img
                                                    src={user.profile_picture_url}
                                                    alt={user.name}
                                                    className="size-14 rounded-lg object-cover"
                                                />
                                                <div className="flex flex-col">
                                                    <p>{user.name}</p>
                                                    <p className="font-normal text-slate-600 dark:text-slate-400">{user.email}</p>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="table-cell">{user.created_at}</td>
                                        <td className="table-cell">{user.updated_at}</td>
                                        <td className="table-cell">
                                            <DeleteUser userId={user.id}/>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default DashboardPage;
