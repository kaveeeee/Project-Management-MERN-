// Profile.js
import axios from 'axios';
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './Profile.css';

class Profile extends Component {
    constructor() {
        super();
        this.state = {
            user: {},
            isEditing: false,
            updatedData: {
                first_name: '',
                last_name: '',
                email: '',
                specialization: ''
            }
        };
    }

    componentDidMount() {
        const token = localStorage.usertoken;
        // Fetch user details using token
        axios.get('/users/profile', {
            headers: {
                Authorization: token
            }
        })
        .then(response => {
            this.setState({ user: response.data });
        })
        .catch(error => {
            console.error('Error fetching user profile:', error);
        });
    }

    toggleEdit = () => {
        this.setState(prevState => ({
            isEditing: !prevState.isEditing
        }));
    };

    handleInputChange = e => {
        const { name, value } = e.target;
        this.setState(prevState => ({
            updatedData: {
                ...prevState.updatedData,
                [name]: value
            }
        }));
    };

    handleSubmit = e => {
        e.preventDefault();
        const { updatedData } = this.state;
        const token = localStorage.usertoken;
        axios.post('/users/profile/update', {
            userId: this.state.user._id,
            updatedData
        }, {
            headers: {
                Authorization: token
            }
        })
        .then(response => {
            this.setState({
                user: response.data,
                isEditing: false
            });
        })
        .catch(error => {
            console.error('Error updating user profile:', error);
        });
    };

