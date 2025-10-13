import { useQuery } from '@tanstack/react-query';
import { getFriends } from '../../utils/Api';
import Wrapper from '../../SharedComponents/Wrapper/Wrapper';
import Loader from '../../SharedComponents/Loader/Loader';
import ListCard from '../../SharedComponents/Card/ListCard';

function Friends() {
  const { data: friends = [], isPending, isError } = useQuery({
    queryKey: ["friends"],
    queryFn: getFriends,
  });

  return (
    <Wrapper pageTitle="List of Friends">
      <section className="d-flex flex-column gap-3">
        <div className="">
          {isPending && <Loader />}
          {isError && <div>Something went wrong.</div>}

          {(!friends || friends.length === 0) && "There is no friends yet!"}
          <div className="d-flex flex-column gap-3">
            {friends.map((user) => (
              <ListCard {...user} />
            ))}
          </div>
        </div>
      </section>
    </Wrapper>
  )
}

export default Friends;