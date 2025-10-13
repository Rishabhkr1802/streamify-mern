import Wrapper from '../../SharedComponents/Wrapper/Wrapper';
import { useMutation, useQuery } from '@tanstack/react-query';
import { queryClient } from "../../utils/Helper.js";
import { toast } from "react-hot-toast";
import Loader from "../../SharedComponents/Loader/Loader";
import NotificationCard from '../../SharedComponents/Card/NotificationCard';
import { acceptFriendRequest, getFriendRequest } from '../../utils/Api';

function Notification() {

  const { data: friendRequest = [], isPending: isRequestPending, isError: requestIsError } = useQuery({
    queryKey: ["friendRequest"],
    queryFn: getFriendRequest,
  });

  const { mutate: acceptRequest = [], isPending: isAccepted, isError: isErrorAcceptdRequest } = useMutation({
    mutationFn: acceptFriendRequest,
    onSuccess: () => {
      toast.success("Friend Request Accepted!!!");
      queryClient.invalidateQueries({ queryKey: ["friendRequest"] });
    },
    onError: () => toast.error("Something went wrong!!!"),
  });

  function handleAcceptRequest(id) {
    acceptRequest(id);
  }

  return (
    <Wrapper pageTitle="Notifications">
      <div className="d-flex flex-column gap-3">
            <h5 className="display-6 m-0">List of Friend Requests {friendRequest.length > 0 && <span className='badge badge-pill badge-danger bg-danger p-1'>{friendRequest.length}</span>}
            </h5>

            {isRequestPending && <Loader />}
            {requestIsError && <div>Something went wrong.</div>}

            {(!friendRequest || friendRequest.length === 0) && "Friend Request not found"}
            <div className="d-flex gap-3 flex-column">
              {friendRequest.map((user) => (
                <NotificationCard key={user?.sender?._id} onAcceptRequest={handleAcceptRequest}{...user} />
              ))}
          </div>
      </div>
    </Wrapper>
  )
}

export default Notification;