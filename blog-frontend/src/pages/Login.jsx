import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import jwt_decode from 'jwt-decode';
import { useAuth } from '../context/AuthContext';

const Login = () => {
  const [form, setForm] = useState({ username: '', password: '' });
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:8000/api/token/', form);
      const { access, refresh } = res.data;

      const decoded = jwt_decode(access);
      localStorage.setItem('accessToken', access);
      localStorage.setItem('refreshToken', refresh);
      localStorage.setItem('user', JSON.stringify(decoded));

      if (login) login(access, refresh);
      alert('Login successful!');
      navigate('/');
    } catch (err) {
      alert('Login failed: ' + (err.response?.data?.detail || 'Unknown error'));
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-400 via-blue-400 to-purple-500 px-4">
      <div className="w-full max-w-md bg-white bg-opacity-90 p-8 rounded-2xl shadow-2xl">
        <h2 className="text-3xl font-extrabold text-center text-blue-700 mb-6">Welcome Back 👋</h2>
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
            <input
              name="username"
              type="email"
              required
              value={form.username}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-blue-300 rounded-lg placeholder-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
              placeholder="📧 your@email.com"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
            <input
              name="password"
              type="password"
              required
              value={form.password}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-green-300 rounded-lg placeholder-green-300 focus:outline-none focus:ring-2 focus:ring-green-500 transition"
              placeholder="🔒 ••••••••"
            />
          </div>
          <button
            type="submit"
            className="w-full py-3 bg-gradient-to-r from-blue-600 to-green-600 text-white font-semibold rounded-lg shadow-md hover:scale-105 transform transition duration-300 ease-in-out"
          >
            🚀 Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;








