import React from 'react';
import TaskCard from '../Task/TaskCard'; // Assuming you have a TaskCard component

const MyPastTasks = ({ pastTasks }) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-lg">
      <h2 className="text-2xl font-semibold mb-4">My Past Tasks</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {pastTasks.length > 0 ? (
          pastTasks.map((task) => (
            <TaskCard
              key={task.id}
              task={task}
              onEdit={null}
              onDelete={null}
              canModify={false}
            />
          ))
        ) : (
          <p className="text-gray-600">No past tasks to display.</p>
        )}
      </div>
    </div>
  );
};

export default MyPastTasks;
