import React, { useState } from 'react';

const ChallengeTracker = ({ challenges, setChallenges }) => {
  const [formData, setFormData] = useState({
    title: '',
    durationDays: 100,
    date: '',
    month: '',
    year: new Date().getFullYear()
  });

  const [isExpanded, setIsExpanded] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.title.trim() || !formData.date || !formData.month || !formData.year) return;

    const startDateStr = `${formData.year}-${String(formData.month).padStart(2, '0')}-${String(formData.date).padStart(2, '0')}`;
    
    const newChallenge = {
      id: Date.now(),
      title: formData.title,
      durationDays: Number(formData.durationDays),
      startDate: startDateStr,
      createdAt: new Date().toISOString()
    };

    setChallenges([newChallenge, ...challenges]);
    setFormData({
      title: '',
      durationDays: 100,
      date: '',
      month: '',
      year: new Date().getFullYear()
    });
    setIsExpanded(false);
  };

  const deleteChallenge = (id) => {
    if(window.confirm('Erase this challenge object from existence?')) {
      setChallenges(challenges.filter(c => c.id !== id));
    }
  };

  return (
    <section className="challenge-tracker glass-morphism" style={{ marginBottom: '1.5rem', padding: '1.5rem', borderRadius: '20px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
        <h2 style={{ fontSize: '1.2rem', margin: 0, fontWeight: 700 }}>Active Challenges</h2>
        <button 
          className="theme-btn" 
          onClick={() => setIsExpanded(!isExpanded)} 
          style={{ padding: '6px 16px', borderRadius: '12px', background: 'var(--glass-bg)', color: 'inherit', border: '1px solid var(--glass-border)', cursor: 'pointer', fontWeight: 600 }}
        >
          {isExpanded ? 'Close Form' : '+ New Challenge'}
        </button>
      </div>

      {isExpanded && (
        <form onSubmit={handleSubmit} className="form-inner fade-in" style={{ padding: '1rem 0', borderTop: '1px solid var(--glass-border)', marginBottom: '1rem' }}>
          <div className="input-field" style={{ marginBottom: '1rem' }}>
            <label className="input-label" style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase', color: 'var(--text-muted)' }}>
              Challenge Details (E.g. 100 Days of Pushups)
            </label>
            <input 
              type="text" 
              placeholder="Maine 100 days pushup ka challenge liya hai..."
              value={formData.title}
              onChange={(e) => setFormData({...formData, title: e.target.value})}
              style={{ width: '100%', padding: '12px', borderRadius: '12px', background: 'rgba(0,0,0,0.1)', color: 'inherit', border: '1px solid var(--glass-border)', outline: 'none' }}
            />
          </div>
          <div className="form-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(100px, 1fr))', gap: '1rem' }}>
            <div className="input-field">
              <label className="input-label" style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase', color: 'var(--text-muted)' }}>Days</label>
              <input 
                type="number" 
                value={formData.durationDays}
                min="1"
                onChange={(e) => setFormData({...formData, durationDays: e.target.value})}
                style={{ width: '100%', padding: '10px', borderRadius: '10px', background: 'rgba(0,0,0,0.1)', color: 'inherit', border: '1px solid var(--glass-border)', outline: 'none' }}
              />
            </div>
            <div className="input-field">
              <label className="input-label" style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase', color: 'var(--text-muted)' }}>Date</label>
              <input 
                type="number" 
                placeholder="DD"
                min="1" max="31"
                value={formData.date}
                onChange={(e) => setFormData({...formData, date: e.target.value})}
                style={{ width: '100%', padding: '10px', borderRadius: '10px', background: 'rgba(0,0,0,0.1)', color: 'inherit', border: '1px solid var(--glass-border)', outline: 'none' }}
              />
            </div>
            <div className="input-field">
              <label className="input-label" style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase', color: 'var(--text-muted)' }}>Month</label>
              <select 
                value={formData.month}
                onChange={(e) => setFormData({...formData, month: e.target.value})}
                style={{ width: '100%', padding: '10px', borderRadius: '10px', background: 'rgba(0,0,0,0.1)', color: 'inherit', border: '1px solid var(--glass-border)', outline: 'none' }}
              >
                <option value="">Select Month</option>
                <option value="1">January</option>
                <option value="2">February</option>
                <option value="3">March</option>
                <option value="4">April</option>
                <option value="5">May</option>
                <option value="6">June</option>
                <option value="7">July</option>
                <option value="8">August</option>
                <option value="9">September</option>
                <option value="10">October</option>
                <option value="11">November</option>
                <option value="12">December</option>
              </select>
            </div>
            <div className="input-field">
              <label className="input-label" style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase', color: 'var(--text-muted)' }}>Year</label>
              <input 
                type="number" 
                value={formData.year}
                min="2000" max="2100"
                placeholder="YYYY"
                onChange={(e) => setFormData({...formData, year: e.target.value})}
                style={{ width: '100%', padding: '10px', borderRadius: '10px', background: 'rgba(0,0,0,0.1)', color: 'inherit', border: '1px solid var(--glass-border)', outline: 'none' }}
              />
            </div>
          </div>
          <div className="action-bar" style={{ marginTop: '1.5rem', display: 'flex', justifyContent: 'flex-end', gap: '1rem' }}>
            <button type="button" onClick={() => setIsExpanded(false)} style={{ background: 'transparent', border: 'none', color: 'var(--text-muted)', cursor: 'pointer', fontWeight: 600 }}>
              Cancel
            </button>
            <button type="submit" className="primary-btn" style={{ background: 'linear-gradient(to right, var(--primary), var(--secondary))', border: 'none', color: 'white', padding: '10px 24px', borderRadius: '12px', cursor: 'pointer', fontWeight: 700 }}>
              Commence Challenge
            </button>
          </div>
        </form>
      )}

      <div className="challenges-list" style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        {challenges.length === 0 && !isExpanded && (
          <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', textAlign: 'center', fontStyle: 'italic', margin: '1rem 0' }}>
            No active challenges detected. Initiate a new challenge sequence!
          </p>
        )}
        {challenges.map(challenge => {
          const start = new Date(challenge.startDate);
          const today = new Date();
          start.setHours(0,0,0,0);
          today.setHours(0,0,0,0);
          const diffDays = Math.floor((today - start) / (1000 * 60 * 60 * 24));
          const currentDay = Math.max(0, diffDays);
          const percentage = Math.min(100, Math.round((currentDay / challenge.durationDays) * 100));
          
          return (
            <div key={challenge.id} className="challenge-card fade-in" style={{ padding: '1.25rem', background: 'rgba(255, 255, 255, 0.03)', borderRadius: '16px', border: '1px solid var(--glass-border)', transition: 'transform 0.2s ease', position: 'relative' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.75rem' }}>
                <h3 style={{ margin: 0, fontSize: '1.15rem', fontWeight: 700 }}>{challenge.title}</h3>
                <button 
                  onClick={() => deleteChallenge(challenge.id)}
                  style={{ background: 'rgba(248, 113, 113, 0.15)', border: 'none', color: 'var(--priority-high)', cursor: 'pointer', fontSize: '1.2rem', width: '32px', height: '32px', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                  title="Abandon Challenge"
                >
                  ×
                </button>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem', fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                <span>Day <strong style={{ color: 'var(--primary)', fontSize: '1rem' }}>{currentDay}</strong> of {challenge.durationDays}</span>
                <span>Started: {new Date(challenge.startDate).toLocaleDateString()}</span>
              </div>
              <div className="progress-track" style={{ height: '10px', background: 'var(--glass-border)', borderRadius: '10px', overflow: 'hidden' }}>
                <div 
                  className="progress-fill" 
                  style={{ 
                    height: '100%', 
                    background: 'linear-gradient(to right, var(--primary), var(--secondary))', 
                    width: `${percentage}%`,
                    transition: 'width 1s ease-in-out',
                    boxShadow: '0 0 10px var(--primary-glow)'
                  }}
                ></div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default ChallengeTracker;
