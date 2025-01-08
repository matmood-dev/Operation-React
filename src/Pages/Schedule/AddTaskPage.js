import React, { useState } from 'react';
import Modal from './Modal';
import { addTask } from '../../taskService';
import { useNavigate } from 'react-router-dom';

const AddTaskPage = () => {
  const [currentTask, setCurrentTask] = useState({});
  const [isModalOpen, setIsModalOpen] = useState(true);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setCurrentTask({ ...currentTask, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const taskToAdd = { ...currentTask, date: currentTask.date || new Date().toISOString() };
      await addTask(taskToAdd);
      setIsModalOpen(false);
      setCurrentTask({});
      navigate('/schedule'); // Redirect to the schedule page after adding a task
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };

  return (
    <div className="add-task-page">
      <h1>Add New Task</h1>
      <Modal isOpen={isModalOpen} closeModal={() => setIsModalOpen(false)}>
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
      </Modal>
    </div>
  );
};

export default AddTaskPage;
