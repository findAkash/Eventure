import React, { useEffect, useState } from 'react';
import PersonalDetails from '../../components/Profile/PersonalDetails';
import MyPastEvents from '../../components/Profile/MyPastEvents';
import MyPastTasks from '../../components/Profile/MyPastTasks';
import { UserAPI } from '../../api/User';
import { EventAPI } from '../../api/event';
import { TaskAPI } from '../../api/task';

const ProfilePage = () => {
  const [user, setUser] = useState({});
  const [pastEvents, setPastEvents] = useState([]);
  const [pastTasks, setPastTasks] = useState([]);

  useEffect(() => {
    const fetchUserProfile = async () => {
      const token = localStorage.getItem('token');
      const userData = await UserAPI.GetUserById(token);
      setUser(userData.data);

      const userString = localStorage.getItem('user');
      const user = userString ? JSON.parse(userString) : null;
      const userId = user ? user._id : null;
      const eventsData = await EventAPI.GetMyPastEvent(token, userId);
      setPastEvents(eventsData);

      const tasksData = await TaskAPI.GetMyPastTasks(token, userId);
      setPastTasks(tasksData);
    };

    fetchUserProfile();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="container mx-auto">
        <PersonalDetails user={user} />
        <MyPastEvents pastEvents={pastEvents} />
        <MyPastTasks pastTasks={pastTasks} />
      </div>
    </div>
  );
};

export default ProfilePage;
