import React, { useState } from "react";
import { login } from "./UserFunctions";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate(); // Hook to navigate programmatically
  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });

  const { email, password } = formData;

  const onChange = e =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async e => {
    e.preventDefault();

    const user = {
      email,
      password
    };

    try {
      await login(user);
      navigate("/profile"); // Redirect to profile page after successful login
    } catch (err) {
      console.error("Login failed", err);
      // Handle login failure (display error message, etc.)
    }
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-6 mt-5 mx-auto">
          <form noValidate onSubmit={onSubmit}>
            <h1 className="h3 mb-3 font-weight-normal">Student Login</h1>
            <div className="form-group">
              <label htmlFor="email">Email Address</label>
              <input
                type="email"
                className="form-control"
                name="email"
                placeholder="Enter Email"
                value={email}
                onChange={onChange}
              />
            </div>

            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                className="form-control"
                name="password"
                placeholder="Enter Password"
                value={password}
                onChange={onChange}
              />
            </div>

            <button className="btn btn-lg btn-primary btn-block">
              Sign In
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
