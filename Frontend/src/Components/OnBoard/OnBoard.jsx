import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaRegUserCircle } from "react-icons/fa";
import { generateRandomNumberUpto100 } from "../../utils/Helper";
import { getImage, onboarding } from "../../utils/Api";
import { CardLoader } from "../../SharedComponents/Loader/Loader";
import toast from "react-hot-toast";

function OnBoard() {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('user'));
  const [showImage, setShowImage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({ profilePic: '', fullName: user?.fullName, bio: '', nativeLanguage: '', learningLanguage: '', location: '' });

  function handleChange(e) {
    setFormData((prevData) => {
      return { ...prevData, [e.target.name]: e.target.value }
    })
  }

  const { mutate, isPending } = useMutation({
    mutationFn: onboarding,
    onSuccess: (data) => {
      toast.success(data.message || "User on boaring Succesfull");
      setTimeout(() => navigate('/'), 2000);
    },
    onError: (error) => {
      toast.error(error.response?.data?.message || "Onboarding failed");
    },
    retry: false,
  });

  function generateImage() {
    setIsLoading(true);
    const randomNumber = generateRandomNumberUpto100();
    const randomAvatar = getImage(randomNumber);
    setTimeout(() => {
      setShowImage(randomAvatar);
      setIsLoading(false);
      toast.success("Image Generate successfully");
      setFormData((prevData) => {
        return { ...prevData, profilePic: randomAvatar }
      })
    }, 500)
    return randomAvatar;
  }

  function submitHandler(e) {
    e.preventDefault();
    mutate(formData);
  }

  return (
    <div className="vh-100 d-flex justify-content-center align-items-center">
      <div className="row w-100 justify-content-center">
        <div className="col-lg-6 col-md-8 col-sm-10">

          <form className="p-4 border rounded bg-primary shadow" onSubmit={submitHandler}>
            <h4 className="display-5 text-light">On Boarding</h4>

            <div className="text-center">
              {!showImage && <FaRegUserCircle size={10} color="white" className="on-boarding" />}
              {(showImage && !isLoading) && <img src={showImage ?? FaRegUserCircle} alt='pic' className="on-boarding" />}<br />
              {isLoading && <CardLoader />}
              <button type="button" className="mt-2 btn btn-light btn-sm" onClick={generateImage}>{isLoading ? "Generating..." : "Generate Image"}</button>
            </div>

            <div className="mb-3">
              <label htmlFor="fullName" className="form-label text-light">Full Name</label>
              <input type="text" className="form-control" name="fullName" value={user?.fullName} disabled style={{cursor: "not-allowed"}}  />
            </div>

            <div className="mb-3">
              <label htmlFor="bio" className="form-label text-light">Bio</label>
              <input type="text" className="form-control" name="bio" value={formData.bio} onChange={handleChange} />
            </div>

            <div className="mb-3">
              <label htmlFor="nativeLanguage" className="form-label text-light">Native Language</label>
              <input type="text" className="form-control" name="nativeLanguage" value={formData.nativeLanguage} onChange={handleChange} />
            </div>

            <div className="mb-3">
              <label htmlFor="learningLanguage" className="form-label text-light">Learning Language</label>
              <input type="text" className="form-control" name="learningLanguage" value={formData.learningLanguage} onChange={handleChange} />
            </div>

            <div className="mb-4">
              <label htmlFor="location" className="form-label text-light">Location</label>
              <input type="text" className="form-control" name="location" value={formData.location} onChange={handleChange} />
            </div>

            <div className="mb-3">
              <button className="btn btn-light">{isPending ? "OnBoarding..." : "Submit"}</button>
            </div>

          </form>

        </div>
      </div>
    </div>
  )
}

export default OnBoard;