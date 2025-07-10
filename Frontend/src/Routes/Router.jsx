import { Suspense, lazy } from 'react'
import { createBrowserRouter, RouterProvider } from "react-router-dom";

const Dashboard     = lazy(()=> import ("../Components/Dashboard/Dashboard"));
const Loader        = lazy(()=> import ("../SharedComponents/Loader/Loader"));
const Login         = lazy(()=> import ("../SharedComponents/Login/Login"));
const Layout        = lazy(()=> import ("../SharedComponents/Layout/Layout"));
const OnBoard       = lazy(()=> import ("../Components/OnBoard/OnBoard"));
const Register      = lazy(()=> import ("../SharedComponents/Signup/Signup"));

const router = createBrowserRouter([
    { path: '/login', element: <Login /> },
    { path: '/register', element: <Register /> },
    {
        path: '/', element: <Layout />, children: [
            { index: true, element: <Dashboard /> },
            { path: 'onboard', element: <OnBoard /> }
        ]
    },
]);

function Router() {
    return (
        <Suspense fallback={<Loader/>}>
            <RouterProvider router={router}/>
        </Suspense>
    )
}

export default Router;