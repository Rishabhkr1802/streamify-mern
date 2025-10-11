function FriendsCard({onSendRequest,...props}) {
    const user = props;
    return (
        <div className="card p-2" style={{ minWidth: "300px", flex: "1 1 300px" }} key={user._id}>
            <div className="d-flex align-items-center justify-content-between gap-3">
                <div className="d-flex align-items-center gap-3">
                    <img src={user.profilePic} alt="Profile" width={50} height={50} style={{ borderRadius: "50%" }} />
                    <div className="card-header p-0 border-0 bg-white">{user.fullName}</div>
                </div>
                <button className="btn btn-primary mt-2" onClick={()=> onSendRequest(user._id)}>Send Request</button>
            </div>
            <div className="card-body">
                <h5 className="card-title">{user.email}</h5>
                <p className="card-text">{user.bio}</p>
                <div className="d-flex justify-content-between">
                    <p className="card-text">Native: -{user.nativeLanguage}</p>
                    <p className="card-text">Learning: -{user.learningLanguage}</p>
                </div>
            </div>
        </div>
    )
}

export default FriendsCard;