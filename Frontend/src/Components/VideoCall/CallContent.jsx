import { useNavigate } from "react-router-dom";
import { CallControls, CallingState, SpeakerLayout, StreamTheme, useCallStateHooks } from "@stream-io/video-react-sdk";

function CallContent() {
  const navigate                = useNavigate();
  const { useCallCallingState } = useCallStateHooks();
  const callingState            = useCallCallingState();

  if (callingState === CallingState.LEFT) return navigate("/");

  return (
    <StreamTheme>
      <SpeakerLayout />
      <CallControls />
    </StreamTheme>
  )
}

export default CallContent;