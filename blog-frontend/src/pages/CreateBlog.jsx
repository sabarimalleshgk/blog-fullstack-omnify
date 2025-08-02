import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const CreateBlog = () => {
  const [form, setForm] = useState({ title: '', content: '' });
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  // ✅ Load user from localStorage
  useEffect(() => {
    const userData = localStorage.getItem('user');
    if (userData) {
      setUser(JSON.parse(userData));
    }
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem('accessToken');
    if (!user || !token) {
      alert('You are not logged in.');
      return;
    }

    try {
      await axios.post(
        'http://localhost:8000/api/blogs/',
        form,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        }
      );

      alert('Blog created successfully!');
      navigate('/');
    } catch (err) {
      console.error('Create Blog Error:', err.response?.data || err.message);
      alert('Failed to create blog.');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="w-full max-w-2xl bg-white p-8 rounded-2xl shadow-md">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">📝 Create Blog</h2>

        {!user ? (
          <p className="text-center text-red-600 font-semibold">🚫 You must be logged in to create a blog.</p>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block mb-1 text-sm font-medium text-gray-700">Title</label>
              <input
                name="title"
                value={form.title}
                onChange={handleChange}
                className="w-full border border-gray-300 px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter blog title"
                required
              />
            </div>
            <div>
              <label className="block mb-1 text-sm font-medium text-gray-700">Content</label>
              <textarea
                name="content"
                value={form.content}
                onChange={handleChange}
                className="w-full border border-gray-300 px-4 py-2 rounded-lg h-48 resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Write your blog content..."
                required
              />
            </div>
            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-lg transition duration-200"
            >
              🚀 Publish Blog
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default CreateBlog;






