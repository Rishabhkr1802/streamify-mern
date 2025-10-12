import { useMutation, useQuery } from '@tanstack/react-query';
import Wrapper from "../../SharedComponents/Wrapper/Wrapper";
import { CardLoader } from "../../SharedComponents/Loader/Loader";
import FriendsCard from '../../SharedComponents/FriendsCard/FriendsCard';
import { getFriends, getOutgoingRequests, getUsers, sendFriendRequest } from '../../utils/Api';
import { queryClient } from "../../utils/Helper.js";

function Dashboard() {
  const { data: friends = [], isPending: friendsIsPending, isError: friendsIsError } = useQuery({
    queryKey: ["friends"],
    queryFn: getFriends,
  });

  const { data: recommendedFriends = [], isPending: recommendedIsPending, isError: recommendedIsError } = useQuery({
    queryKey: ["recommendedUser"],
    queryFn: getUsers,
  });

  const { data: outgoingRequest = [], isPending: isRequestOutgoing, isError: outgoingIsError } = useQuery({
    queryKey: ["outgoingRequest"],
    queryFn: getOutgoingRequests,
  });

  const { mutate: sendRequest = [], isPending: isSending, isError: isErrorSendRequest } = useMutation({
    mutationFn: sendFriendRequest,
    onSuccess: () => {
      queryClient.invalidateQueries(["recommendedUser"]);
    },
    onError: (error) => {
      console.error("Error sending request:", error);
    }
  });

  function handleFriendRequest(id) {
    sendRequest(id);
  }

  return (
    <Wrapper pageTitle="Dashboard" className="px-2">
      <div className="d-flex flex-column gap-3">
        <div className="">
          <h5 className="display-6">Recent Friends</h5>
          {friendsIsPending && <CardLoader />}
          {friendsIsError && <div>Something went wrong.</div>}

          {(!friends || friends.length === 0) && "No Friend"}
          <div className="d-flex flex-wrap gap-3">
            {friends.map((user) => (
              <FriendsCard {...user} />
            ))}
          </div>
        </div>
        <div className="">
          <h5 className="display-6">Make Recommended users as a Friends</h5>

          {recommendedIsPending && <CardLoader />}
          {recommendedIsError && <div>Something went wrong.</div>}

          {(!recommendedFriends || recommendedFriends.length === 0) && "No Friend"}
          <div className="d-flex flex-wrap gap-3">
            {recommendedFriends.map((user) => (
              <FriendsCard key={user._id} onSendRequest={handleFriendRequest}{...user} />
            ))}
          </div>
        </div>
      </div>
    </Wrapper>
  )
}

export default Dashboard;