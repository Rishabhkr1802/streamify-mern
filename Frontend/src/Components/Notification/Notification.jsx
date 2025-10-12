import Wrapper from '../../SharedComponents/Wrapper/Wrapper';
import { useMutation, useQuery } from '@tanstack/react-query';
import { toast } from "react-hot-toast";
import Loader from "../../SharedComponents/Loader/Loader";
import NotificationCard from '../../SharedComponents/FriendsCard/NotificationCard';
import { acceptFriendRequest, getFriendRequest } from '../../utils/Api';

function Notification() {

  const { data: friendRequest = [], isPending: isRequestPending, isError: requestIsError } = useQuery({
    queryKey: ["friendRequest"],
    queryFn: getFriendRequest,
  });

  const { mutate: acceptRequest = [], isPending: isAccepted, isError: isErrorAcceptdRequest } = useMutation({
    mutationFn: acceptFriendRequest,
    onSuccess: (data) => toast.success( "Friend Request Accepted!!!"),
    onError: (error) => toast.error("Something went wrong!!!"),
  });

  function handleAcceptRequest(id) {
    acceptRequest(id);
  }

  return (
    <Wrapper pageTitle="Notifications">
      <div className="d-flex flex-column gap-3">
        <div className="">
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