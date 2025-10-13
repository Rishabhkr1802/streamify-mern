import { Link } from "react-router-dom";

function ListCard({ ...props }) {
    const user = props;
    return (
        <section className="border card-rounded p-3 shadow bg-light" key={user._id}>
            <div className="d-flex align-items-center justify-content-between gap-3">
                <div className="d-flex align-items-center gap-3">
                    <img src={user.profilePic} alt="Profile" width={50} height={50} style={{ borderRadius: "50%" }} />
                    <div className="card-header p-0 border-0 bg-white">{user.fullName}</div>
                </div>
                <Link to={`/chat/${user?._id}`} className="btn btn-primary">Message</Link>
            </div>
            <div className="card-body">
                <div className="d-flex justify-content-between gap-2">
                    <p className="card-text mb-0 mt-2"><strong>Native Language: -</strong>{user.nativeLanguage}</p>
                    <p className="card-text mb-0 mt-2"><strong>Learning Language: -</strong>{user.learningLanguage}</p>
                </div>
            </div>
        </section>
    )
}
export default ListCard;