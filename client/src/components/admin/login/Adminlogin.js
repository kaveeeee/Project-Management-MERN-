import React, { useState } from "react";
import { login } from "../../UserFunctions";
import { useNavigate } from "react-router-dom";
import { MDBBtn, MDBContainer, MDBCard, MDBCardBody, MDBCardImage, MDBRow, MDBCol, MDBInput } from 'mdb-react-ui-kit';
import logoimg from '../../student/image/logo.PNG';
import loginimge from '../../student/image/loginuse.png';

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
      navigate("/adminside"); // Redirect to profile page after successful login
    } catch (err) {
      console.error("Login failed", err);
      // Handle login failure (display error message, etc.)
    }
  };

  return (
    <MDBContainer className="my-5">
      <MDBCard>
        <MDBRow className='g-10'>
          <MDBCol md='6'>
            <MDBCardBody className='d-flex flex-column'>
              <div className='d-flex flex-row mt-2'>
                <MDBCardImage src={logoimg} alt="login form" className='rounded-start w-100'/>
              </div>
              <h5 className="fw-normal my-4 pb-3" style={{ letterSpacing: '1px' }}>Sign into your account</h5>
              <form noValidate onSubmit={onSubmit}>
                <MDBInput
                  wrapperClass='mb-4'
                  label='Email Address'
                  id='email'
                  type='email'
                  size="lg"
                  name="email"
                  value={email}
                  onChange={onChange}
                  required
                  style={{ borderRadius: '0', borderColor: '#ced4da' }} // Add style to match template
                />
                <MDBInput
                  wrapperClass='mb-4'
                  label='Password'
                  id='password'
                  type='password'
                  size="lg"
                  name="password"
                  value={password}
                  onChange={onChange}
                  required
                  style={{ borderRadius: '0', borderColor: '#ced4da' }} // Add style to match template
                />
                <MDBBtn className="mb-4 px-5" color='dark' size='lg' type='submit'>Login</MDBBtn>
              </form>
              <p className="mb-5 pb-lg-2" style={{ color: '#393f81' }}>Don't have an account? <a href="/studentregistration" style={{ color: '#393f81' }}>Register here</a></p>
              <div className='d-flex flex-row justify-content-start'>
                <a href="#!" className="small text-muted me-1">Terms of use.</a>
                <a href="#!" className="small text-muted">Privacy policy</a>
              </div>
            </MDBCardBody>
          </MDBCol>
          <MDBCol md='6'>
          
            <MDBCardImage src={loginimge} alt="login form" className='rounded-start w-100'/>
           
          </MDBCol>
        </MDBRow>
      </MDBCard>
    </MDBContainer>
  );
};

export default Login;
