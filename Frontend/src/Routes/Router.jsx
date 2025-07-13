import { useQuery } from '@tanstack/react-query';
import { Suspense, lazy } from 'react'
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import ProtectedRoute from "../Routes/ProtectedRoute";
import { axiosInstance } from '../utils/Axios';

const Chat          = lazy(()=> import ("../Components/Chat/Chat"));
const Dashboard     = lazy(()=> import ("../Components/Dashboard/Dashboard"));
const Loader        = lazy(()=> import ("../SharedComponents/Loader/Loader"));
const Login         = lazy(()=> import ("../SharedComponents/Login/Login"));
const Layout        = lazy(()=> import ("../SharedComponents/Layout/Layout"));
const Notification  = lazy(()=> import ("../Components/Notification/Notification"));
const OnBoard       = lazy(()=> import ("../Components/OnBoard/OnBoard"));
const Register      = lazy(()=> import ("../SharedComponents/Signup/Signup"));
const VideoCall     = lazy(()=> import ("../Components/VideoCall/VideoCall"));

  const router = createBrowserRouter([
        { path: '/login', element: <Login /> },
        { path: '/register', element: <Register /> },
        { path: '/on-boarding', element: <OnBoard /> },
        {
            path: '/', element: <Layout />,
            children: [
                { index: true, element: <Dashboard /> },
                { index: 'notification', element: <Notification /> },
                { index: 'chat', element: <Chat /> },
                { index: 'call', element: <VideoCall /> },
            // <ProtectedRoute isAuth={!!user}>
            {/* </ProtectedRoute>, */}             
            ]
        },
    ]);

// async function fetchUser() {
//   const response = await axiosInstance.get("/auth/me");
//   return response.data;
// }

function Router() {    
//   const { data: user, isLoading } = useQuery({
//     queryKey: ['authUser'],
//     queryFn: fetchUser,
//     retry: false,
//   });

//   if (isLoading) return <Loader />;



    return (
        <Suspense fallback={<Loader/>}>
            <RouterProvider router={router}/>
        </Suspense>
    )
}

export default Router;