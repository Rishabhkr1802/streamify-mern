import { useEffect, useState } from 'react';
import { useMutation, useQuery } from '@tanstack/react-query';
import { getOutgoingRequests, getUsers, sendFriendRequest } from '../../utils/Api';
import Wrapper from '../../SharedComponents/Wrapper/Wrapper';
import Loader from '../../SharedComponents/Loader/Loader';
import UserCard from '../../SharedComponents/Card/UserCard';

function FindFriends() {
    const [outGoingRequestsIDs, setOutGoingRequestsIDs] = useState(new Set());

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
        queryClient.invalidateQueries({ queryKey: ["outgoingRequests", "friendRequest"] });
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
    <Wrapper pageTitle="Suggested for you">
      <section className="d-flex flex-column gap-3">
        <div className="">
          {recommendedIsPending && <Loader />}
          {recommendedIsError && <div>Something went wrong.</div>}

          {(!recommendedFriends || recommendedFriends.length === 0) && "No Friend"}
          <div className="d-flex flex-wrap gap-3">
            {recommendedFriends.map((user) => {
              const hasReqestSent = outGoingRequestsIDs.has(user._id)
              return <UserCard key={user._id} onSendRequest={handleFriendRequest}{...user} isSent={hasReqestSent} />
            })}
          </div>
        </div>
      </section>
    </Wrapper>
  )
}

export default FindFriends;