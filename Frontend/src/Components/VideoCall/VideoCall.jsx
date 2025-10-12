import { useEffect, useState } from 'react';
import { useParams } from "react-router-dom"
import styles from "./VideoCall.module.css";
import Loader from '../../SharedComponents/Loader/Loader';
import { useQuery } from '@tanstack/react-query';
import { getStreamToken } from '../../utils/Api';
import { StreamCall, StreamVideo, StreamVideoClient } from '@stream-io/video-react-sdk';
import CallContent from './CallContent';

const STREAM_API_KEY = import.meta.env.VITE_STREAM_API_KEY

function VideoCall() {

  const { id: videoCallID }             = useParams();
  const [client, setClient]             = useState(null);
  const [call, setCall]                 = useState(null);
  const authUser                        = JSON.parse(localStorage.getItem('user'));
  const [isConnecting, setIsConnecting] = useState(true);

  const { data: tokenData } = useQuery({
    queryKey: ["streamToken"],
    queryFn: getStreamToken,
    // enabled: !!authUser  //enable after auth done
  });

  useEffect(() => {
    async function initializedVideoCall() {
      if (!tokenData?.token) return   // || !authUser
      try {
        const user = {
          id    : authUser?._id,
          name  : authUser?.fullName,
          image : authUser?.profilePic,
        };
        const videoClient       = new StreamVideoClient({ apiKey: STREAM_API_KEY, user, token: tokenData?.token });
        const videoCallInstance = videoClient.call('default', videoCallID);
        await videoCallInstance.join({ create: true });

        setClient(videoClient);
        setCall(videoCallInstance);

      } catch (error) {
        console.log("Error in initializing call", error);
        toast.error("Could not connect to call. Please try again");
      }
      finally {
        setIsConnecting(false);
      }
    }

    initializedVideoCall();
  }, [tokenData, authUser, videoCallID]);

  if (isConnecting) return <Loader />;

  return (
      <div className=""> className={styles.videoCallContainer}
        {client && call ? (
          <StreamVideo client={client}>
            <StreamCall call={call}>
              <CallContent />
            </StreamCall>
          </StreamVideo>
        ) : (
          <p>Could not connect please try again</p>
        )}
    </div>
  )
}

export default VideoCall;
