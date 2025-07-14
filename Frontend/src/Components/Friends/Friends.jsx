import { useQuery } from '@tanstack/react-query';
import Wrapper from '../../SharedComponents/Wrapper/Wrapper';
import { axiosInstance } from '../../utils/Axios';

function Friends() {
  const { data, isPending } = useQuery({
    queryKey: ['friends'],
    queryFn : handleQuery,
  });

  function handleQuery() {
    fetchFriends();
  }

  async function fetchFriends() {
    const response = await axiosInstance.get("/users/friends");
    return response;
  }

  return (
    <Wrapper pageTitle="My Friends">
      <div className="d-flex flex-column gap-3">
        <div className="">
          {/* <h5 className="display-6">Recent Friends</h5> */}
          <div className="card">
            {data}
          </div>
        </div>
      </div>
    </Wrapper>
  )
}

export default Friends;