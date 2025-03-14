import { Send, Home, NotepadText, LogOut, Users } from "lucide-react";

export const navbarLinks = [
    {
        title: "Dashboard",
        links: [
            {
                label: "Dashboard",
                icon: Home,
                path: "/",
            },
            {
                label: "Suggestions",
                icon: Send,
                path: "/suggestion",
            },
            {
                label: "Feedback",
                icon: NotepadText,
                path: "/feedback",
            },
        ],
    },
    {
        title: "User",
        links: [
            {
                label: "users",
                icon: Users,
                path: "/users",
            },
        ],
    },
    {
        title: "other",
        links: [
            {
                label: "Logout",
                icon: LogOut,
                action: "logout",
                path: "/auth/login",
            },
        ],
    },
];

export const overviewData = [
    {
        name: "Jan",
        total: 0,
    },
    {
        name: "Feb",
        total: 0,
    },
    {
        name: "Mar",
        total: 0,
    },
    {
        name: "Apr",
        total: 0,
    },
    {
        name: "May",
        total: 0,
    },
    {
        name: "Jun",
        total: 0,
    },
    {
        name: "Jul",
        total: 0,
    },
    {
        name: "Aug",
        total: 0,
    },
    {
        name: "Sep",
        total: 0,
    },
    {
        name: "Oct",
        total: 0,
    },
    {
        name: "Nov",
        total: 0,
    },
    {
        name: "Dec",
        total: 0,
    },
];