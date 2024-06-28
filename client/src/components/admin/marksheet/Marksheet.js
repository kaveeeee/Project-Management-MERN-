import React, { Component } from 'react';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

class MarksheetTable extends Component {
  constructor(props) {
    super(props);
    this.state = {
      marksheetData: [],
      filters: {
        year: '',
        semester: '',
        specialization: '',
        intake: '',
        callender_year: '',
        group_number: '',
        registration_number: '',
        report_typw: ''
      },
      selectedMarksheet: null,
      isEditing: false
    };
  }

  async componentDidMount() {
    await this.fetchMarksheetData();
  }

  fetchMarksheetData = async () => {
    try {
      const response = await fetch('http://localhost:5000/marksheet/all');
      const marksheetData = await response.json();
      this.setState({ marksheetData });
    } catch (error) {
      console.error('Error:', error);
      alert('Failed to fetch marksheet data. Please try again later.');
    }
  };

  handleFilterChange = (event) => {
    const { name, value } = event.target;
    this.setState((prevState) => ({
      filters: {
        ...prevState.filters,
        [name]: value
      }
    }));
  };

  applyFilters = () => {
    const { marksheetData, filters } = this.state;
    return marksheetData.filter((marksheet) => {
      for (let key in filters) {
        if (filters[key] && marksheet[key].toLowerCase().indexOf(filters[key].toLowerCase()) === -1) {
          return false;
        }
      }
      return true;
    });
  };

  handleEdit = (marksheet) => {
    this.setState({
      selectedMarksheet: marksheet,
      isEditing: true
    });
  };

  handleInputChange = (field, value) => {
    this.setState((prevState) => ({
      selectedMarksheet: {
        ...prevState.selectedMarksheet,
        [field]: value
      }
    }));
  };

