import React from 'react';

const ProgressTracker = ({ tasks }) => {
  const total = tasks.length;
  const completed = tasks.filter(t => t.completed).length;
  const percentage = total === 0 ? 0 : Math.round((completed / total) * 100);

  return (
    <div className="progress-box glass-morphism">
      <div className="progress-header">
        <span style={{ color: 'var(--text-muted)', fontSize: '0.85rem', textTransform: 'uppercase' }}>
          Efficiency Protocol
        </span>
        <span style={{ color: 'var(--primary)', fontVariantNumeric: 'tabular-nums' }}>
          {percentage}% Complete
        </span>
      </div>
      
      <div className="progress-track">
        <div 
          className="progress-fill" 
          style={{ width: `${percentage}%` }}
        ></div>
      </div>
      
      <div style={{ marginTop: '10px', fontSize: '0.75rem', opacity: 0.6, display: 'flex', justifyContent: 'space-between' }}>
        <span>{completed} Tasks Synchronized</span>
        <span>{total} Total Nodes</span>
      </div>
    </div>
  );
};

export default ProgressTracker;