    render() {
        const { user, isEditing, updatedData } = this.state;
        return (

            <div style={{ display: 'flex', alignItems: 'center',marginLeft:'10px',marginRight:'10px' }}>
            <div className="col-sm-4 mx-auto">
            <img src="https://media.licdn.com/dms/image/C5612AQEdYpciTW0fHQ/article-cover_image-shrink_720_1280/0/1575815554964?e=2147483647&v=beta&t=aMKLT8coN-oTNKmvf9lBzRA-RxatfIeWiQvnBVKh4-U" alt="Profile" style={{ maxWidth: '100%', height: 'auto' }} />
            </div>
            <div className="col-sm-8 mx-auto" style={{marginRight:'10px'}}>
            <div className="container1">
                <div className="jumbotron mt-5">
                    <div className="col-sm8 mx-auto">
                        <h1 className="text-center">Profile</h1>
                    </div>
                    <div className="form-container1">
                    <table className="table col-md-6 mx-auto">
                        <tbody>
                            {isEditing ? (
                                <tr>
                                    <td colSpan="6">
                                        <form onSubmit={this.handleSubmit}>
                                        <div className="form-group">
                                        <div style={{ display: 'flex', flexDirection: 'column' }}>
                                        <div className="input-container1"  >
                                            <labale>
                                                First Name : &nbsp;&nbsp;
                                            </labale>
                                            <input
                                                type="text"
                                                name="first_name"
                                                value={updatedData.first_name}
                                                onChange={this.handleInputChange}
                                                required
                                                placeholder={user.first_name}
                                                
                                            />
                                            
                                            </div>
                                            <br/>
                                            <div className="input-container1" >
                                            <labale>
                                                Last Name : &nbsp;&nbsp;
                                            </labale>
                                            <input
                                                type="text"
                                                name="last_name"
                                                 value={updatedData.last_name}
                                                onChange={this.handleInputChange}
                                                placeholder={user.last_name}
                                                required
                                            />
                                            <br/>
                                            </div>
                                            <br />
                                            <div className="input-container1" >
                                            <labale>
                                                Email : &nbsp;&nbsp;&nbsp;
                                            </labale>
                                            <input
                                                type="text"
                                                name="email"
                                                value={updatedData.email}
                                                onChange={this.handleInputChange}
                                                placeholder={user.email}
                                                required
                                            />
                                            <br/>
                                            </div>
                                            <br />
                                            <div className="input-container1" >
                                            <labale>
                                                Registration Number : &nbsp;
                                            </labale>
                                            <input
                                                type="text"
                                                name="registration_number"
                                                value={updatedData.registration_number}
                                                onChange={this.handleInputChange}
                                                required
                                                placeholder={user.registration_number}
                                            />
                                            <br/>
                                            </div>
                                            <br />
                                            <div className="input-container1" >
                                            <labale>
                                                Full Name : &nbsp;&nbsp;&nbsp;
                                            </labale>
                                            <input
                                                type="text"
                                                name="full_name"
                                                value={updatedData.full_name}
                                                onChange={this.handleInputChange}
                                                required
                                                placeholder={user.full_name}
                                            />
                                            <br/>
                                            </div>
                                            <br />
                                            <div className="input-container1" >
                                            <labale>
                                                Name with Initials : &nbsp;
                                            </labale>
                                            <input
                                                type="text"
                                                name="name_with_initials"
                                                value={updatedData.name_with_initials}
                                                onChange={this.handleInputChange}
                                                required
                                                placeholder={user.name_with_initials}

                                            />
                                            <br/>
                                            </div>
                                            <br />
                                            <div className="input-container1" >
                                            <labale>
                                                Gender : &nbsp;&nbsp;&nbsp;&nbsp;
                                            </labale>
                                            <input
                                                type="text"
                                                name="gender"
                                                value={updatedData.gender}
                                                onChange={this.handleInputChange}
                                                placeholder={user.gender}
                                                required
                                            />
                                            <br/>
                                            </div>
                                            <br />
                                            <div className="input-container1" >
                                            <labale>
                                                Current Batch : &nbsp;&nbsp;
                                            </labale>
                                            <input
                                                type="text"
                                                name="batch"
                                                value={updatedData.batch}
                                                onChange={this.handleInputChange}
                                                required
                                                placeholder={user.batch}
                                            />
                                            <br/>
                                            </div>
                                            <br />
                                            <div className="input-container1" >
                                            <labale>
                                                Specialization :&nbsp;&nbsp;
                                            </labale>
                                            <input
                                                type="text"
                                                name="specialization"
                                                value={updatedData.specialization}
                                                onChange={this.handleInputChange}
                                                required
                                                placeholder={user.specialization}
                                            />
                                            <br/>
                                            
                                            </div>
                                            <br />
                                            <div className="input-container1" >
                                            <labale>
                                                Profile Image :&nbsp;&nbsp;
                                            </labale>
                                            <input
                                                type="text"
                                                name="profile"
                                                value={updatedData.profile}
                                                onChange={this.handleInputChange}
                                                required
                                                placeholder={user.profile}
                                            />
                                            <br/>
                                            </div>
                                            </div>
                                            </div>
                                            <br />
                                            {/* Add similar inputs for other fields */}
                                            <button 
                                             style={{ 
                                                marginTop: '20px', 
                                                backgroundColor: '#516FA5', 
                                                color: 'white', 
                                                border: 'none', 
                                                padding: '10px 20px', 
                                                borderRadius: '5px', 
                                                cursor: 'pointer' 
                                            }}
                                            type="submit">Save</button>
                                        </form>
                                    </td>
                                </tr>
                            ) : (
                                <>
                                    <tr>
                                        <td>First Name</td>
                                        <td>{user.first_name}</td>
                                    </tr>
                                    <tr>
                                        <td>last Name</td>
                                        <td>{user.last_name}</td>
                                    </tr>
                                    <tr>
                                        <td>email</td>
                                        <td>{user.email}</td>
                                    </tr>
                                    {/* <tr>
                                        <td>registration_number</td>
                                        <td>{user.registration_number}</td>
                                    </tr> */}
                                    {/* Add similar rows for other fields */}
                                </>
                            )}
                        </tbody>
                    </table>
                    </div>
                    <button 
                    style={{ 
                        marginTop: '20px', 
                        backgroundColor: '#ff6347', 
                        color: 'white', 
                        border: 'none', 
                        padding: '10px 20px', 
                        borderRadius: '5px', 
                        cursor: 'pointer' 
                    }}
                    onClick={this.toggleEdit}>{isEditing ? 'Cancel' : 'Edit'}</button>

<br />


<Link to="/homeside" >
                    <button
                    style={{ 
                        marginTop: '20px', 
                        backgroundColor: '#516FA5', 
                        color: 'white', 
                        border: 'none', 
                        padding: '10px 20px', 
                        borderRadius: '5px', 
                        cursor: 'pointer' 
                        
                    }}
                    >Student Dashboard</button>
                    </Link>
                </div>
            </div>
            </div>

            </div>
        );
    }
}

export default Profile;
