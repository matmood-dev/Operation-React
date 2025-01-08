import React, { useState, useEffect } from 'react';
import './Schedule.css';
import { fetchTasks, deleteTask } from '../../taskService';
import { format, compareDesc } from 'date-fns';
import { exportTasksToPDF } from './exportToPDF';
import { useNavigate } from 'react-router-dom';

const Schedule = () => {
  const [tasks, setTasks] = useState([]);
  const [exportOption, setExportOption] = useState(''); // New state for export options
  const [exportDate, setExportDate] = useState(''); // New state for export date
  const navigate = useNavigate(); // Use useNavigate instead of useHistory

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
    if (exportOption === 'all') {
      exportTasksToPDF(groupedTasks);
    } else if (exportOption === 'byDate') {
      const tasksByDate = { [exportDate]: groupedTasks[exportDate] };
      exportTasksToPDF(tasksByDate);
    }
  };

  // Group tasks by date
  const groupTasksByDate = () => {
    // Sort tasks by date from newest to oldest
    const sortedTasks = [...tasks].sort((a, b) => compareDesc(new Date(a.date), new Date(b.date)));

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
  

  const groupedTasks = groupTasksByDate();

  return (
    <div className="schedule-page">
      <h1>Installing Orders</h1>
      <button className="action-button" onClick={() => navigate('/add-task')}>Add New Task</button>
      <button className="action-button" onClick={() => setExportOption('all')}>Export All</button>
      <button className="action-button" onClick={() => setExportOption('byDate')}>Export by Date</button>

      {exportOption === 'byDate' && (
        <input type="date" onChange={(e) => setExportDate(e.target.value)} placeholder="Select Date" />
      )}
      <button className="action-button" onClick={() => handleExport()}>Export</button>

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
              <th>Balance</th> {/* New Field */}
              <th>Balance Date</th> {/* New Field */}
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
                <td>{task.balance}</td> {/* New Field */}
                <td>{task.balanceDate}</td> {/* New Field */}
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
