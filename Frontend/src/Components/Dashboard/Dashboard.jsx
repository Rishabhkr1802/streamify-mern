import { useMutation, useQuery } from '@tanstack/react-query';
import Wrapper from "../../SharedComponents/Wrapper/Wrapper";
import { axiosInstance } from '../../utils/Axios';
import Loader from "../../SharedComponents/Loader/Loader";
import FriendsCard from '../../SharedComponents/FriendsCard/FriendsCard';

function Dashboard() {
  const { data: friends = [], isPending: friendsIsPending, isError: friendsIsError } = useQuery({
    queryKey: ["friends"],
    queryFn: async (data) => {
      const response = await axiosInstance.get("/users/friends");
      return response.data?.friends || [];
    },
  });

  const { data: recommendedFriends = [], isPending: recommendedIsPending, isError: recommendedIsError } = useQuery({
    queryKey: ["recommendedFriends"],
    queryFn: async (data) => {
      const response = await axiosInstance.get("/users/get-recommended-user");
      return response.data?.recommendedUsers || [];
    },
  });

  const { mutate: sendFriendRequest = [], isPending: isSending, isError: isErrorSendRequest } = useMutation({
    mutationFn: async (id) => {
      const response = await axiosInstance.post(`/users/friend-request/${id}`);
      return response || [];
    },
    onSuccess: (data) => {
      console.log("Friend request sent successfully:", data);
      // optionally refetch friends or recommended list
      // queryClient.invalidateQueries(["friends"]);
      // queryClient.invalidateQueries(["recommendedFriends"]);
    },
    onError: (error) => {
      console.error("Error sending request:", error);
    }
  });

  function handleFriendRequest(id) {
    sendFriendRequest(id);
  }

  return (
    <Wrapper pageTitle="Dashboard">
      <div className="d-flex flex-column gap-3">
        <div className="">
          <h5 className="display-6">Recent Friends</h5>
          {friendsIsPending && <Loader />}
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

          {recommendedIsPending && <Loader />}
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