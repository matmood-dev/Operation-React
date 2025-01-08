// dateRange.js

export const filterTasksByDateRange = (tasks, startDate, endDate, showAll) => {
    if (showAll) {
      return tasks;
    }
  
    const start = new Date(startDate);
    const end = new Date(endDate);
  
    return tasks.filter((task) => {
      const taskDate = new Date(task.date);
      return taskDate >= start && taskDate <= end;
    });
  };
  