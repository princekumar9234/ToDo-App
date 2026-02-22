import React, { useState } from 'react';

const TaskForm = ({ addTask }) => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    priority: 'Medium',
    dueDate: '',
    dueTime: '',
    tagName: 'Personal'
  });

  const [isExpanded, setIsExpanded] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.title.trim()) return;

    const newTask = {
      ...formData,
      id: Date.now(),
      completed: false,
      createdAt: new Date().toISOString()
    };

    addTask(newTask);
    setFormData({
      title: '',
      description: '',
      priority: 'Medium',
      dueDate: '',
      dueTime: '',
      tagName: 'Personal'
    });
    setIsExpanded(false);
  };

  return (
    <section className="form-card glass-morphism">
      <div className="form-trigger" onClick={() => setIsExpanded(!isExpanded)}>
        <input
          type="text"
          placeholder="New initialization... What's next?"
          value={formData.title}
          onChange={(e) => {
            setFormData({ ...formData, title: e.target.value });
            if(!isExpanded) setIsExpanded(true);
          }}
          onClick={(e) => e.stopPropagation()}
          className="title-field"
          style={{ background: 'transparent', border: 'none', width: '80%', padding: '0', fontSize: '1.1rem' }}
        />
        <span style={{ fontSize: '1.2rem', opacity: 0.7 }}>{isExpanded ? '▼' : '▲'}</span>
      </div>

      {isExpanded && (
        <form onSubmit={handleSubmit} className="form-inner fade-in">
          <textarea
            placeholder="Detailed logs and parameters..."
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            rows="3"
          />

          <div className="form-grid">
            <div className="input-field">
              <label className="input-label">Priority</label>
              <select
                value={formData.priority}
                onChange={(e) => setFormData({ ...formData, priority: e.target.value })}
                className="full-width"
              >
                <option value="Low">Low Priority</option>
                <option value="Medium">Medium Priority</option>
                <option value="High">Critical Priority</option>
              </select>
            </div>

            <div className="input-field">
              <label className="input-label">Sector</label>
              <select
                value={formData.tagName}
                onChange={(e) => setFormData({ ...formData, tagName: e.target.value })}
                className="full-width"
              >
                <option value="Personal">Personal</option>
                <option value="Work">Work Ops</option>
                <option value="Study">Research</option>
                <option value="Health">Vitality</option>
              </select>
            </div>

            <div className="input-field">
              <label className="input-label">Deadline</label>
              <input
                type="date"
                value={formData.dueDate}
                onChange={(e) => setFormData({ ...formData, dueDate: e.target.value })}
                className="full-width"
              />
            </div>

            <div className="input-field">
              <label className="input-label">Timestamp</label>
              <input
                type="time"
                value={formData.dueTime}
                onChange={(e) => setFormData({ ...formData, dueTime: e.target.value })}
                className="full-width"
              />
            </div>
          </div>

          <div className="action-bar">
            <button type="button" onClick={() => setIsExpanded(false)} style={{ color: 'var(--text-muted)' }}>
              Abort
            </button>
            <button type="submit" className="primary-btn">
              Deploy Task
            </button>
          </div>
        </form>
      )}
    </section>
  );
};

export default TaskForm;
