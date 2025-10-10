import { Outlet } from 'react-router-dom';
import styles from "./Layout.module.css";
import Sidebar from "../Sidebar/Sidebar"
import Header from "../Header/Header";

function Layout() {
    return (
        <main className={`${styles.wrapper}`}>
            <section className={styles.headerSection}>
                <Header />
            </section>
            <section className={styles.mainContainer}>
                <div className={styles.sidebarSection}>
                    <Sidebar />
                </div>
                <div className={styles.outlet}>
                    <Outlet />
                </div>
            </section>
        </main>
    )
}

export default Layout;