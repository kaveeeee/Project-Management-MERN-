import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ViewAssignments = () => {
    const [assignments, setAssignments] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:5000/assigment/')
            .then(res => {
                setAssignments(res.data);
            })
            .catch(err => {
                console.log(err);
            });
    }, []);

    return (
        <div>
            <h1>View Assignments</h1>
            <br />
            <div style={{ border: '1px solid #ccc', padding: '10px', marginBottom: '20px',marginRight:'20px',borderRadius:'10px' }}>
            <table style={{ borderCollapse: 'collapse',width: '100%',marginRight:'20px', borderRadius:'10px' }}>
                <thead>
                    <tr>
                        <th style={{ backgroundColor: '#93b6c7',border: '1px solid #ccc', color: '#333', padding: '8px', textAlign: 'left' }}>Course</th>
                        <th style={{ backgroundColor: '#93b6c7',border: '1px solid #ccc', color: '#333', padding: '8px', textAlign: 'left' }}>Assignment Name</th>
                        <th style={{ backgroundColor: '#93b6c7',border: '1px solid #ccc', color: '#333', padding: '8px', textAlign: 'left' }}>Deadline</th>
                    </tr>
                </thead>
                <tbody>
                    {assignments.map(assignment => (
                        <tr key={assignment._id}>
                            <td style={{ border: '1px solid #ccc', padding: '8px', textAlign: 'left' }}>{assignment.course}</td>
                            <td style={{ border: '1px solid #ccc', padding: '8px', textAlign: 'left' }}>{assignment.assignment_name}</td>
                            <td style={{ border: '1px solid #ccc', padding: '8px', textAlign: 'left' }}>{assignment.deadline}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
            </div>
        </div>
    );
};

export default ViewAssignments;
