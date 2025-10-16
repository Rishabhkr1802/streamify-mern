import { useEffect, useState } from 'react';
import { useMutation, useQuery } from '@tanstack/react-query';
import Wrapper from "../../SharedComponents/Wrapper/Wrapper";
import { CardLoader } from "../../SharedComponents/Loader/Loader";
// import FriendsCard from '../../SharedComponents/FriendsCard/FriendsCard';
import { getFriends, getOutgoingRequests, getUsers, sendFriendRequest } from '../../utils/Api';
import { queryClient } from "../../utils/Helper.js";
import FriendsCard from '../../SharedComponents/Card/FriendCard.jsx';
import UserCard from '../../SharedComponents/Card/UserCard.jsx';
import toast from 'react-hot-toast';

function Dashboard() {
  const [outGoingRequestsIDs, setOutGoingRequestsIDs] = useState(new Set());

  const { data: friends = [], isPending: friendsIsPending, isError: friendsIsError } = useQuery({
    queryKey: ["friends"],
    queryFn : getFriends,
  });

  const { data: recommendedFriends = [], isPending: recommendedIsPending, isError: recommendedIsError } = useQuery({
    queryKey: ["recommendedUser"],
    queryFn : getUsers,
  });

  const { data: outgoingRequests, isPending: isRequestOutgoing, isError: outgoingIsError } = useQuery({
    queryKey: ["outgoingRequests"],
    queryFn : getOutgoingRequests,
  });

  const { mutate: sendRequest = [], isPending: isSending, isError: isErrorSendRequest } = useMutation({
    mutationFn: sendFriendRequest,
    onSuccess : (res) => {
      // queryClient.invalidateQueries({ queryKey: ["outgoingRequests", "friendRequest"] });
      queryClient.invalidateQueries({ queryKey: ["outgoingRequests"] });
      toast.success(res?.response?.data?.message || "Friend Request Sent")
    },
    onError   : (error) => {
      console.error("Error sending request:", error);
      toast.error(error?.response?.data?.message);
    },
  });

  function handleFriendRequest(id) {
    sendRequest(id);
  }

  useEffect(() => {
    const outgoingIDs = new Set();
    if (outgoingRequests?.outgoingRequest && outgoingRequests?.outgoingRequest.length > 0) {
      outgoingRequests?.outgoingRequest.forEach((req) => {
        outgoingIDs.add(req?.recipient)
      })
      setOutGoingRequestsIDs(outgoingIDs)
    }
  } ,[outgoingRequests]);

  

  return (
    <Wrapper pageTitle="Dashboard">
      <div className="d-flex flex-column gap-3">
        <div className="">
          <h5 className="display-6">Recent Friends</h5>
          {friendsIsPending && <CardLoader />}
          {friendsIsError && <div>Something went wrong.</div>}

          {(!friends || friends.length === 0) && "There is no friend yet"}
          <div className="d-flex flex-wrap gap-3">
            {friends.map((user) => (
              <FriendsCard key={user._id} {...user} />
            ))}
          </div>
        </div>
        <div className="">
          <h5 className="display-6">Make Recommended users as a Friends</h5>

          {recommendedIsPending && <CardLoader />}
          {recommendedIsError && <div>Something went wrong.</div>}

          {(!recommendedFriends || recommendedFriends.length === 0) && "No Friend"}
          <div className="d-flex flex-wrap gap-3">
            {recommendedFriends.map((user) => {
              const hasReqestSent = outGoingRequestsIDs.has(user._id)
              return <UserCard key={user._id} onSendRequest={handleFriendRequest}{...user} isSent={hasReqestSent} />
            })}
          </div>
        </div>
      </div>
    </Wrapper>
  )
}

export default Dashboard;