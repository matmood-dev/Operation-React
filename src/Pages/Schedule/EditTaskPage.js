import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { updateTask } from '../../taskService'; // Import the updateTask function

const EditTaskPage = () => {
  const location = useLocation();
  const { task } = location.state || {};
  const [currentTask, setCurrentTask] = useState(task || {});
  const navigate = useNavigate(); // Use useNavigate for navigation

  useEffect(() => {
    if (task) {
      setCurrentTask(task);
    }
  }, [task]);

  const handleChange = (e) => {
    setCurrentTask({ ...currentTask, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Update the task using the updateTask function
      await updateTask(currentTask);
      // Redirect to the schedule page after saving the edited task
      navigate('/schedule');
    } catch (error) {
      console.error('Error updating task:', error);
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <button className="close-button" onClick={() => navigate('/schedule')}>×</button>
        <h1>Edit Task</h1>
        <form className="modal-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Date:</label>
            <input type="date" name="date" value={currentTask.date || ''} onChange={handleChange} placeholder="Date" />
          </div>
          <div className="form-group">
            <label>Installer Name:</label>
            <input type="text" name="installerName" value={currentTask.installerName || ''} onChange={handleChange} placeholder="Installer Name" />
          </div>
          <div className="form-group">
            <label>Invoice No.:</label>
            <input type="text" name="invoiceNo" value={currentTask.invoiceNo || ''} onChange={handleChange} placeholder="Invoice No." />
          </div>
          <div className="form-group">
            <label>Amount:</label>
            <input type="number" name="amount" value={currentTask.amount || ''} onChange={handleChange} placeholder="Amount" />
          </div>
          <div className="form-group">
            <label>Customer Name:</label>
            <input type="text" name="customerName" value={currentTask.customerName || ''} onChange={handleChange} placeholder="Customer Name" />
          </div>
          <div className="form-group">
            <label>Mobile Number:</label>
            <input type="text" name="mobileNumber" value={currentTask.mobileNumber || ''} onChange={handleChange} placeholder="Mobile Number" />
          </div>
          <div className="form-group">
            <label>Area:</label>
            <input type="text" name="area" value={currentTask.area || ''} onChange={handleChange} placeholder="Area" />
          </div>
          <div className="form-group">
            <label>Driver:</label>
            <input type="text" name="driver" value={currentTask.driver || ''} onChange={handleChange} placeholder="Driver" />
          </div>
          <div className="form-group">
            <label>Fixing Time:</label>
            <input type="text" name="fixingTime" value={currentTask.fixingTime || ''} onChange={handleChange} placeholder="Fixing Time" />
          </div>
          <div className="form-group">
            <label>Status:</label>
            <input type="text" name="status" value={currentTask.status || ''} onChange={handleChange} placeholder="Status" />
          </div>
          <div className="form-group">
            <label>Type:</label>
            <input type="text" name="type" value={currentTask.type || ''} onChange={handleChange} placeholder="Type" />
          </div>
          <div className="form-group">
            <label>Status Detail:</label>
            <input type="text" name="statusDetail" value={currentTask.statusDetail || ''} onChange={handleChange} placeholder="Status Detail" />
          </div>
          <div className="form-group">
            <label>Balance:</label>
            <input type="text" name="balance" value={currentTask.balance || ''} onChange={handleChange} placeholder="Balance" />
          </div>
          <div className="form-group">
            <label>Balance Date:</label>
            <input type="date" name="balanceDate" value={currentTask.balanceDate || ''} onChange={handleChange} placeholder="Balance Date" />
          </div>
          <button type="submit" className="action-button">Save Task</button>
        </form>
      </div>
    </div>
  );
};

export default EditTaskPage;
