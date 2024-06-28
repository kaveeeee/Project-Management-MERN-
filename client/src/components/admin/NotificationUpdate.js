import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom'; // Import useNavigate

function NotificationUpdate() {
    const [notification, setNotification] = useState({
        topic: '',
        subject: '',
        description: ''
    });
    const { id } = useParams();
    const navigate = useNavigate(); // Define navigate using useNavigate

    useEffect(() => {
        axios.get(`http://localhost:5000/notification/${id}`)
            .then(response => {
                setNotification(response.data);
            })
            .catch(error => {
                console.error('Error fetching notification:', error);
            });
    }, [id]);

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setNotification(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleUpdate = async (event) => {
        event.preventDefault();
        try {
            await axios.put(`http://localhost:5000/notification/${id}`, notification);
            console.log("Notification updated successfully");
            navigate('/notificationtable');
        } catch (error) {
            console.error('Error updating notification:', error);
        }
    };

    return (
        <div>
            <h1>Edit Notification</h1>
            <form onSubmit={handleUpdate}>
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
                <button type="submit">Update</button>
            </form>
        </div>
    );
}

export default NotificationUpdate;
