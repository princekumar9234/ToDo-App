import React, { useState, useEffect } from 'react';
import TaskForm from './components/TaskForm';
import TaskList from './components/TaskList';
import FilterBar from './components/FilterBar';
import ProgressTracker from './components/ProgressTracker';
import './index.css';
import './App.css';
import './Components.css';

const App = () => {
  const [tasks, setTasks] = useState(() => {
    const savedTasks = localStorage.getItem('tasks');
    return savedTasks ? JSON.parse(savedTasks) : [];
  });

  const [darkMode, setDarkMode] = useState(() => {
    return localStorage.getItem('theme') !== 'light';
  });

  const [filter, setFilter] = useState('all');
  const [sortBy, setSortBy] = useState('recent');
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  useEffect(() => {
    document.body.className = darkMode ? 'dark' : 'light';
    localStorage.setItem('theme', darkMode ? 'dark' : 'light');
  }, [darkMode]);

  const addTask = (task) => {
    setTasks([task, ...tasks]);
  };

  const updateTask = (id, updatedTask) => {
    setTasks(tasks.map(t => t.id === id ? { ...t, ...updatedTask } : t));
  };

  const deleteTask = (id) => {
    if (window.confirm('Erase this task from existence?')) {
      setTasks(tasks.filter(t => t.id !== id));
    }
  };

  const toggleComplete = (id) => {
    setTasks(tasks.map(t => t.id === id ? { ...t, completed: !t.completed } : t));
  };

  const resetTasks = () => {
    if (window.confirm('Nuke all tasks? This cannot be undone!')) {
      setTasks([]);
    }
  };

  const filteredTasks = tasks
    .filter(task => {
      if (filter === 'completed') return task.completed;
      if (filter === 'pending') return !task.completed;
      if (filter === 'high') return task.priority === 'High';
      return true;
    })
    .filter(task => 
      task.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      task.tagName.toLowerCase().includes(searchQuery.toLowerCase())
    )
    .sort((a, b) => {
      if (sortBy === 'priority') {
        const priorityMap = { High: 3, Medium: 2, Low: 1 };
        return priorityMap[b.priority] - priorityMap[a.priority];
      }
      if (sortBy === 'dueDate') {
        if (!a.dueDate) return 1;
        if (!b.dueDate) return -1;
        return new Date(a.dueDate) - new Date(b.dueDate);
      }
      return new Date(b.createdAt) - new Date(a.createdAt);
    });

  return (
    <div className="app-container">
      <header className="fade-in">
        <div className="header-top">
          <h1 className="glow-text">ToDo App</h1>
          <button 
            className="theme-btn" 
            onClick={() => setDarkMode(!darkMode)}
          >
            {darkMode ? '🌙' : '☀️'}
          </button>
        </div>
        
        <ProgressTracker tasks={tasks} />
        
        <FilterBar 
          filter={filter} 
          setFilter={setFilter} 
          sortBy={sortBy} 
          setSortBy={setSortBy}
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
        />
      </header>

      <main className="fade-in">
        <TaskForm addTask={addTask} />
        
        <TaskList 
          tasks={filteredTasks} 
          allTasks={tasks}
          updateTask={updateTask} 
          deleteTask={deleteTask} 
          toggleComplete={toggleComplete}
        />
        
        {tasks.length > 0 && (
          <div className="reset-container">
            <button className="danger-btn" onClick={resetTasks}>
              🗑️ Clear Database
            </button>
          </div>
        )}
      </main>

      <footer className="footer">
        <p>© 2026 Aurora OS. The future of productivity.</p>
      </footer>
    </div>
  );
};

export default App;
