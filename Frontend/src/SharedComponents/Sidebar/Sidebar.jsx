import { Link, useNavigate } from 'react-router-dom';
import { axiosInstance } from '../../utils/Axios';
import toast from 'react-hot-toast';

function Sidebar() {
  const navigate = useNavigate();

   async function isLogout() {
      try {
        const response = await axiosInstance.post('/auth/logout');
        return response.data;
      } catch (error) {
        console.error("login error", error);
      }
    }

  function logoutHandler(e){
    console.log('e')
    isLogout();
    setTimeout(() => navigate('/login'), 1000);
    toast.success("Logout successful!");
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  }
  return (
    <nav className='w-100 bg-secondary min-vh-100'>
      <div className="d-flex flex-column gap-3">

        <Link to="/" className="p-3 border rounded shadow text-light text-decoration-none">
          <span>Dashboard</span>
        </Link>

        <Link to="/friends" className="p-3 border rounded shadow text-light text-decoration-none">
          <span>Friends</span>
        </Link>

        <Link to="/notification" className="p-3 border rounded shadow text-light text-decoration-none">
          <span>Notification</span>
        </Link>

        <Link to="/chat" className="p-3 border rounded shadow text-light text-decoration-none">
          <span>Chats</span>
        </Link>

        <Link to="/video-call" className="p-3 border rounded shadow text-light text-decoration-none">
          <span>Video Call</span>
        </Link>

        <Link className="p-3 border rounded shadow text-light text-decoration-none" onClick={logoutHandler}>
          <span>Logout</span>
        </Link>

      </div>
    </nav>
  )
}

export default Sidebar;