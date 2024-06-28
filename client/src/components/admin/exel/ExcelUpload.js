import React, { useState } from 'react';
import * as XLSX from 'xlsx';

const ExcelUpload = ({ setFormData }) => {
  const [fileData, setFileData] = useState([]);

  const handleAutoFill = (rowData) => {
    setFormData({
      first_name: rowData[0],
      last_name: rowData[1],
      email: rowData[2],
      password: rowData[3],
      registration_number: rowData[4],
      full_name: rowData[5],
      name_with_initials: rowData[6],
      gender: rowData[7],
      batch: rowData[8],
      specialization: rowData[9],
      profile: rowData[10]
    });
  };

  const handleFileUpload = e => {
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.onload = e => {
      const data = new Uint8Array(e.target.result);
      const workbook = XLSX.read(data, { type: 'array' });
      const sheetName = workbook.SheetNames[0];
      const sheet = workbook.Sheets[sheetName];
      const jsonData = XLSX.utils.sheet_to_json(sheet, { header: 1 });

      const filteredData = jsonData.filter(row => row.length > 0);
      setFileData(filteredData);
    };

    reader.readAsArrayBuffer(file);
  };

  return (
    <div>
      <h1>Upload Excel File</h1>
      <br />
      <div style={{ border: '1px solid #ccc', padding: '10px', marginBottom: '20px',marginRight:'20px',borderRadius:'10px' }}> 
      <input type="file" accept=".xlsx, .xls"  onChange={handleFileUpload} />
      </div>
      
      <hr />

      <div style={{ border: '1px solid #ccc', padding: '10px', marginBottom: '20px',marginRight:'20px',borderRadius:'10px' }}> 
      {fileData.length > 0 && (
        <div>
          <table border="1">
            <thead>
              <tr>
                {fileData[0].map((cell, index) => (
                  <th key={index}>{cell}</th>
                ))}
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {fileData.slice(1).map((row, rowIndex) => (
                <tr key={rowIndex}>
                  {row.map((cell, cellIndex) => (
                    <td key={cellIndex}>{cell}</td>
                  ))}
                  <td>
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

                    onClick={() => handleAutoFill(row)}>Auto Fill</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
      )}
      </div>
    </div>
  );
};

export default ExcelUpload;
