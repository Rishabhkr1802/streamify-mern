import { FaVideo } from "react-icons/fa";
import styles from "./VideoCallButton.module.css";

function VideoCallButton({ handleVideoCall }) {
    return (
        <div className={styles.videoCallButton} onClick={handleVideoCall}>
            <FaVideo size={30} className={styles.videoCallIcon} />
        </div>
    )
}

export default VideoCallButton;