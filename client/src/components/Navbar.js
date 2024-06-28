import React, { Component } from 'react';
import {Link} from 'react-router-dom';

import { useNavigate } from 'react-router-dom';


export const withRouter = (Component) =>{
    const Wrapper = (props) =>{
        const history = useNavigate();
        return <Component history={history} {...props}/>
    } 
    return Wrapper;
}


 class Navbar extends Component {


    logOut(e){
        e.preventDefault()
        localStorage.removeItem('usertoken');
        this.props.history.push(`/`);
    }



  render() {
    const loginRegLink = (
        <ul className="nav nav-tabs">
            <li className="nav-item">
                <Link to="/studentlogin" className="nav-link">
                    <h1><img width="50" height="50" src="https://img.icons8.com/ios/50/login-rounded-right--v1.png" alt="login-rounded-right--v1"/>Login</h1>
                </Link>
            </li>
            <li className="nav-item">
                <Link to="/studentregistration" className="nav-link">
                    <h1><img width="50" height="50" src="https://img.icons8.com/ios/50/login-rounded-right--v1.png" alt="login-rounded-right--v1"/>Register</h1>
                </Link>
            </li>
        </ul>
    )
    const userLink = (
        <ul className="nav nav-tabs">
            <li className="nav-item">
                <Link to="/login" className="nav-link">
                    <h1><img width="50" height="50" src="https://img.icons8.com/ios/50/login-rounded-right--v1.png" alt="login-rounded-right--v1"/>User</h1>
                </Link>
            </li>
            <li className="nav-item">
                <Link to="/upload" className="nav-link">
                    <h1><img width="50" height="50" src="https://img.icons8.com/ios/50/login-rounded-right--v1.png" alt="login-rounded-right--v1"/>Uploads</h1>
                </Link>
            </li>
            <li className="nav-item">
                <Link to="/assingment" className="nav-link">
                    <h1><img width="50" height="50" src="https://img.icons8.com/ios/50/login-rounded-right--v1.png" alt="login-rounded-right--v1"/>List</h1>
                </Link>
            </li>
            {/* <li className="nav-item">
                <Link to="/studentlogin" className="nav-link">
                    <h1><img width="50" height="50" src="https://img.icons8.com/ios/50/login-rounded-right--v1.png" alt="login-rounded-right--v1"/>Student Login</h1>
                </Link>
            </li> */}
            {/* <li className="nav-item">
                <Link to="/studentregistration" className="nav-link">
                    <h1><img width="50" height="50" src="https://img.icons8.com/ios/50/login-rounded-right--v1.png" alt="login-rounded-right--v1"/>Registration</h1>
                </Link>
            </li> */}
            <li className="nav-item">
                <a href='' onClick={this.logOut.bind(this)} className='nav-link' >
                    <h1>
                        log out
                    </h1>
                </a>
            </li>
        </ul>
    )
    return (
        <nav className='navbar navbar-expand-lg navbar-light rounded' >
            <button
                className='navbar-toggler'
                type='button'
                data-toggle='collapse'
                data-target='#navbar'
                aria-controls='navbar1'
                aria-expanded='false'
                aria-label='Toggle navigation' >
                    <span  className='navbar-toggler-icon'></span>
                </button>

                <div className='collapse navbar-collapse justify-content-md-center' id='navbar1'>
                    <ul className='nav nav-tabs'>
                        <li className='nav-item'>
                            <Link to="/" className='nav-link'>
                                <h1>Home</h1>
                            </Link>
                        </li>
                    </ul>
                    {localStorage.usertoken ? userLink:loginRegLink}
                </div>
        </nav>
    )
  }
}

export default withRouter(Navbar);
