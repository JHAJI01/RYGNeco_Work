import React, { useState, useEffect } from 'react';
import { getUser, saveUser, clearUser } from './utils/localStorage.js';
import Login from './components/Login.jsx';
import TaskDashboard from './components/TaskDashboard.jsx';

function App() {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const savedUser = getUser();
    if (savedUser) {
      setUser(savedUser.username);
    }
    setIsLoading(false);
  }, []);

  const handleLogin = (username) => {
    saveUser({ username });
    setUser(username);
  };

  const handleLogout = () => {
    clearUser();
    setUser(null);
  };

  if (isLoading) {
    return (
      <div className="loading-container">
        <div className="loading-content">
          <div className="spinner"></div>
          <p>Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="App">
      {user ? (
        <TaskDashboard username={user} onLogout={handleLogout} />
      ) : (
        <Login onLogin={handleLogin} />
      )}
    </div>
  );
}

export default App;