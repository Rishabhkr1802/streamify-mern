function NotificationCard({ onAcceptRequest, ...props }) {
    const user = props;
    return (
        <section className="border card-rounded p-3 shadow bg-light" key={user._id}>
            <div className="d-flex align-items-center justify-content-between gap-3">
                <div className="d-flex align-items-center gap-3">
                    <img src={user?.sender?.profilePic} alt="Profile" width={50} height={50} style={{ borderRadius: "50%" }} />
                    <div className="card-header p-0 border-0 bg-white">{user?.sender?.fullName}</div>
                </div>
                {user.status === "pending" && <button className="btn btn-primary mt-2" onClick={() => onAcceptRequest(user._id)}>Accept Request</button>}
            </div>
            <div className="card-body">
                <div className="d-flex justify-content-between gap-2">
                    <p className="card-text mb-0 mt-2"><strong>Native Language: -</strong>{user?.sender?.nativeLanguage}</p>
                    <p className="card-text mb-0 mt-2"><strong>Learning Language: -</strong>{user?.sender?.learningLanguage}</p>
                </div>
            </div>
        </section>
    )
}

export default NotificationCard;