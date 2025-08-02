import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Signup = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: ''
  });

  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const res = await axios.post('http://localhost:8000/auth/signup/', formData);
      if (res.status === 201) {
        alert('Account created! You can now login.');
        navigate('/login');
      }
    } catch (err) {
      setError(err.response?.data?.error || 'Signup failed');
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-purple-400 via-pink-400 to-yellow-300">
      <form
        onSubmit={handleSubmit}
        className="bg-white bg-opacity-90 p-8 rounded-2xl shadow-2xl w-full max-w-md space-y-6"
      >
        <h2 className="text-3xl font-extrabold text-center text-purple-700">Create an Account</h2>

        {error && <p className="text-red-600 text-center font-semibold">{error}</p>}

        <input
          type="text"
          name="username"
          placeholder="👤 Username"
          value={formData.username}
          onChange={handleChange}
          className="w-full px-4 py-3 border border-purple-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 transition"
          required
        />

        <input
          type="email"
          name="email"
          placeholder="📧 Email"
          value={formData.email}
          onChange={handleChange}
          className="w-full px-4 py-3 border border-pink-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500 transition"
          required
        />

        <input
          type="password"
          name="password"
          placeholder="🔒 Password"
          value={formData.password}
          onChange={handleChange}
          className="w-full px-4 py-3 border border-yellow-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500 transition"
          required
        />

        <button
          type="submit"
          className="w-full py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold rounded-lg shadow-md hover:scale-105 transform transition duration-300 ease-in-out"
        >
          🚀 Sign Up
        </button>
      </form>
    </div>
  );
};

export default Signup;