  handleSave = async () => {
    try {
      const { selectedMarksheet } = this.state;
      const response = await fetch(`http://localhost:5000/marksheet/${selectedMarksheet._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(selectedMarksheet)
      });
      if (response.ok) {
        const updatedMarksheetData = await response.json();
        const updatedData = this.state.marksheetData.map((marksheet) =>
          marksheet._id === updatedMarksheetData._id ? updatedMarksheetData : marksheet
        );
        this.setState({
          marksheetData: updatedData,
          selectedMarksheet: null,
          isEditing: false
        });
        alert('Marksheet updated successfully');
      } else {
        throw new Error('Failed to update marksheet');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Failed to update marksheet. Please try again later.');
    }
  };

  handleDownloadPDF = () => {
    const input = document.getElementById('pdf-content');

    html2canvas(input)
      .then((canvas) => {
        const imgData = canvas.toDataURL('image/png');
        const pdf = new jsPDF();
        const imgWidth = 208;
        const imgHeight = (canvas.height * imgWidth) / canvas.width;

        pdf.addImage(imgData, 'PNG', 0, 0, imgWidth, imgHeight);
        pdf.save('download.pdf');
      })
      .catch((error) => {
        console.error('Error generating PDF:', error);
      });
  };

  render() {
    const { isEditing, selectedMarksheet } = this.state;
    const filteredMarksheets = this.applyFilters();

    return (
      <div >
        <h1>Marksheet Details</h1>
        <br />
        <div>
        <div style={{ border: '1px solid #ccc', padding: '10px', marginBottom: '20px',marginRight:'20px',borderRadius:'10px' }}> 
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '10px' }}>
          <label>
            Year:
            <input type="text" name="year" value={this.state.filters.year} onChange={this.handleFilterChange} style={{ width: '100%', padding: '8px', border: '1px solid #ccc', borderRadius: '5px' }}/>
          </label>
          <label>
            Semester:
            <input type="text" name="semester" value={this.state.filters.semester} onChange={this.handleFilterChange} style={{ width: '100%', padding: '8px', border: '1px solid #ccc', borderRadius: '5px' }}/>
          </label>
          <label>
            Specialization:
            <input type="text" name="specialization" value={this.state.filters.specialization} onChange={this.handleFilterChange} style={{ width: '100%', padding: '8px', border: '1px solid #ccc', borderRadius: '5px' }}/>
          </label>
          <label>
            Intake:
            <input type="text" name="intake" value={this.state.filters.intake} onChange={this.handleFilterChange} style={{ width: '100%', padding: '8px', border: '1px solid #ccc', borderRadius: '5px' }}/>
          </label>
          <label>
            Callender Year:
            <input type="text" name="callender_year" value={this.state.filters.callender_year} onChange={this.handleFilterChange} style={{ width: '100%', padding: '8px', border: '1px solid #ccc', borderRadius: '5px' }}/>
          </label>
          <label>
            Group Number:
            <input type="text" name="group_number" value={this.state.filters.group_number} onChange={this.handleFilterChange} style={{ width: '100%', padding: '8px', border: '1px solid #ccc', borderRadius: '5px' }}/>
          </label>
          <label>
            Registration Number:
            <input type="text" name="registration_number" value={this.state.filters.registration_number} onChange={this.handleFilterChange} style={{ width: '100%', padding: '8px', border: '1px solid #ccc', borderRadius: '5px' }}/>
          </label>
          <label>
            Report Type:
            <input type="text" name="report_typw" value={this.state.filters.report_typw} onChange={this.handleFilterChange} style={{ width: '100%', padding: '8px', border: '1px solid #ccc', borderRadius: '5px' }}/>
          </label>
          </div>
          </div>
        </div>
        <div style={{ border: '1px solid #ccc', padding: '10px', marginBottom: '20px',marginRight:'20px',borderRadius:'10px' }}> 
        {isEditing && selectedMarksheet && (
          <div>
            <h1>Edit Marksheet</h1>
            <br />
            <div style={{ border: '1px solid #ccc', padding: '10px', marginBottom: '20px',marginRight:'5px',borderRadius:'10px' }}> 
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '10px' }}>
            <form onSubmit={this.handleSave}>
              <div>
              <label>
                Year:
                <input
                  type="text"
                  name="year"
                  value={selectedMarksheet.year}
                  style={{ width: '100%', padding: '8px', border: '1px solid #ccc', borderRadius: '5px' }}
                  onChange={(e) => this.handleInputChange('year', e.target.value)}
                />
              </label>
              </div>
              <div>
              <label>
                Semester:
                <input
                  type="text"
                  name="semester"
                  value={selectedMarksheet.semester}
                  style={{ width: '100%', padding: '8px', border: '1px solid #ccc', borderRadius: '5px' }}
                  onChange={(e) => this.handleInputChange('semester', e.target.value)}
                />
              </label>
              </div>
              <div>
              <label>
                Marks:
                <input
                  type="text"
                  name="marks"
                  value={selectedMarksheet.marks}
                  style={{ width: '100%', padding: '8px', border: '1px solid #ccc', borderRadius: '5px' }}
                  onChange={(e) => this.handleInputChange('marks', e.target.value)}
                />
              </label>
              </div>
              <br />
              {/* Add other input fields for editing other marksheet data */}
              <button 
              style={{ 
                marginTop: '10px', 
                marginLeft:'10px',
                marginBottom:'10px',
                backgroundColor: '#ff6347', 
                color: 'white', 
                border: 'none', 
                padding: '10px 20px', 
                borderRadius: '5px', 
                cursor: 'pointer' 
                
            }}
               type="submit">Save</button>
            </form>
            </div>
            </div>
          </div>
        )}
        </div>
        <div style={{ border: '1px solid #ccc', padding: '10px', marginBottom: '20px',marginRight:'20px',borderRadius:'10px' }}> 
        <button style={{ 
                      marginTop: '10px', 
                      marginLeft:'10px',
                      marginBottom:'10px',
                      backgroundColor: '#516FA5', 
                      color: 'white', 
                      border: 'none', 
                      padding: '10px 20px', 
                      borderRadius: '5px', 
                      cursor: 'pointer' 
                      
                  }}
                  onClick={this.handleDownloadPDF}>Download PDF</button>
        </div>
        <div id="pdf-content">
        <div style={{ border: '1px solid #ccc', padding: '10px', marginBottom: '20px',marginRight:'20px',borderRadius:'10px' }}>
        <table style={{ borderCollapse: 'collapse',width: '100%',marginRight:'20px', borderRadius:'10px' }}>
          <thead>
            <tr>
              <th style={{ backgroundColor: '#93b6c7',border: '1px solid #ccc', color: '#333', padding: '8px', textAlign: 'left' }}>Year</th>
              <th style={{ backgroundColor: '#93b6c7',border: '1px solid #ccc', color: '#333', padding: '8px', textAlign: 'left' }}>Semester</th>
              <th style={{ backgroundColor: '#93b6c7',border: '1px solid #ccc', color: '#333', padding: '8px', textAlign: 'left' }}>Specialization</th>
              <th style={{ backgroundColor: '#93b6c7',border: '1px solid #ccc', color: '#333', padding: '8px', textAlign: 'left' }}>Intake</th>
              <th style={{ backgroundColor: '#93b6c7',border: '1px solid #ccc', color: '#333', padding: '8px', textAlign: 'left' }}>Callender Year</th>
              <th style={{ backgroundColor: '#93b6c7',border: '1px solid #ccc', color: '#333', padding: '8px', textAlign: 'left' }}>Group Number</th>
              <th style={{ backgroundColor: '#93b6c7',border: '1px solid #ccc', color: '#333', padding: '8px', textAlign: 'left' }}>Registration Number</th>
              <th style={{ backgroundColor: '#93b6c7',border: '1px solid #ccc', color: '#333', padding: '8px', textAlign: 'left' }}>Report Type</th>
              <th style={{ backgroundColor: '#93b6c7',border: '1px solid #ccc', color: '#333', padding: '8px', textAlign: 'left' }}>marks</th>
              <th style={{ backgroundColor: '#93b6c7',border: '1px solid #ccc', color: '#333', padding: '8px', textAlign: 'left' }}>Edit</th>
            </tr>
          </thead>
          <tbody>
            {filteredMarksheets.map((marksheet, index) => (
              <tr key={index}>
                <td style={{ border: '1px solid #ccc', padding: '8px', textAlign: 'left' }}>{marksheet.year}</td>
                <td style={{ border: '1px solid #ccc', padding: '8px', textAlign: 'left' }}>{marksheet.semester}</td>
                <td style={{ border: '1px solid #ccc', padding: '8px', textAlign: 'left' }}>{marksheet.specialization}</td>
                <td style={{ border: '1px solid #ccc', padding: '8px', textAlign: 'left' }}>{marksheet.intake}</td>
                <td style={{ border: '1px solid #ccc', padding: '8px', textAlign: 'left' }}>{marksheet.callender_year}</td>
                <td style={{ border: '1px solid #ccc', padding: '8px', textAlign: 'left' }}>{marksheet.group_number}</td>
                <td style={{ border: '1px solid #ccc', padding: '8px', textAlign: 'left' }}>{marksheet.registration_number}</td>
                <td style={{ border: '1px solid #ccc', padding: '8px', textAlign: 'left' }}>{marksheet.report_typw}</td>
                <td style={{ border: '1px solid #ccc', padding: '8px', textAlign: 'left' }}>{marksheet.marks}</td>
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
                  onClick={() => this.handleEdit(marksheet)}>Edit</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        </div>
        </div>
      </div>
    );
  }
}

export default MarksheetTable;
