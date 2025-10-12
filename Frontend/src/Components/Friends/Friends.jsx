import { useQuery } from '@tanstack/react-query';
import Wrapper from '../../SharedComponents/Wrapper/Wrapper';
import Loader from '../../SharedComponents/Loader/Loader';
import FriendsCard from '../../SharedComponents/FriendsCard/FriendsCard';
import { getFriends } from '../../utils/Api';

function Friends() {
  const { data: friends = [], isPending, isError } = useQuery({
    queryKey: ["friends"],
    queryFn: getFriends,
  });

  return (
    <Wrapper pageTitle="My Friends">
      <div className="d-flex flex-column gap-3">
        <div className="">
          {isPending && <Loader />}
          {isError && <div>Something went wrong.</div>}

          {(!friends || friends.length === 0) && "No Friend"}
          <div className="d-flex flex-wrap gap-3">
            {friends.map((user) => (
              <FriendsCard {...user} />
            ))}
          </div>
        </div>
      </div>
    </Wrapper>
  )
}

export default Friends;