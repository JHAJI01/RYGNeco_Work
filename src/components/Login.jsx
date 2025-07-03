import React, { useState } from 'react';

const Login = ({ onLogin }) => {
  const [username, setUsername] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (username.trim()) {
      setIsLoading(true);
      // Simulate loading for better UX
      await new Promise(resolve => setTimeout(resolve, 500));
      onLogin(username.trim());
      setIsLoading(false);
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <div className="login-header">
          <div className="login-icon">
            <span>👤</span>
          </div>
          <h1>Welcome Back</h1>
          <p>Enter your username to continue</p>
        </div>

        <form onSubmit={handleSubmit} className="login-form">
          <div className="form-group">
            <label htmlFor="username">Username</label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Enter your username"
              required
              disabled={isLoading}
            />
          </div>

          <button
            type="submit"
            disabled={!username.trim() || isLoading}
            className="login-button"
          >
            {isLoading ? (
              <div className="button-spinner"></div>
            ) : (
              <>
                <span>🔑</span>
                <span>Continue</span>
              </>
            )}
          </button>
        </form>

        <div className="login-footer">
          <p>No account needed - just enter any username to get started!</p>
        </div>
      </div>
    </div>
  );
};

export default Login;