import React, { useEffect, useState } from 'react';
import TaskCard from './TaskCard';

const TaskList = ({ data }) => {
  const [tasks, setTasks] = useState(data);
  const [isLoading, setIsLoading] = useState(true); // Loading state
  const [error, setError] = useState(null); // Error state

  useEffect(() => {
    setTasks(data); // Update tasks when data changes
    setIsLoading(false);
  }, [data]); // Depend on data to refetch tasks when it changes
  console.log('asdfihskdaf sdafn sadf ', tasks);
  const handleEdit = (updatedTask) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) => (task.id === updatedTask.id ? updatedTask : task))
    );
  };

  const handleDelete = (taskId) => {
    setTasks((prevTasks) => prevTasks.filter((task) => task.id !== taskId));
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {tasks.length > 0 ? (
        tasks.map((task) => (
          <TaskCard
            key={task.id} // Use the task ID or another unique identifier
            task={task}
            onEdit={handleEdit} // Pass the onEdit handler
            onDelete={handleDelete} // Pass the onDelete handler
          />
        ))
      ) : (
        <div>No tasks found.</div>
      )}
    </div>
  );
};

export default TaskList;
