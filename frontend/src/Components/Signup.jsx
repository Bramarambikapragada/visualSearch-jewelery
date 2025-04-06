import React, { useState } from 'react';
import './Auth.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const SignupPage = () => {
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [gender, setGender] = useState('');

  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const validate = () => {
    const newErrors = {};

    if (!fullName.trim()) newErrors.fullName = 'Name is required.';
    if (!/^\d{10}$/.test(phone)) newErrors.phone = 'Enter a valid 10-digit phone number.';
    if (!/\S+@\S+\.\S+/.test(email)) newErrors.email = 'Enter a valid email address.';
    if (password.length < 6) newErrors.password = 'Password must be at least 6 characters.';
    if (password !== confirmPassword) newErrors.confirmPassword = 'Passwords do not match.';
    if (!gender) newErrors.gender = 'Please select your gender.';

    setErrors(newErrors);

    if (Object.keys(newErrors).length > 0) {
      toast.error("Please fix the errors in the form.");
      return false;
    }

    return true;
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    try {
      const response = await axios.post('http://localhost:5000/api/signup', {
        fullName,
        email,
        phone,
        password,
        gender
      }, {
        withCredentials: true
      });

      if (response.data.message === "User added successfully!") {
        toast.success("Signup successful! Redirecting...");
        setTimeout(() => navigate('/'), 200);
      }
    } catch (err) {
      const errorMsg = err.response?.data || 'Signup failed. Try again.';
      setErrors({ api: errorMsg });
      toast.error(errorMsg);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card glassy">
        <h2 className="auth-title">Join Us ✨</h2>
        <p className="auth-subtitle">Create your account to start shopping luxury</p>

        <form onSubmit={handleSignup}>
          <input
            type="text"
            placeholder="Full Name"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
          />
          {errors.fullName && <p className="error">{errors.fullName}</p>}

          <input
            type="text"
            placeholder="Phone Number"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
          {errors.phone && <p className="error">{errors.phone}</p>}

          <input
            type="email"
            placeholder="Email Address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          {errors.email && <p className="error">{errors.email}</p>}

          <input
            type="password"
            placeholder="Create Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {errors.password && <p className="error">{errors.password}</p>}

          <input
            type="password"
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
          {errors.confirmPassword && <p className="error">{errors.confirmPassword}</p>}

          <select value={gender} onChange={(e) => setGender(e.target.value)}>
            <option value="">Select Gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="prefer-not">Prefer not to say</option>
          </select>
          {errors.gender && <p className="error">{errors.gender}</p>}

          {errors.api && <p className="error">{errors.api}</p>}

          <button type="submit">Sign Up</button>
        </form>

        <p className="auth-footer">
          Already have an account? <a href="/login">Login here</a>
        </p>
      </div>
    </div>
  );
};

export default SignupPage;
