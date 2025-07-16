import { MdNotificationsActive } from "react-icons/md";
import { CgProfile } from "react-icons/cg";

function Header() {
  const token = localStorage.getItem('token');
  const user = localStorage.getItem('user');
  const users = JSON.parse(user)

  return (
    <header className="bg-dark w-100 p-2">
      <div className="d-flex justify-content-end align-items-center gap-4">
        <MdNotificationsActive />
        <CgProfile />
        <img src={users.profilePic} alt="img" className="img-responsive rounded" width={30} height={30}/>
        <p className="m-0">{users.fullName.split(" ")[0]}</p>
      </div>
    </header>
  )
}

export default Header;