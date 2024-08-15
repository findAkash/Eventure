import React, { useEffect, useState } from 'react';
import Navbar from '../../components/Nav/Navbar';
import DateFilter from '../../components/DateFilter';
import TaskList from '../../components/Task/TaskList'; // Import TaskList
import { TaskAPI } from '../../api/task';
import AddTaskForm from '../../components/Task/AddTaskForm';
import { toast } from 'react-toastify';
import { AdminAPI } from '../../api/Admin';

export const TaskPage = () => {
  const [tasks, setTasks] = useState([]);
  const [filteredTasks, setFilteredTasks] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showAddTaskForm, setShowAddTaskForm] = useState(false);

  const fetchTasks = async (callback) => {
    try {
      const userString = localStorage.getItem('user');
      const user = userString ? JSON.parse(userString) : null;
      const userId = user ? user._id : null;
      const token = localStorage.getItem('token');

      const tasksResponse = await AdminAPI.GetAllTaskByAdmin(token);
      const taskData = tasksResponse.data;
      //   console.log('Task data:', taskData);

      setTasks(taskData);
      setFilteredTasks(taskData); // Initialize filtered events
      if (callback) callback();
      setIsLoading(false);
    } catch (error) {
      console.error('Error fetching tasks:', error);
      setError('Failed to load tasks');
      setIsLoading(false);
    }
  };

  const handleEdit = (updatedTask) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) => (task.id === updatedTask.id ? updatedTask : task))
    );
    setFilteredTasks((prevTasks) =>
      prevTasks.map((task) => (task.id === updatedTask.id ? updatedTask : task))
    );
  };

  const handleDelete = async (taskId) => {
    try {
      const token = localStorage.getItem('token');
      await TaskAPI.DeleteTask(taskId, token);
      setTasks((prevTasks) => prevTasks.filter((task) => task.id !== taskId));
      setFilteredTasks((prevTasks) =>
        prevTasks.filter((task) => task.id !== taskId)
      );
      toast.success('Task deleted successfully');
    } catch (error) {
      console.error('Error deleting task:', error);
      toast.error('Failed to delete task');
    }
  };

  const handleSearch = (searchTerm) => {
    if (searchTerm) {
      const filtered = tasks.filter((task) =>
        task.title.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredTasks(filtered);
    } else {
      setFilteredTasks(tasks); // Reset to original tasks if search term is cleared
    }
  };

  const handleFilterByDate = (startDate, endDate) => {
    const filtered = tasks.filter((task) => {
      const taskDeadline = new Date(task.deadline);
      const start = startDate ? new Date(startDate) : null;
      const end = endDate ? new Date(endDate) : null;

      if (start && end) {
        return taskDeadline >= start && taskDeadline <= end;
      } else if (start) {
        return taskDeadline >= start;
      } else if (end) {
        return taskDeadline <= end;
      }
      return true;
    });

    setFilteredTasks(filtered);
  };

  useEffect(() => {
    setIsLoading(true);
    fetchTasks();
    setIsLoading(false);
  }, []);
  const handleAddTask = () => {
    fetchTasks(); // Refetch tasks after adding a new one
    setShowAddTaskForm(false); // Close the form
  };
  console.log('Task data:', tasks);
  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <div className="ml-64 p-6 bg-gray-100 min-h-screen">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h1 className="text-2xl font-bold mb-4">My Tasks</h1>
          <div className="flex justify-between mb-6">
            <DateFilter onFilter={handleFilterByDate} />{' '}
            {/* Add DateFilter here */}
          </div>
          <TaskList data={filteredTasks} /> {/* No props needed */}
        </div>
      </div>
    </>
  );
};
