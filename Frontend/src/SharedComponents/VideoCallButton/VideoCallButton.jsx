import { FaVideo } from "react-icons/fa";
import styles from "./videoCallButton.module.css";

function videoCallButton({ handleVideoCall }) {
    return (
        <div className={styles.videoCallButton} onClick={handleVideoCall}>
            <FaVideo size={30} className={styles.videoCallIcon} />
        </div>
    )
}

export default videoCallButton;