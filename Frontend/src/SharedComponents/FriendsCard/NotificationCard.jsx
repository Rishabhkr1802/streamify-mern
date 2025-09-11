function NotificationCard({onAcceptRequest,...props}) {
    const user = props;
    return (
        <div className="card p-2" style={{ minWidth: "300px", flex: "1 1 300px" }} key={user._id}>
            <div className="d-flex align-items-center justify-content-between gap-3">
                <div className="d-flex align-items-center gap-3">
                    <img src={user?.sender?.profilePic} alt="Profile" width={50} height={50} style={{ borderRadius: "50%" }} />
                    <div className="card-header p-0 border-0 bg-white">{user?.sender?.fullName}</div>
                </div>
                {user.status === "pending" && <button className="btn btn-success mt-2" onClick={()=> onAcceptRequest(user._id)}>Accept Request</button>}
            </div>
            <div className="card-body">
                {/* <h5 className="card-title">{user?.sender?.email}</h5>
                <p className="card-text">{user?.sender?.bio}</p> */}
                <div className="d-flex justify-content-between">
                    <p className="card-text">Native: -{user?.sender?.nativeLanguage}</p>
                    <p className="card-text">Learning: -{user?.sender?.learningLanguage}</p>
                </div>
            </div>
        </div>
    )
}

export default NotificationCard;