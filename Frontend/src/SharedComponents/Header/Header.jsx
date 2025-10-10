import { MdNotificationsActive } from "react-icons/md";
import { CgProfile } from "react-icons/cg";
import { Link } from "react-router-dom";

function Header() {
  const token = localStorage.getItem('token');
  const user = localStorage.getItem('user');
  const users = JSON.parse(user)

  return (
    <header className="bg-primary">
      <div className="d-flex justify-content-between align-items-center gap-4 px-3">
        <div className="logo">
          <Link to="/" className="text-decoration-none text-white shadow">
            <h2>Streamify</h2>
          </Link>
        </div>
        <div className="d-flex align-items-center gap-4">
          <Link to="/notification"><MdNotificationsActive className="shadow" size={24} style={{ color: "white" }} /></Link>

          {users.profilePic ? <img src={users.profilePic} alt="img" className="img-responsive rounded position-relative" width={28} height={28} /> :
            <CgProfile className="shadow" size={24} style={{ color: "white" }} />
          }

        </div>
        <p className="m-0">{users.fullName.split(" ")[0]}</p>
      </div>
    </header>
  )
}

export default Header;

// import { useState, useRef, useEffect } from "react";
// import { MdNotificationsActive } from "react-icons/md";
// import { CgProfile } from "react-icons/cg";
// import { Link, useNavigate } from "react-router-dom";

// function Header() {
//   const token = localStorage.getItem("token");
//   const user = localStorage.getItem("user");
//   const users = JSON.parse(user);
//   const navigate = useNavigate();

//   const [showDropdown, setShowDropdown] = useState(false);
//   const dropdownRef = useRef();

//   const toggleDropdown = () => setShowDropdown((prev) => !prev);

//   // Close dropdown when clicked outside
//   useEffect(() => {
//     const handleClickOutside = (event) => {
//       if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
//         setShowDropdown(false);
//       }
//     };
//     document.addEventListener("mousedown", handleClickOutside);
//     return () => document.removeEventListener("mousedown", handleClickOutside);
//   }, []);

//   const handleLogout = () => {
//     localStorage.removeItem("token");
//     localStorage.removeItem("user");
//     navigate("/login");
//   };

//   return (
//     <header className="bg-primary text-white">
//       <div className="d-flex justify-content-between align-items-center gap-4 px-3">
//         <div className="logo">
//           <Link to="/" className="text-decoration-none text-white shadow">
//             <h2>Streamify</h2>
//           </Link>
//         </div>

//         <div className="d-flex align-items-center gap-4 position-relative" ref={dropdownRef}>
//           <Link to="/notification">
//             <MdNotificationsActive className="shadow" size={24} style={{ color: "white" }} />
//           </Link>

//           <div onClick={toggleDropdown} role="button" style={{ cursor: "pointer", position: "relative" }}>
//             {users?.profilePic ?  <img src={users.profilePic} alt="img" className="img-responsive rounded-circle shadow" width={30} height={30} />
//              : <CgProfile className="shadow" size={30} style={{ color: "white" }} />}
//           </div>

//           {/* Dropdown Menu */}
//           {showDropdown && (
//             <div className="bg-white text-dark position-absolute end-0 mt-5 p-2 shadow" style={{ width: "180px", zIndex: 1000 }}>
//               <div className="px-2 py-1 fw-bold border-bottom">
//                 {users?.fullName || "User"}
//               </div>
//               <Link to="/profile" className="dropdown-item py-1 text-decoration-none text-dark">
//                 Profile
//               </Link>
//               <button className="dropdown-item py-1 text-start text-danger" onClick={handleLogout}>Logout</button>
//             </div>
//           )}
//         </div>
//       </div>
//     </header>
//   );
// }

// export default Header;
