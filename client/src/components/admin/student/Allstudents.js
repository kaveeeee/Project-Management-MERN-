import React, { Component } from 'react';

export default class Allstudents extends Component {
  constructor(props) {
    super(props);
    this.state = {
      students: [],
      batchFilter: '',
      specializationFilter: '',
      genderFilter: '',
      regNumberFilter: ''
    };
  }

  componentDidMount() {
    this.fetchStudents();
  }

  fetchStudents = () => {
    fetch('http://localhost:5000/users/users')
      .then(response => response.json())
      .then(data => {
        this.setState({ students: data });
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }

  handleBatchFilterChange = event => {
    this.setState({ batchFilter: event.target.value }, this.fetchStudents);
  }

  handleSpecializationFilterChange = event => {
    this.setState({ specializationFilter: event.target.value }, this.fetchStudents);
  }

  handleGenderFilterChange = event => {
    this.setState({ genderFilter: event.target.value }, this.fetchStudents);
  }

  handleRegNumberFilterChange = event => {
    this.setState({ regNumberFilter: event.target.value }, this.fetchStudents);
  }

  render() {
    const { students, batchFilter, specializationFilter, genderFilter, regNumberFilter } = this.state;

    // Filter students based on selected filter options
    const filteredStudents = students.filter(student => {
      return (
        (batchFilter === '' || student.batch === batchFilter) &&
        (specializationFilter === '' || student.specialization === specializationFilter) &&
        (genderFilter === '' || student.gender === genderFilter) &&
        (regNumberFilter === '' || student.registration_number.includes(regNumberFilter))
      );
    });

    return (
      <div>
        <h1>All Students</h1>
        {/* Filter controls */}
        <div style={{ border: '1px solid #ccc', padding: '10px', marginBottom: '20px',marginRight:'20px',borderRadius:'10px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '10px' }}>
          <div>
            <label>Batch:</label>
            <input type="text" value={batchFilter} onChange={this.handleBatchFilterChange} style={{ width: '100%', padding: '8px', border: '1px solid #ccc', borderRadius: '5px' }} />
          </div>
          <div>
            <label>Specialization:</label>
            <input type="text" value={specializationFilter} onChange={this.handleSpecializationFilterChange} style={{ width: '100%', padding: '8px', border: '1px solid #ccc', borderRadius: '5px' }} />
          </div>
          <div>
            <label>Gender:</label>
            <input type="text" value={genderFilter} onChange={this.handleGenderFilterChange} style={{ width: '100%', padding: '8px', border: '1px solid #ccc', borderRadius: '5px' }} />
          </div>
          <div>
            <label>Registration Number:</label>
            <input type="text" value={regNumberFilter} onChange={this.handleRegNumberFilterChange} style={{ width: '100%', padding: '8px', border: '1px solid #ccc', borderRadius: '5px' }} />
          </div>
        </div>
        </div>
        {/* Student table */}
        <div style={{ border: '1px solid #ccc', padding: '10px', marginBottom: '20px',marginRight:'20px',borderRadius:'10px' }}>
        <table style={{ borderCollapse: 'collapse',width: '100%',marginRight:'20px' }}>
          <thead>
            <tr>
              <th style={{ backgroundColor: '#93b6c7',border: '1px solid #ccc', color: '#333', padding: '8px', textAlign: 'left' }}>Registration Number</th>
              <th style={{ backgroundColor: '#93b6c7',border: '1px solid #ccc', color: '#333', padding: '8px', textAlign: 'left' }}>Full Name</th>
              <th style={{ backgroundColor: '#93b6c7',border: '1px solid #ccc', color: '#333', padding: '8px', textAlign: 'left' }}>Name with Initials</th>
              <th style={{ backgroundColor: '#93b6c7',border: '1px solid #ccc', color: '#333', padding: '8px', textAlign: 'left' }}>First Name</th>
              <th style={{ backgroundColor: '#93b6c7',border: '1px solid #ccc', color: '#333', padding: '8px', textAlign: 'left' }}>Last Name</th>
              <th style={{ backgroundColor: '#93b6c7',border: '1px solid #ccc', color: '#333', padding: '8px', textAlign: 'left' }}>Gender</th>
              <th style={{ backgroundColor: '#93b6c7',border: '1px solid #ccc', color: '#333', padding: '8px', textAlign: 'left' }}>Email</th>
              <th style={{ backgroundColor: '#93b6c7',border: '1px solid #ccc', color: '#333', padding: '8px', textAlign: 'left' }}>Batch</th>
              <th style={{ backgroundColor: '#93b6c7',border: '1px solid #ccc', color: '#333', padding: '8px', textAlign: 'left' }}>Specialization</th>
              {/* <th style={{ backgroundColor: '#93b6c7',border: '1px solid #ccc', color: '#333', padding: '8px', textAlign: 'left' }}>Profile Image</th> */}
            </tr>
          </thead>
          <tbody>
            {filteredStudents.map(student => (
              <tr key={student._id}>
                <td style={{ border: '1px solid #ccc', padding: '8px', textAlign: 'left' }}>{student.registration_number}</td>
                <td style={{ border: '1px solid #ccc', padding: '8px', textAlign: 'left' }}>{student.full_name}</td>
                <td style={{ border: '1px solid #ccc', padding: '8px', textAlign: 'left' }}>{student.name_with_initials}</td>
                <td style={{ border: '1px solid #ccc', padding: '8px', textAlign: 'left' }}>{student.first_name}</td>
                <td style={{ border: '1px solid #ccc', padding: '8px', textAlign: 'left' }}>{student.last_name}</td>
                <td style={{ border: '1px solid #ccc', padding: '8px', textAlign: 'left' }}>{student.gender}</td>
                <td style={{ border: '1px solid #ccc', padding: '8px', textAlign: 'left' }}>{student.email}</td>
                <td style={{ border: '1px solid #ccc', padding: '8px', textAlign: 'left' }}>{student.batch}</td>
                <td style={{ border: '1px solid #ccc', padding: '8px', textAlign: 'left' }}>{student.specialization}</td>
                {/* <td style={{ border: '1px solid #ccc', padding: '8px', textAlign: 'left' }}>
                  <img src={student.profile} alt="Profile" style={{ width: '50px', height: '50px' }} />
                </td> */}
              </tr>
            ))}
          </tbody>
        </table>
        </div>
      </div>
    );
  }
}
