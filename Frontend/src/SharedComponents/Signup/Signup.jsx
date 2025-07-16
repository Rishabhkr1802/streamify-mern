import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { Link, useNavigate } from "react-router-dom";
import { axiosInstance } from "../../utils/Axios";
import toast from "react-hot-toast";
import { setLocalStorageData } from "../../utils/Helper";

function Signup() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ fullName: '', email: '', password: '' });

  function handleChange(e) {
    setFormData((prevData) => {
      return { ...prevData, [e.target.name]: e.target.value }
    })
  }

  const { mutate, isPending } = useMutation({
    mutationFn: async (data) => {
      const response = await axiosInstance.post('/auth/signup', data);
      return response.data;
    },
    onSuccess: (data) => {
      toast.success(data.message || "registration Succesfull!");
      setLocalStorageData(data);
      setTimeout(() => navigate('/on-boarding'), 2000);
    },
    onError: (error) => {
      toast.error(error.response?.data?.message || "Login failed");
    },
    retry: false,
  });

  function submitHandler(e){
    e.preventDefault();
    console.log(formData);
    mutate(formData);
  }


  return (
    <div className="w-100 min-vh-100 d-flex justify-content-center align-items-center">
      <div className="row w-100 justify-content-center">
        <div className="col-lg-6 col-md-8 col-sm-10">

          <form className="p-4 border rounded bg-secondary shadow" onSubmit={submitHandler}>
            <h4 className="display-5">Register</h4>

            <div className="mb-3">
              <label htmlFor="fullName" className="form-label">Full Name</label>
              <input type="text" className="form-control" name="fullName" value={formData.fullName} onChange={handleChange} />
            </div>

            <div className="mb-3">
              <label htmlFor="email" className="form-label">Email</label>
              <input type="email" className="form-control" name="email" value={formData.email} onChange={handleChange} />
            </div>

            <div className="mb-4">
              <label htmlFor="password" className="form-label">Password</label>
              <input type="password" className="form-control" name="password" value={formData.password} onChange={handleChange} />
            </div>

            <div className="mb-3">
              <button className="btn btn-light">{isPending ? "Registering..." : "Register"}</button>
            </div>

            <div className="mb-3">
              <p>Have an account <Link to='/login' className="text-warning">Login</Link></p>
            </div>

          </form>

        </div>
      </div>
    </div>
  )
}

export default Signup;