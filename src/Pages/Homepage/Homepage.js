import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Homepage.css';

const Homepage = () => {
  const navigate = useNavigate();

  return (
    <div className="homepage">
      <header className="header">
        <h1>Welcome to the Operation Department</h1>
        <p>This is the homepage for the operation department.</p>
      </header>
      <div className="content">
        <section className="overview">
          <h2>Today's Schedule</h2>
          <p>No tasks assigned for today.</p>
        </section>
        <section className="task-management">
          <h2>Manage Tasks</h2>
          <button className="action-button" onClick={() => navigate('/schedule')}>View Schedule</button>
          <button className="action-button" onClick={() => navigate('/add-task')}>Assign New Task</button>
        </section>
        <section className="notifications">
          <h2>Notifications</h2>
          <p>No new notifications.</p>
        </section>
      </div>
    </div>
  );
};

export default Homepage;
