import React, { useState } from 'react';

const TaskCard = ({ task, updateTask, deleteTask, toggleComplete }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedTask, setEditedTask] = useState({ ...task });

  const handleUpdate = () => {
    updateTask(task.id, editedTask);
    setIsEditing(false);
  };

  const priorityColor = {
    Low: 'var(--priority-low)',
    Medium: 'var(--priority-medium)',
    High: 'var(--priority-high)'
  };

  const isDueToday = task.dueDate && new Date(task.dueDate).toDateString() === new Date().toDateString();
  const isOverdue = task.dueDate && !task.completed && new Date(task.dueDate) < new Date(new Date().setHours(0,0,0,0));

  return (
    <div 
      className={`task-panel glass-morphism ${task.completed ? 'completed' : ''} ${isOverdue ? 'overdue' : ''} fade-in`}
      style={{ '--priority-color': priorityColor[task.priority] }}
    >
      <div className="check-container">
        <div 
          className={`custom-checkbox ${task.completed ? 'checked' : ''}`} 
          onClick={() => toggleComplete(task.id)}
        >
          {task.completed && '✓'}
        </div>
      </div>

      <div className="task-info">
        {isEditing ? (
          <div className="edit-flow" style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            <input 
              value={editedTask.title} 
              onChange={e => setEditedTask({...editedTask, title: e.target.value})}
              autoFocus
            />
            <textarea 
              value={editedTask.description} 
              onChange={e => setEditedTask({...editedTask, description: e.target.value})}
            />
            <div style={{ display: 'flex', gap: '8px' }}>
               <button onClick={handleUpdate} className="primary-btn" style={{ padding: '8px 16px' }}>Save</button>
               <button onClick={() => setIsEditing(false)} style={{ color: 'var(--text-muted)' }}>Discard</button>
            </div>
          </div>
        ) : (
          <>
            <div className="task-title-row" style={{ display: 'flex', alignItems: 'center', marginBottom: '8px' }}>
              <h3 style={{ margin: 0 }}>{task.title}</h3>
              <span className="tag-badge">{task.tagName}</span>
              {isDueToday && !task.completed && <span className="status-chip urgent" style={{ background: 'rgba(251, 191, 36, 0.15)', color: '#fbbf24', marginLeft: '10px' }}>Today</span>}
            </div>
            
            {task.description && <p className="task-details">{task.description}</p>}
            
            <div className="task-meta-row">
              <div className="meta-item">
                <span style={{ width: 8, height: 8, borderRadius: '50%', background: priorityColor[task.priority] }}></span>
                {task.priority}
              </div>
              
              {task.dueDate && (
                <div className="meta-item">
                  📅 {new Date(task.dueDate).toLocaleDateString(undefined, { month: 'short', day: 'numeric' })}
                  {task.dueTime && ` • ${task.dueTime}`}
                </div>
              )}
              
              <div className="meta-item" style={{ marginLeft: 'auto', opacity: 0.5, fontSize: '0.7rem' }}>
                ID: {task.id.toString().slice(-6)}
              </div>
            </div>
          </>
        )}
      </div>

      <div className="task-actions-panel">
        <button className="icon-btn" onClick={() => setIsEditing(true)}>✏️</button>
        <button className="icon-btn delete-btn" onClick={() => deleteTask(task.id)}>🗑️</button>
      </div>
    </div>
  );
};

export default TaskCard;
