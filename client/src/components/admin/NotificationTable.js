// NotificationView.js

import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import NotificationTableRow from './NotificationTableRownew';

class NotificationView extends Component {
    constructor(props) {
        super(props);
        this.state = {
            notifications: [],
            searchQuery: ''
        };
    }

    componentDidMount() {
        this.retrieveNotifications();
    }

    retrieveNotifications = () => {
        axios.get('http://localhost:5000/notification/all')
            .then(response => {
                this.setState({ notifications: response.data });
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    handleInputChange = (event) => {
        this.setState({ searchQuery: event.target.value });
    }

    handleSearch = () => {
        // Perform search operation here
    }

    renderNotifications() {
        const filteredNotifications = this.state.notifications.filter(notification =>
            notification.topic.toLowerCase().includes(this.state.searchQuery.toLowerCase()) ||
            notification.subject.toLowerCase().includes(this.state.searchQuery.toLowerCase()) ||
            notification.description.toLowerCase().includes(this.state.searchQuery.toLowerCase())
        );

        return filteredNotifications.map((notification, index) => {
            return <NotificationTableRow key={index} notification={notification} />;
        });
    }

    render() {
        return (
            <div>
                <h1 align="center">Notifications</h1>
                <div className="search-bar">
                    <input type="text" placeholder="Search notifications..." value={this.state.searchQuery} onChange={this.handleInputChange} />
                    <button onClick={this.handleSearch}>Search</button>
                </div>
                {this.state.notifications.length === 0 ? (
                    <p>Loading...</p>
                ) : (
                    <table className='table table-striped' style={{ marginTop: 20 }}>
                        <thead>
                            <tr>
                                <th>Topic</th>
                                <th>Subject</th>
                                <th>Description</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.renderNotifications()}
                        </tbody>
                    </table>
                )}
            </div>
        );
    }
}

export default NotificationView;
