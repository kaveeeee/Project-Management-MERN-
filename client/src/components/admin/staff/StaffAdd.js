import React, { Component } from 'react';
import axios from 'axios';

export default class StaffForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      empno: '',
      name: '',
      nic: '',
      designation: '',
      allocation: ''
    };
  }

  handleChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  }

  handleSubmit = event => {
    event.preventDefault();
    const { empno, name, nic, designation, allocation } = this.state;
    // Send POST request to save staff member
    axios.post('http://localhost:5000/staff/save', { empno, name, nic, designation, allocation })
      .then(response => {
        console.log(response.data);
        // Reset form fields after successful submission
        this.setState({
          empno: '',
          name: '',
          nic: '',
          designation: '',
          allocation: ''
        });
        // Display alert after successful insert
        alert('Staff member added successfully!');
      })
      .catch(error => {
        console.error('Error saving staff member:', error);
      });
  }

  render() {
    const { empno, name, nic, designation, allocation } = this.state;
    return (
      <div>
        <h1>Add New Staff Member</h1>
        <br />
        <div style={{ border: '1px solid #ccc', padding: '10px', marginBottom: '20px',marginRight:'20px',borderRadius:'10px' ,marginLeft:'20px'}}>
        <form onSubmit={this.handleSubmit}>
          <label>Employee Number:</label>
          <input type="text" name="empno" value={empno} onChange={this.handleChange} style={{ width: '100%', padding: '8px', border: '1px solid #ccc', borderRadius: '5px' }} required />
          <label>Name:</label>
          <input type="text" name="name" value={name} onChange={this.handleChange} style={{ width: '100%', padding: '8px', border: '1px solid #ccc', borderRadius: '5px' }} required />
          <label>NIC:</label>
          <input type="text" name="nic" value={nic} onChange={this.handleChange} style={{ width: '100%', padding: '8px', border: '1px solid #ccc', borderRadius: '5px' }} required />
          <label>Designation:</label>
          <input type="text" name="designation" value={designation} onChange={this.handleChange} style={{ width: '100%', padding: '8px', border: '1px solid #ccc', borderRadius: '5px' }} required />
          <label>Allocation:</label>
          <input type="text" name="allocation" value={allocation} onChange={this.handleChange} style={{ width: '100%', padding: '8px', border: '1px solid #ccc', borderRadius: '5px' }} required />
          <br />
          <button style={{ 
                        marginTop: '20px', 
                        backgroundColor: '#516FA5', 
                        color: 'white', 
                        border: 'none', 
                        padding: '10px 20px', 
                        borderRadius: '5px', 
                        cursor: 'pointer' 
                        
                    }} type="submit">Add Staff Member</button>
        </form>
        </div>
      </div>
      // <div style={{ border: '1px solid #ccc', padding: '20px', borderRadius: '5px', maxWidth: '400px', margin: 'auto' }}>
      //   <h1>Add New Staff Member</h1>
      //   <form onSubmit={this.handleSubmit}>
      //     <label>Employee Number:</label>
      //     <input type="text" name="empno" value={empno} onChange={this.handleChange} required style={{ marginBottom: '10px', width: '100%' }} />
      //     <label>Name:</label>
      //     <input type="text" name="name" value={name} onChange={this.handleChange} required style={{ marginBottom: '10px', width: '100%' }} />
      //     <label>NIC:</label>
      //     <input type="text" name="nic" value={nic} onChange={this.handleChange} required style={{ marginBottom: '10px', width: '100%' }} />
      //     <label>Designation:</label>
      //     <input type="text" name="designation" value={designation} onChange={this.handleChange} required style={{ marginBottom: '10px', width: '100%' }} />
      //     <label>Allocation:</label>
      //     <input type="text" name="allocation" value={allocation} onChange={this.handleChange} required style={{ marginBottom: '10px', width: '100%' }} />
      //     <button type="submit" style={{ width: '100%' }}>Add Staff Member</button>
      //   </form>
      // </div>
    );
  }
}
