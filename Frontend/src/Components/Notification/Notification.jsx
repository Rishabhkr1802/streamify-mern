import Wrapper from '../../SharedComponents/Wrapper/Wrapper';
import { useMutation, useQuery } from '@tanstack/react-query';
import { axiosInstance } from '../../utils/Axios';
import Loader from "../../SharedComponents/Loader/Loader";
import NotificationCard from '../../SharedComponents/FriendsCard/NotificationCard';

function Notification() {

  const { data: friendRequest = [], isPending: isRequestPending, isError: requestIsError } = useQuery({
    queryKey: ["friendRequest"],
    queryFn: async (data) => {
      const response = await axiosInstance.get("/users/friend-requests");
      console.log("noti",response)
      return response.data?.incomingRequest || [];
    },
  });

  const { mutate: acceptRequest = [], isPending: isAccepted, isError: isErrorAcceptdRequest } = useMutation({
    mutationFn: async (id) => {
      console.log("id", id)
      const response = await axiosInstance.post(`/users/friend-request/${id}/accept`);
      console.log(response)
      return response || [];
    },
    onSuccess: (data) => {
      console.log("Friend request Accept successfully:", data);
      // optionally refetch friends or recommended list
      // queryClient.invalidateQueries(["friends"]);
      // queryClient.invalidateQueries(["friendRequest"]);
    },
    onError: (error) => {
      console.error("Error sending request:", error);
    }
  });

  function handleAcceptRequest(id) {
    acceptRequest(id);
  }

  return (
    <Wrapper pageTitle="Notifications">
      <div className="d-flex flex-column gap-3">
        <div className="">
          {/* <h5 className="display-6">Recent Friends</h5> */}
          <div className="">
            <h5 className="display-6">List of Friend Requests</h5>

            {isRequestPending && <Loader />}
            {requestIsError && <div>Something went wrong.</div>}

            {(!friendRequest || friendRequest.length === 0) && "Friend Request not found"}
            <div className="d-flex flex-wrap gap-3">
              {friendRequest.map((user) => (
                <NotificationCard key={user?.sender?._id} onAcceptRequest={handleAcceptRequest}{...user} />
              ))}
          </div>
        </div>
        </div>
      </div>
    </Wrapper>
  )
}

export default Notification;