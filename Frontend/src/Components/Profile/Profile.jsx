import Wrapper from '../../SharedComponents/Wrapper/Wrapper';

function Profile() {
  const user = JSON.parse(localStorage.getItem("user"));
  
  return (
    <Wrapper pageTitle="Profile">
      <div className="d-flex flex-column gap-3">
        <div className="bg-light shadow  py-5 rounded">
          <div className="row align-items-center">
            <div className="col-3 text-center">
              <img src={user?.profilePic} alt="pic" width={200} height={200} />
            </div>
            <div className="col-9">
              <h5 className='display-5'>{user?.fullName}</h5>
              <h6 className='display-6'><strong>{user?.email}</strong></h6>
            </div>
          </div>
          <div className="row px-5 mt-3">
            <div className="col-12">
              <p><strong>Bio :- </strong>{user?.bio}</p>
            </div>
          </div>
          <div className="row px-5">
            <div className="col-12 d-flex justify-content-between align-items-center gap-3">
              <span><strong>Native Languages :- </strong>{user?.nativeLanguage}</span>
              <span><strong>Learning Languages :- </strong>{user?.learningLanguage}</span>
            </div>
          </div>
          <div className="row px-5 mt-3">
            <div className="col-12 ">
              <span><strong>Address :- </strong>{user?.location}</span>
            </div>
          </div>
        </div>
      </div>
    </Wrapper>
  )
}

export default Profile;