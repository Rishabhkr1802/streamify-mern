function UserCard({onSendRequest,isSent, ...props}) {
    const user = props;
    return (
        <div className="card p-2 card-rounded shadow" style={{ maxWidth: "400px", flex: "1 1 350px" }} key={user._id}>
            <div className="d-flex align-items-center justify-content-between gap-3">
                <div className="d-flex align-items-center gap-3">
                    <img src={user.profilePic} alt="Profile" width={50} height={50} style={{ borderRadius: "50%" }} />
                    <div className="card-header p-0 border-0 bg-white">{user.fullName}</div>
                </div>
            </div>
            <div className="card-body p-1 py-2">
                <p className="card-text m-0">{user.bio}</p>
                <div className="d-flex justify-content-between">
                    <p className="card-text my-2">Native: -{user.nativeLanguage}</p>
                    <p className="card-text my-1">Learning: -{user.learningLanguage}</p>
                </div>
                <button className={`btn ${isSent ? "btn-disabled" : "btn-primary"} mt-2 w-100`}
                disabled= {isSent}
                onClick={()=> onSendRequest(user._id)}>{isSent ? "Request Sent": "Send Request"}</button>
            </div>
        </div>
    )
}

export default UserCard;