import { useEffect, useState } from 'react';
import { useParams } from "react-router-dom";
import Wrapper from '../../SharedComponents/Wrapper/Wrapper';
import toast from 'react-hot-toast';
import VideoCallButton from "../../SharedComponents/VideoCallButton/VideoCallButton";
import { StreamChat } from "stream-chat";
import { getStreamToken } from '../../utils/Api';
import { useQuery } from '@tanstack/react-query';
import { Chat, Channel, ChannelHeader, MessageInput, MessageList, Thread, Window } from 'stream-chat-react';
import { CardLoader } from "../../SharedComponents/Loader/Loader"

const STREAM_API_KEY = import.meta.env.VITE_STREAM_API_KEY

function ChatComponent() {

  const { id: targetUserID }        = useParams();
  const authUser                    = JSON.parse(localStorage.getItem('user'));
  const [chatClient, setChatClient] = useState(null);
  const [channel, setChannel]       = useState(null);
  const [loading, setLoading]       = useState(true);

  const { data: tokenData } = useQuery({
    queryKey: ["streamToken"],
    queryFn: getStreamToken,
    // enabled: !!authUser  //enable after auth done
  });

  useEffect(() => {
    async function initializedChat() {
      if (!tokenData?.token) return   // || !authUser
      try {
        const client = StreamChat.getInstance(STREAM_API_KEY);
        await client.connectUser({
            id    : authUser?._id,
            name  : authUser?.fullName,
            image : authUser?.profilePic,
          }, tokenData?.token,
        );

        const channelID = [authUser?._id, targetUserID].sort().join("-");
        const channel   = client.channel("messaging", channelID, { members: [authUser?._id, targetUserID]});
        await channel.watch();

        setChatClient(client);
        setChannel(channel);

      } catch (error) {
        console.log("Error in initializing chat", error);
        toast.error("Could not connect to chat. Please try again");
      }
      finally {
        setLoading(false);
      }
    }

    initializedChat();
  }, [tokenData, authUser, targetUserID]);

  if (loading || !chatClient || !channel) return <CardLoader />;

  function onVideoCall() {
    if (channel) {
      const callUrl = `${window.location.origin}/video-call/${channel.id}`;
      channel.sendMessage({ text: `I've started video call, please join me here : ${callUrl}` })
      toast.success("video call link successfully !!! ")
    }
  }

  return (
    <Wrapper pageTitle="Chats">
      <Chat client={chatClient}>
        <Channel channel={channel}>
          <div className="w-100 h-100 position-relative">
            <VideoCallButton handleVideoCall={onVideoCall} />
            <Window>
              <ChannelHeader />
              <MessageList />
              <MessageInput />
              <Thread />
            </Window>
          </div>
        </Channel>
      </Chat>
    </Wrapper>
  )
}

export default ChatComponent;