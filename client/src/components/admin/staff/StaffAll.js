import React, { Component } from 'react';
import axios from 'axios';

export default class AllStaff extends Component {
  constructor(props) {
    super(props);
    this.state = {
      staff: [],
      nameFilter: '',
      nicFilter: '',
      empFilter: '',
      editingStaffId: null,
      allocationOptions: ['All 01', 'All 02', 'All 03']
    };
  }

  componentDidMount() {
    this.fetchStaff();
  }

  fetchStaff = () => {
    axios.get('http://localhost:5000/staff/all')
      .then(response => {
        this.setState({ staff: response.data });
      })
      .catch(error => {
        console.error('Error fetching staff data:', error);
      });
  }

  handleFilterChange = (event, filterName) => {
    this.setState({ [filterName]: event.target.value });
  }

  handleEdit = (id) => {
    this.setState({ editingStaffId: id });
  }

  handleAllocationChange = (event) => {
    const { staff, editingStaffId } = this.state;
    const updatedStaff = staff.map(member => {
      if (member._id === editingStaffId) {
        member.allocation = event.target.value;
        // Send update request when allocation is changed
        axios.put(`http://localhost:5000/staff/${editingStaffId}`, { allocation: event.target.value })
          .then(response => {
            console.log(response.data);
          })
          .catch(error => {
            console.error('Error updating staff member:', error);
          });
      }
      return member;
    });
    this.setState({ staff: updatedStaff });
  }
  handleDelete = (id) => {
    axios.delete(`http://localhost:5000/staff/${id}`)
      .then(response => {
        console.log(response.data);
        // Remove the deleted staff member from the state
        this.setState(prevState => ({
          staff: prevState.staff.filter(member => member._id !== id)
        }));
      })
      .catch(error => {
        console.error('Error deleting staff member:', error);
      });
  }

  render() {
    const { staff, nameFilter, nicFilter, empFilter, editingStaffId, allocationOptions } = this.state;

    const filteredStaff = staff.filter(member => {
      return (
        member.name.toLowerCase().includes(nameFilter.toLowerCase()) &&
        member.nic.toLowerCase().includes(nicFilter.toLowerCase()) &&
        member.empno.toLowerCase().includes(empFilter.toLowerCase())
      );
    });

    return (
      <div>
        <h1>All Staff Members</h1>
        <br />
        {/* Filter controls */}
        <div style={{ border: '1px solid #ccc', padding: '10px', marginBottom: '20px',marginRight:'20px',borderRadius:'10px' }}> 
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '10px' }}>
        <div>
          <label>Name:</label>
          <input type="text" value={nameFilter} onChange={(e) => this.handleFilterChange(e, 'nameFilter')} style={{ width: '100%', padding: '8px', border: '1px solid #ccc', borderRadius: '5px' }}/>
          </div>
          <div>
          <label>NIC:</label>
          <input type="text" value={nicFilter} onChange={(e) => this.handleFilterChange(e, 'nicFilter')} style={{ width: '100%', padding: '8px', border: '1px solid #ccc', borderRadius: '5px' }}/>
          </div>
          <div>
          <label>Employee Number:</label>
          <input type="text" value={empFilter} onChange={(e) => this.handleFilterChange(e, 'empFilter')} style={{ width: '100%', padding: '8px', border: '1px solid #ccc', borderRadius: '5px' }}/>
          </div>
        </div>
        </div>
        <br />
        {/* Table */}
        <div style={{ border: '1px solid #ccc', padding: '10px', marginBottom: '20px',marginRight:'20px',borderRadius:'10px' }}>
        <table style={{ borderCollapse: 'collapse',width: '100%',marginRight:'20px', borderRadius:'10px' }}>
          <thead>
            <tr>
              <th style={{ backgroundColor: '#93b6c7',border: '1px solid #ccc', color: '#333', padding: '8px', textAlign: 'left' }}>Employee Number</th>
              <th style={{ backgroundColor: '#93b6c7',border: '1px solid #ccc', color: '#333', padding: '8px', textAlign: 'left' }}>Name</th>
              <th style={{ backgroundColor: '#93b6c7',border: '1px solid #ccc', color: '#333', padding: '8px', textAlign: 'left' }}>NIC</th>
              <th style={{ backgroundColor: '#93b6c7',border: '1px solid #ccc', color: '#333', padding: '8px', textAlign: 'left' }}>Designation</th>
              <th style={{ backgroundColor: '#93b6c7',border: '1px solid #ccc', color: '#333', padding: '8px', textAlign: 'left' }}>Allocation</th>
              <th style={{ backgroundColor: '#93b6c7',border: '1px solid #ccc', color: '#333', padding: '8px', textAlign: 'left' }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredStaff.map(member => (
              <React.Fragment key={member._id}>
                <tr>
                  <td style={{ border: '1px solid #ccc', padding: '8px', textAlign: 'left' }}>{member.empno}</td>
                  <td style={{ border: '1px solid #ccc', padding: '8px', textAlign: 'left' }}>{member.name}</td>
                  <td style={{ border: '1px solid #ccc', padding: '8px', textAlign: 'left' }}>{member.nic}</td>
                  <td style={{ border: '1px solid #ccc', padding: '8px', textAlign: 'left' }}>{member.designation}</td>
                  <td style={{ border: '1px solid #ccc', padding: '8px', textAlign: 'left' }}>{member.allocation}</td>
                  <td style={{ border: '1px solid #ccc', padding: '8px', textAlign: 'left' }}>
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
                    onClick={() => this.handleEdit(member._id)}>Edit</button>&nbsp;&nbsp;
                    {/* Assuming you have a handleDelete method */}
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
                    onClick={() => this.handleDelete(member._id)}>Delete</button>
                  </td>
                </tr>
                {editingStaffId === member._id &&
                  <tr>
                    <td colSpan="5">
                      <label>Allocation:</label>
                      <select value={member.allocation} onChange={this.handleAllocationChange} style={{ width: '100%', padding: '8px', border: '1px solid #ccc', borderRadius: '5px' }}>
                        {allocationOptions.map(option => (
                          <option key={option} value={option}>{option}</option>
                        ))}
                      </select>
                    </td>
                    <td>
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
                      onClick={() => this.setState({ editingStaffId: null })}>Cancel</button>
                    </td>
                  </tr>
                }
              </React.Fragment>
            ))}
          </tbody>
        </table>
        </div>
      </div>
    );
  }
}
