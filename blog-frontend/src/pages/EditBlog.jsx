import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../services/api';
import { useAuth } from '../context/AuthContext';

const EditBlog = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [form, setForm] = useState({ title: '', content: '' });
  const [loading, setLoading] = useState(true);
  const [notAllowed, setNotAllowed] = useState(false);

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const res = await api.get(`/blogs/${id}`);
        if (user && res.data.author_id !== user.user_id) {
          setNotAllowed(true);
        } else {
          setForm({ title: res.data.title, content: res.data.content });
        }
      } catch (err) {
        alert('Failed to load blog');
      } finally {
        setLoading(false);
      }
    };
    fetchBlog();
  }, [id, user]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.put(`/blogs/${id}`, form);
      navigate(`/blog/${id}`);
    } catch (err) {
      if (err.response?.status === 403) {
        alert('❌ You do not have permission to update this blog.');
      } else if (err.response?.status === 401) {
        alert('🔐 Please login again. Token might have expired.');
      } else {
        alert('Update failed');
      }
    }
  };

  if (loading)
    return (
      <p className="text-center text-gray-600 text-lg font-medium py-10">
        ⏳ Loading blog data...
      </p>
    );

  if (notAllowed)
    return (
      <p className="text-center text-red-600 text-lg font-semibold py-10">
        🚫 You are not allowed to edit this blog.
      </p>
    );

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-100 via-blue-50 to-white px-4 py-12">
      <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow-lg p-8">
        <h2 className="text-3xl font-extrabold text-gray-800 mb-6 text-center">✏️ Edit Your Blog</h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">Title</label>
            <input
              name="title"
              value={form.title}
              required
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
              placeholder="Enter a catchy title"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">Content</label>
            <textarea
              name="content"
              rows="10"
              value={form.content}
              required
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg px-4 py-2 resize-none focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
              placeholder="Write your content here..."
            />
          </div>

          <div className="flex justify-end">
            <button
              type="submit"
              className="bg-green-600 hover:bg-green-700 text-white font-semibold px-6 py-2 rounded-lg shadow transition duration-200"
            >
              ✅ Update Blog
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditBlog;


