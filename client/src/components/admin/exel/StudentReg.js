import React, { useState } from 'react';
import { register } from './UserFunctions';
import logoimg from '../../student/image/logo.PNG';
import loginimge from '../../student/image/loginuse.png';
import ExcelUpload from './ExcelUpload';

const StudentReg = () => {
  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    email: '',
    password: '',
  });
  const [error, setError] = useState('');

  const handleChange = e => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleAutoFill = data => {
    setFormData({
      ...formData,
      ...data // assuming data has keys corresponding to form field names
    });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      await register(formData);
      setFormData({
        first_name: '',
        last_name: '',
        email: '',
        password: '',
      });
      window.alert('User registered successfully!');
    } catch (error) {
      console.error('Error:', error);
      setError('Error registering user. Please check the console for details.');
    }
  };

  return (
    <>

    <ExcelUpload setFormData={handleAutoFill} /> 

    <div style={{ border: '1px solid #ccc', padding: '10px', marginBottom: '20px',marginRight:'20px',borderRadius:'10px' }}> 
    <div className="my-5">
      <div className="card">
        <div className="row g-0">
          <div className="col-md-6">
            <div className="card-body d-flex flex-column">
              <div className="d-flex flex-row mt-2">
                <img src={logoimg} alt="login form" className="rounded-start w-100" />
              </div>
              <h5 className="fw-normal my-4 pb-3" style={{ letterSpacing: '1px' }}>
                Student Enrollment Form
              </h5>
              <form noValidate onSubmit={handleSubmit}>
                <input
                  className="form-control mb-4"
                  placeholder="First Name"
                  type="text"
                  name="first_name"
                  value={formData.first_name}
                  onChange={handleChange}
                  required
                />
                <input
                  className="form-control mb-4"
                  placeholder="Last Name"
                  type="text"
                  name="last_name"
                  value={formData.last_name}
                  onChange={handleChange}
                  required
                />
                <input
                  className="form-control mb-4"
                  placeholder="Email"
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
                <input
                  className="form-control mb-4"
                  placeholder="Password"
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                />
                <button className="btn btn-dark mb-4 px-5" type="submit">
                  Register
                </button>
                {error && <p style={{ color: 'red' }}>{error}</p>}
              </form>
              <p className="mb-5 pb-lg-2" style={{ color: '#393f81' }}>
                Already have an account? <a href="/studentlogin" style={{ color: '#393f81' }}>Login here</a>
              </p>
            </div>
          </div>
          <div className="col-md-6">
            
            <img src={loginimge} alt="login form" className="rounded-start w-100" />
          </div>
        </div>
      </div>
    </div>
    </div>
    </>
  );
};

export default StudentReg;
