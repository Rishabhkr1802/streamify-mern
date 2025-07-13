import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { axiosInstance } from "../../utils/Axios";
import toast from "react-hot-toast";

function OnBoard() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ fullName: '', bio: '', nativeLanguage: '', learningLanguage: '', location: '' });

  function handleChange(e) {
    setFormData((prevData) => {
      return { ...prevData, [e.target.name]: e.target.value }
    })
  }

  const { mutate, isPending } = useMutation({
    mutationFn : async (data) => {
      const response = await axiosInstance.post("/auth/onboarding",data);
      return response.data;
    },
    onSuccess: (data) => {
      toast.success(data.message || "OnBoaring Succesfull!");
      console.log(data);
      setTimeout(() => navigate('/'), 2000);
    },
    onError: (error) => {
      toast.error(error.response?.data?.message || "Onboarding failed");
    },
    retry: false,
  });

  function submitHandler(e) {
    e.preventDefault();
    console.log(formData);
    mutate(formData);
  }
  return (
    <div className="w-100 min-vh-100 d-flex justify-content-center align-items-center">
      <div className="row w-100 justify-content-center">
        <div className="col-lg-6 col-md-8 col-sm-10">

          <form className="p-4 border rounded bg-secondary shadow" onSubmit={submitHandler}>
            <h4 className="display-5">On Boarding</h4>
            
            <div className="mb-3">
              <label htmlFor="fullName" className="form-label">Full Name</label>
              <input type="text" className="form-control" name="fullName" value={formData.fullName} onChange={handleChange} />
            </div>

            <div className="mb-3">
              <label htmlFor="bio" className="form-label">Bio</label>
              <input type="text" className="form-control" name="bio" value={formData.bio} onChange={handleChange} />
            </div>

            <div className="mb-3">
              <label htmlFor="nativeLanguage" className="form-label">Native Language</label>
              <input type="text" className="form-control" name="nativeLanguage" value={formData.nativeLanguage} onChange={handleChange} />
            </div>

            <div className="mb-3">
              <label htmlFor="learningLanguage" className="form-label">Learning Language</label>
              <input type="text" className="form-control" name="learningLanguage" value={formData.learningLanguage} onChange={handleChange} />
            </div>

            <div className="mb-4">
              <label htmlFor="location" className="form-label">Location</label>
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