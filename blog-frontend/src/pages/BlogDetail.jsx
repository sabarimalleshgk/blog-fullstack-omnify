import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../services/api';
import { useAuth } from '../context/AuthContext';

const BlogDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [blog, setBlog] = useState(null);

  useEffect(() => {
    api.get(`/blogs/${id}`)
      .then(res => setBlog(res.data))
      .catch(() => alert("Failed to load blog"));
  }, [id]);

  const handleDelete = async () => {
    if (window.confirm("Are you sure you want to delete this blog?")) {
      try {
        await api.delete(`/blogs/${id}`);
        navigate('/');
      } catch {
        alert('Delete failed');
      }
    }
  };

  if (!blog) return <div className="text-center mt-10 text-gray-500">Loading...</div>;

  const isAuthor = user && user.username === blog.author_username;

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 bg-white shadow-lg rounded-xl mt-10 sm:px-6 md:px-10">
      {/* Title */}
      <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 break-words">
        {blog.title}
      </h1>

      {/* Author */}
      <p className="text-sm text-gray-500 mb-6">
        By <span className="font-medium text-blue-700">{blog.author_username}</span>
      </p>

      {/* Blog content */}
      <div className="text-gray-800 leading-relaxed whitespace-pre-wrap mb-6 text-base sm:text-lg">
        {blog.content}
      </div>

      {/* Buttons for Author only */}
      {isAuthor && (
        <div className="flex flex-wrap gap-4">
          <button
            onClick={() => navigate(`/edit/${blog.id}`)}
            className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg shadow-sm transition-all duration-200"
          >
            ✏️ Edit
          </button>
          <button
            onClick={handleDelete}
            className="bg-red-600 hover:bg-red-700 text-white px-5 py-2 rounded-lg shadow-sm transition-all duration-200"
          >
            🗑️ Delete
          </button>
        </div>
      )}
    </div>
  );
};

export default BlogDetail;



