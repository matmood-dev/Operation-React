import React, { useState, useEffect } from 'react';
import './Schedule.css';
import './DateRange.css'; // Import the new CSS file
import { fetchTasks, deleteTask } from '../../taskService';
import { format, compareDesc } from 'date-fns';
import { exportTasksToPDF } from './exportToPDF';
import { useNavigate } from 'react-router-dom';
import { filterTasksByDateRange } from './dateRange';

const Schedule = () => {
  const [tasks, setTasks] = useState([]);
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [showAll, setShowAll] = useState(true); // New state for showing all tasks
  const navigate = useNavigate();

  useEffect(() => {
    const getTasks = async () => {
      try {
        const fetchedTasks = await fetchTasks();
        setTasks(fetchedTasks);
      } catch (error) {
        console.error('Error fetching tasks:', error);
      }
    };
    getTasks();
  }, []);

  const handleDelete = async (taskId) => {
    try {
      await deleteTask(taskId);
      setTasks(tasks.filter((task) => task.id !== taskId));
    } catch (error) {
      console.error('Error deleting task:', error);
    }
  };

  const handleExport = () => {
    const tasksToExport = filterTasksByDateRange(tasks, startDate, endDate, showAll);
    const groupedTasks = groupTasksByDate(tasksToExport);
    exportTasksToPDF(groupedTasks);
  };

  const groupTasksByDate = (filteredTasks) => {
    const sortedTasks = [...filteredTasks].sort((a, b) => compareDesc(new Date(a.date), new Date(b.date)));

    return sortedTasks.reduce((groups, task) => {
      const date = format(new Date(task.date), 'yyyy-MM-dd');
      if (!groups[date]) {
        groups[date] = [];
      }
      groups[date].push(task);
      return groups;
    }, {});
  };

  const handleEdit = (task) => {
    navigate(`/edit-task/${task.id}`, { state: { task } });
  };

  const filteredTasks = filterTasksByDateRange(tasks, startDate, endDate, showAll);
  const groupedTasks = groupTasksByDate(filteredTasks);

  return (
    <div className="schedule-page">
      <h1>Installing Orders</h1>
      <button className="action-button" onClick={() => navigate('/add-task')}>Add New Task</button>
      <button className="action-button" onClick={handleExport}>Export</button>

      <div className="date-range-container">
        <label>Start Date:</label>
        <input type="date" onChange={(e) => setStartDate(e.target.value)} placeholder="Start Date" />
        <label>End Date:</label>
        <input type="date" onChange={(e) => setEndDate(e.target.value)} placeholder="End Date" />
        <button className="action-button" onClick={() => setShowAll(true)}>Show All</button>
        <button className="action-button" onClick={() => setShowAll(false)}>Apply Date Range</button>
      </div>

      {Object.keys(groupedTasks).map((date) => (
        <div key={date} className="date-group">
          <h2>{`${format(new Date(date), 'yyyy-MM-dd')} (${format(new Date(date), 'EEEE')})`}</h2>
          <table className="schedule-table">
            <thead>
              <tr>
                <th>Installer Name</th>
                <th>Invoice No.</th>
                <th>Amount</th>
                <th>Customer Name</th>
                <th>Mobile Number</th>
                <th>Area</th>
                <th>Driver</th>
                <th>Fixing Time</th>
                <th>Status</th>
                <th>Type</th>
                <th>Status Detail</th>
                <th>Balance</th>
                <th>Balance Date</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {groupedTasks[date].map((task) => (
                <tr key={task.id}>
                  <td>{task.installerName}</td>
                  <td>{task.invoiceNo}</td>
                  <td>{task.amount}</td>
                  <td>{task.customerName}</td>
                  <td>{task.mobileNumber}</td>
                  <td>{task.area}</td>
                  <td>{task.driver}</td>
                  <td>{task.fixingTime}</td>
                  <td>{task.status}</td>
                  <td>{task.type}</td>
                  <td>{task.statusDetail}</td>
                  <td>{task.balance}</td>
                  <td>{task.balanceDate}</td>
                  <td>
                    <button className="action-button" onClick={() => handleEdit(task)}>Edit</button>
                    <button className="action-button" onClick={() => handleDelete(task.id)}>Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ))}
    </div>
  );
};

export default Schedule;
