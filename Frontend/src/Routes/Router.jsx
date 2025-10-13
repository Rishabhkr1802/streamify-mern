import { Suspense, lazy } from 'react'
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { hasAuthenticated } from '../utils/Helper';

const Chat          = lazy( () => import ("../Components/Chat/Chat"));
const Dashboard     = lazy( () => import ("../Components/Dashboard/Dashboard"));
const Loader        = lazy( () => import ("../SharedComponents/Loader/Loader"));
const Login         = lazy( () => import ("../SharedComponents/Login/Login"));
const Layout        = lazy( () => import ("../SharedComponents/Layout/Layout"));
const Notification  = lazy( () => import ("../Components/Notification/Notification"));
const OnBoard       = lazy( () => import ("../Components/OnBoard/OnBoard"));
const Register      = lazy( () => import ("../SharedComponents/Signup/Signup"));
const Friends       = lazy( () => import ("../Components/Friends/Friends"));
const VideoCall     = lazy( () => import ("../Components/VideoCall/VideoCall"));
const Profile       = lazy( () => import ("../Components/Profile/Profile"));

  const router = createBrowserRouter([
        { path: '/login',       element: <Login />      },
        { path: '/register',    element: <Register />   },
        { path: '/on-boarding', element: <OnBoard />    },
        {
            path: '/', element: <Layout />,
            loader: hasAuthenticated,
            children: [
                { index: true,              element: <Dashboard /> },
                { path: 'friends',          element: <Friends /> },
                { path: 'notification',     element: <Notification /> },
                { path: 'chat/:id',         element: <Chat /> },
                { path: 'video-call/:id',   element: <VideoCall /> },
                { path: 'profile',          element: <Profile /> },
            ]
        },
    ]);

function Router() {
    return (
        <Suspense fallback={<Loader/>}>
            <RouterProvider router={router}/>
        </Suspense>
    );
};

export default Router;