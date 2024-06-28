import React, { Component } from "react";
import {
  MDBBtn,
  MDBContainer,
  MDBCard,
  MDBCardBody,
  MDBCardImage,
  MDBRow,
  MDBCol,
  MDBInput,
} from "mdb-react-ui-kit";
import { register } from "../UserFunctions";
import logoimg from "./image/logo.PNG";
import loginimge from "./image/loginuse.png";

class Register extends Component {
  constructor() {
    super();
    this.state = {
      first_name: "",
      last_name: "",
      email: "",
      password: "",
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  onSubmit(e) {
    e.preventDefault();

    const user = {
      first_name: this.state.first_name,
      last_name: this.state.last_name,
      email: this.state.email,
      password: this.state.password,
    };

    register(user).then((res) => {
      if (res) {
        this.props.history.push(`/login`);
      }
    });
  }

  render() {
    return (
      <MDBContainer className="my-5">
        <MDBCard>
          <MDBRow className="g-0">
            <MDBCol md="6">
              <MDBCardBody className="d-flex flex-column">
                <div className="d-flex flex-row mt-2">
                  <MDBCardImage
                    src={logoimg}
                    alt="login form"
                    className="rounded-start w-100"
                  />
                </div>
                <h5
                  className="fw-normal my-4 pb-3"
                  style={{ letterSpacing: "1px" }}
                >
                  Student Enrollment Form
                </h5>
                <form noValidate onSubmit={this.onSubmit}>
                  <MDBInput
                    wrapperClass="mb-4"
                    label="First Name"
                    id="first_name"
                    type="text"
                    size="lg"
                    name="first_name"
                    value={this.state.first_name}
                    onChange={this.onChange}
                    required
                  />
                  <MDBInput
                    wrapperClass="mb-4"
                    label="Last Name"
                    id="last_name"
                    type="text"
                    size="lg"
                    name="last_name"
                    value={this.state.last_name}
                    onChange={this.onChange}
                    required
                  />
                  <MDBInput
                    wrapperClass="mb-4"
                    label="Email"
                    id="email"
                    type="email"
                    size="lg"
                    name="email"
                    value={this.state.email}
                    onChange={this.onChange}
                    required
                  />
                  <MDBInput
                    wrapperClass="mb-4"
                    label="Password"
                    id="password"
                    type="password"
                    size="lg"
                    name="password"
                    value={this.state.password}
                    onChange={this.onChange}
                    required
                  />
                  <MDBBtn
                    className="mb-4 px-5"
                    color="dark"
                    size="lg"
                    type="submit"
                  >
                    Register
                  </MDBBtn>
                </form>
                <p className="mb-5 pb-lg-2" style={{ color: "#393f81" }}>
                  Already have an account?{" "}
                  <a href="/studentlogin" style={{ color: "#393f81" }}>
                    Login here
                  </a>
                </p>
              </MDBCardBody>
            </MDBCol>
            <MDBCol md="6">
              <MDBCardImage
                src={loginimge}
                alt="login form"
                className="rounded-start w-100"
              />
            </MDBCol>
          </MDBRow>
        </MDBCard>
      </MDBContainer>
    );
  }
}

export default Register;
