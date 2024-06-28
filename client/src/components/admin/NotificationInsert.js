import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function NotificationInsert() {
    const [notification, setNotification] = useState({
        topic: '',
        subject: '',
        description: ''
    });
    const navigate = useNavigate();

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setNotification(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleInsert = async (event) => {
        event.preventDefault();
        try {
            await axios.post('http://localhost:5000/notification/save', notification);
            console.log("Notification inserted successfully");
            navigate('/notificationtable');
        } catch (error) {
            console.error('Error inserting notification:', error);
        }
    };

    return (
        <div>
            <h1>Add New Notification</h1>
            <form onSubmit={handleInsert}>
                <div>
                    <label>Topic:</label>
                    <input type="text" value={notification.topic} onChange={handleInputChange} name="topic" />
                </div>
                <div>
                    <label>Subject:</label>
                    <input type="text" value={notification.subject} onChange={handleInputChange} name="subject" />
                </div>
                <div>
                    <label>Description:</label>
                    <textarea value={notification.description} onChange={handleInputChange} name="description" />
                </div>
                <button type="submit">Insert</button>
            </form>
        </div>
    );
}

export default NotificationInsert;
