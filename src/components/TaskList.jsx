import React from 'react';
import TaskCard from './TaskCard';

const TaskList = ({ tasks, allTasks, updateTask, deleteTask, toggleComplete }) => {
  if (allTasks.length === 0) {
    return (
      <div className="empty-hero glass-morphism fade-in">
        <div className="empty-icon-animated">🛸</div>
        <h2 style={{ fontSize: '2rem' }}>No Data Detected</h2>
        <p style={{ opacity: 0.6 }}>The task database is empty. Initialize a new objective above to begin.</p>
      </div>
    );
  }

  if (tasks.length === 0) {
    return (
      <div className="empty-hero glass-morphism fade-in">
        <div className="empty-icon-animated">🔍</div>
        <h2>Filter Overload</h2>
        <p style={{ opacity: 0.6 }}>No tasks match the current search or filter parameters.</p>
      </div>
    );
  }

  return (
    <div className="task-container-list" style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      {tasks.map(task => (
        <TaskCard 
          key={task.id} 
          task={task} 
          updateTask={updateTask} 
          deleteTask={deleteTask} 
          toggleComplete={toggleComplete} 
        />
      ))}
    </div>
  );
};

export default TaskList;
