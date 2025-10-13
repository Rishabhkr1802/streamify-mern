import { Link } from "react-router-dom";

function FriendsCard({...props}) {
    const user = props;
    return (
        <div className="card p-2 card-rounded shadow" style={{ maxWidth: "400px", flex: "1 1 400px" }} key={user._id}>
            <div className="d-flex align-items-center justify-content-between gap-3">
                <div className="d-flex align-items-center gap-3">
                    <img src={user.profilePic} alt="Profile" width={50} height={50} style={{ borderRadius: "50%" }} />
                    <div className="card-header p-0 border-0 bg-white">{user.fullName}</div>
                </div>
            </div>
            <div className="card-body p-1 py-2">
                <div className="d-flex justify-content-between">
                    <p className="card-text">Native: -{user.nativeLanguage}</p>
                    <p className="card-text">Learning: -{user.learningLanguage}</p>
                </div>
                <Link to={`/chat/${user?._id}`} className="btn btn-primary w-100">Message</Link>
            </div>
        </div>
    )
}

export default FriendsCard;