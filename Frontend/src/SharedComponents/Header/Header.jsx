import { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styles from "./Header.module.css";
import toast from 'react-hot-toast';
import { MdNotificationsActive } from "react-icons/md";
import { HiOutlineBars3 } from "react-icons/hi2";
import { CgProfile } from "react-icons/cg";
import { logout } from "../../utils/Api";

function Header() {
  const dropdownRef                     = useRef();
  const navigate                        = useNavigate();
  const user                            = JSON.parse(localStorage.getItem('user'));
  const [showDropdown, setShowDropdown] = useState(false);
  // const [showSidebar, setShowSidebar]   = useState(false);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) setShowDropdown(false);
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  async function logoutHandler() {
    try {
        logout();
        toast.success("Logout successful!");
        setTimeout(() => navigate('/login'), 1000);
        localStorage.removeItem('token');
        localStorage.removeItem('user');
      return response.data;
    } catch (error) {
      console.error("login error", error);
    }
  }

  function togglePopup() { setShowDropdown((prev) => !prev) };

  function handleLogout() {
    logoutHandler();
  }

  // function toggleSidebar() { setShowSidebar((prev) => !prev) };

  return (
    <>
      <header className="bg-primary">
        <div className="d-flex justify-content-between align-items-center gap-4 px-3">
          <div className="logo">
            <Link to="/" className="text-decoration-none text-white shadow"><h2>Streamify</h2></Link>
          </div>

          <div className={`d-flex align-items-center gap-4 ${styles.icons} `} ref={dropdownRef}>
            <Link to="/notification"><MdNotificationsActive className={`shadow ${styles.white}`} size={24} /></Link>

            <div className={styles.profileSection} role="button" onClick={togglePopup}>
              {user?.profilePic ? <img src={user?.profilePic} alt="img" className="img-responsive rounded shadow" width={28} height={28} />
                : <CgProfile className={`shadow ${styles.white}`} size={24} />
              }

              {showDropdown &&
                <div className={`${styles.popup} shadow`}>
                  <div className="fw-bold border-bottom text-align-start">{user?.fullName.split(" ")[0] || "User"}</div>
                  <Link to="/profile" className="dropdown-item py-1 text-decoration-none text-dark">Profile</Link>
                  <button className="dropdown-item py-1 text-start text-danger" onClick={handleLogout}>Logout</button>
                </div>
              }
            </div>
          </div>

          <div className={styles.humburger}>
            <HiOutlineBars3 className={`${styles.white}`} size={30} />
          </div>
        </div>
      </header>

      {/* { showSidebar && <Sidebar />} */}
    </>
  )
}

export default Header;
