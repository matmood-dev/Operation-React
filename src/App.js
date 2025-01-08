import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './Components/Navbar/Navbar';
import Homepage from './Pages/Homepage/Homepage';
import Schedule from './Pages/Schedule/Schedule';
import AddTaskPage from './Pages/Schedule/AddTaskPage';
import EditTaskPage from './Pages/Schedule/EditTaskPage';
import Login from './Pages/Login/Login';
// Import other pages when created
// import Workers from './Pages/Workers/Workers';
// import Notifications from './Pages/Notifications/Notifications';

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/schedule" element={<Schedule />} />
          {/* Define routes for other pages */}
          <Route path="/add-task" element={<AddTaskPage />} />
          <Route path="/edit-task/:id" element={<EditTaskPage />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
