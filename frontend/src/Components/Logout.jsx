import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Logout.css';

const Logout = () => {
  const navigate = useNavigate();
  const [secondsLeft, setSecondsLeft] = useState(10);

  useEffect(() => {
    const handleLogout = async () => {
      try {
        await axios.post(
          'http://localhost:5000/api/logout',
          {},
          { withCredentials: true }
        );
      } catch (err) {
        console.error('Error during logout:', err);
      }
    };

    handleLogout();

    const countdownInterval = setInterval(() => {
      setSecondsLeft((prev) => {
        if (prev <= 1) {
          clearInterval(countdownInterval);
          navigate('/login');
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(countdownInterval);
  }, [navigate]);

  return (
    <div className="auth-container">
      <div className="auth-card glassy logout-card">
        <h1 className="logout-greeting">We’ll miss you! 💖</h1>
        <h2 className="auth-title">Goodbye, friend! 👋</h2>
        <p className="auth-subtitle">We're grateful you chose us today. Your session has ended safely.</p>
        <p>Hope to see you again soon — redirecting to login in <strong>{secondsLeft}</strong> second{secondsLeft !== 1 && 's'}...</p>
      </div>
    </div>
  );
};

export default Logout;
