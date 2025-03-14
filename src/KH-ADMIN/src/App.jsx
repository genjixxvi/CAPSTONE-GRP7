import { createBrowserRouter, RouterProvider } from "react-router-dom";

import { ThemeProvider } from "@/contexts/theme-context";

import Layout from "@/routes/layout";
import DashboardPage from "@/routes/dashboard/page";
import AuthLayout from "./routes/authLayout";
import Auth from "./routes/dashboard/auth";
import Mail from "./routes/dashboard/mail";
import Feedback from "./routes/dashboard/feedbacks";
import GetUsers from "./routes/dashboard/getUsers";

function App() {
    const router = createBrowserRouter([
        {
            path: "/",
            element: <Layout />,
            children: [
                {
                    index: true,
                    element: <DashboardPage />,
                },
                {
                    path: "suggestion",
                    element: <Mail />,
                },
                {
                    path: "feedback",
                    element: <Feedback />,
                },
                {
                    path: "users",
                    element: <GetUsers />,
                },
            ],
        },
        {
            path: "/auth",
            element: <AuthLayout />,
            children: [
                {
                    path: "/auth/login",
                    element: <Auth />
                }
            ]
        }
    ]);

    return (
        <ThemeProvider storageKey="theme">
            <RouterProvider router={router} />
        </ThemeProvider>
    );
}

export default App;
