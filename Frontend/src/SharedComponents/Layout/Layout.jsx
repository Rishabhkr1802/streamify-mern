import { Outlet } from 'react-router-dom';
import Sidebar from "../Sidebar/Sidebar"
import styles from './Layout.module.css';

function Layout() {
    return (
        <div className="container-fluid w-100 h-100">
            <div className="row">
                <div className="col-2">
                    <Sidebar />
                </div>
                <div className="col-8">
                    <Outlet />
                </div>
            </div>
        </div>
    )
}

export default Layout;