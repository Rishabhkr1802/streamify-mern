import { Link } from 'react-router-dom';
import styles from "./Sidebar.module.css";

function Sidebar() {
  return (
    <aside className={`${styles.sidebar}`}>
      <nav className="d-flex flex-column gap-3">

        <Link to="/" className={`${styles.link} shadow`}>
          <span>Dashboard</span>
        </Link>

        <Link to="/friends" className={`${styles.link} shadow`}>
          <span>Friends</span>
        </Link>

      </nav>
    </aside>
  )
}

export default Sidebar;