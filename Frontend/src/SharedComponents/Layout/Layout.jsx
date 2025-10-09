import { Outlet } from 'react-router-dom';
import Sidebar from "../Sidebar/Sidebar"
import Header from "../Header/Header";

function Layout() {
    return (
        <div className="container-fluid">
            <div className="row">
                <div className="col-2">
                    <Sidebar />
                </div>
                <div className="col-10 ">
                    <Header />
                    <Outlet />
                </div>
            </div>
        </div>
    )
}

export default Layout;