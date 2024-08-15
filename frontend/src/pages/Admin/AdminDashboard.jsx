import React, { useEffect, useState } from 'react';
import StatsCard from '../../components/Admin/Dashboard/StatsCard';
import EventsList from '../../components/Admin/Dashboard/EventsList';
import TasksList from '../../components/Admin/Dashboard/TasksList';
import { AdminAPI } from '../../api/Admin';
import { toast } from 'react-toastify';

export default function AdminDashboard() {
  const [dashboardData, setDashboardData] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    AdminAPI.GetAdminDashboardData(token)
      .then((data) => {
        setDashboardData(data.data);
      })
      .catch((error) => {
        toast.error('Failed to load dashboard data');
        console.log(error);
      });
  }, []);

  if (!dashboardData) {
    return <div>Loading...</div>;
  }

  return (
    <div className="ml-64 p-6 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
        <StatsCard title="Total Events" value={dashboardData.totalEvents} />
        <StatsCard
          title="Upcoming Events"
          value={dashboardData.upcomingEvents}
        />
        <StatsCard title="Past Events" value={dashboardData.pastEvents} />
        <StatsCard
          title="Incomplete Tasks"
          value={dashboardData.incompleteTasks}
        />
        <StatsCard
          title="Completed Tasks"
          value={dashboardData.completedTasks}
        />
        <StatsCard title="Total Users" value={dashboardData.totalUsers} />
        <StatsCard title="Total Admins" value={dashboardData.totalAdmins} />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <EventsList
          events={dashboardData.upcomingEventsList}
          title="Upcoming Events"
        />
        <TasksList
          tasks={dashboardData.incompleteTasksList}
          title="Incomplete Tasks"
        />
      </div>
    </div>
  );
}
