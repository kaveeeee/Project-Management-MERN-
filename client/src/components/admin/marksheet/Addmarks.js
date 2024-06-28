import React, { Component } from 'react';

export default class Addmarks extends Component {
  constructor(props) {
    super(props);

    this.state = {
      year: '',
      semester: '',
      specialization: '',
      intake: '',
      callender_year: '',
      group_number: '',
      registration_number: '',
      report_typw: '',
      student_name: '',
      marks: ''
    };
  }

  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value
    });
  };

  handleSubmit = async (event) => {
    event.preventDefault();
  
    try {
      const response = await fetch('http://localhost:5000/marksheet/save', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(this.state)
      });
      const responseData = await response.json();
      alert(responseData.success);
      
      // Clear the form fields
      this.setState({
        year: '',
        semester: '',
        specialization: '',
        intake: '',
        callender_year: '',
        group_number: '',
        registration_number: '',
        report_typw: '',
        student_name: '',
        marks: ''
      });
    } catch (error) {
      console.error('Error:', error);
      alert('Failed to insert marksheet. Please try again later.');
    }
  };

  render() {
    return (
      <div>
        <h1>Add Marks for Students</h1>
        <br />
        <div style={{ border: '1px solid #ccc', padding: '10px', marginBottom: '20px',marginRight:'20px',borderRadius:'10px' ,marginLeft:'20px'}}>
        <form onSubmit={this.handleSubmit}>
          <label>
            Year:
            <input type="number" name="year" min="1" max ="4" value={this.state.year} onChange={this.handleChange} style={{ width: '100%', padding: '8px', border: '1px solid #ccc', borderRadius: '5px' }} required />
          </label><br />
          <br />
          <label>
            Semester:
            <input type="text" name="semester" min="1" max="2" value={this.state.semester} onChange={this.handleChange} style={{ width: '100%', padding: '8px', border: '1px solid #ccc', borderRadius: '5px' }} required />
          </label><br /><br />
          <label>
            Specialization:
            <input type="text" name="specialization" value={this.state.specialization} onChange={this.handleChange} style={{ width: '100%', padding: '8px', border: '1px solid #ccc', borderRadius: '5px' }} required />
          </label><br /><br />
          <label>
            Intake:
            <input type="text" name="intake" value={this.state.intake} onChange={this.handleChange} style={{ width: '100%', padding: '8px', border: '1px solid #ccc', borderRadius: '5px' }} required />
          </label><br /><br />
          {/* Add similar labels and inputs for the remaining fields */}
          <label>
            Callender Year:
            <input type="text" name="callender_year" value={this.state.callender_year} onChange={this.handleChange} style={{ width: '100%', padding: '8px', border: '1px solid #ccc', borderRadius: '5px' }} required />
          </label><br /><br />
          <label>
            Group Number:
            <input type="text" name="group_number" value={this.state.group_number} onChange={this.handleChange} style={{ width: '100%', padding: '8px', border: '1px solid #ccc', borderRadius: '5px' }} required />
          </label><br /><br />
          <label>
            Registration Number:
            <input type="text" name="registration_number" value={this.state.registration_number} onChange={this.handleChange} style={{ width: '100%', padding: '8px', border: '1px solid #ccc', borderRadius: '5px' }} required />
          </label><br /><br />
          <label>
            Report Type:
            <input type="text" name="report_typw" value={this.state.report_typw} onChange={this.handleChange} style={{ width: '100%', padding: '8px', border: '1px solid #ccc', borderRadius: '5px' }} required />
          </label><br /><br />
          <label>
            Student Name:
            <input type="text" name="student_name" value={this.state.student_name} onChange={this.handleChange} style={{ width: '100%', padding: '8px', border: '1px solid #ccc', borderRadius: '5px' }} required />
          </label><br /><br />
          <label>
            Marks:
            <input type="number" name="marks" value={this.state.marks} onChange={this.handleChange} style={{ width: '100%', padding: '8px', border: '1px solid #ccc', borderRadius: '5px' }} required />
          </label><br /><br />
          
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
          type="submit">Submit</button>
        </form>
        </div>
      </div>
    );
  }
}
