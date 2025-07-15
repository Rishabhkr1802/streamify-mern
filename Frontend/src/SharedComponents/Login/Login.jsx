import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import { useMutation } from "@tanstack/react-query";
import { axiosInstance } from "../../utils/Axios.js";

function Login() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: '', password: '' });

  function handleChange(e) {
    setFormData((prevData) => {
      return { ...prevData, [e.target.name]: e.target.value }
    })
  }

  const { mutate, isPending } = useMutation({
    mutationFn: async (data) => {
      const response = await axiosInstance.post('/auth/login', data);
      return response.data;
    },
    onSuccess: (data) => {
      toast.success( data.message ||"Login successful!");
      setTimeout(() => navigate('/'), 2000);
      localStorage.setItem('token', JSON.stringify(data?.token));
      localStorage.setItem('user', JSON.stringify(data?.user));
    },
    onError: (error) => {
      toast.error(error.response?.data?.message || "Login failed");
    },
    retry: false,
  });

  function submitHandler(event) {
    event.preventDefault();
    console.log(formData);
    mutate(formData)
  }

  return (
    <div className="w-100 min-vh-100 d-flex justify-content-center align-items-center">
      <div className="row w-100 justify-content-center">
        <div className="col-lg-6 col-md-8 col-sm-10">

          <form className="p-4 border rounded bg-secondary shadow" onSubmit={submitHandler}>
            <h4 className="display-5">Login</h4>

            <div className="mb-3">
              <label htmlFor="email" className="form-label">Email</label>
              <input type="email" className="form-control" name="email" value={formData.email} onChange={handleChange} />
            </div>

            <div className="mb-4">
              <label htmlFor="password" className="form-label">Password</label>
              <input type="password" className="form-control" name="password" value={formData.password} onChange={handleChange} />
            </div>

            <div className="mb-3">
              <button className="btn btn-light">{isPending ? "Logging in..." : "Login"}</button>
            </div>

            <div className="mb-3">
              <p>Don't have any account <Link to='/register' className="text-warning">Register</Link> yourself </p>
            </div>

          </form>

        </div>
      </div>
    </div>
  )
}

export default Login;