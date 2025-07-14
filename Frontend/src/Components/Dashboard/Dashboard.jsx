import Wrapper from "../../SharedComponents/Wrapper/Wrapper";

function Dashboard() {
  return (
    <Wrapper pageTitle="Dashboard">
      <div className="d-flex flex-column gap-3">
        <div className="">
          <h5 className="display-6">Recent Friends</h5>
          <div className="card">
            test
          </div>
        </div>
        <div className="">
          <h5 className="display-6">Get Recommended Friends</h5>
        </div>
      </div>
    </Wrapper>
  )
}

export default Dashboard;