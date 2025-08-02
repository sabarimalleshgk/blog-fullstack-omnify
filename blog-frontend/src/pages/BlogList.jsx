import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../services/api';

const BlogList = () => {
  const [blogs, setBlogs] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [hasNextPage, setHasNextPage] = useState(true);

  const limit = 5;

  useEffect(() => {
    const fetchBlogs = async () => {
      setLoading(true);
      try {
        const res = await api.get(`/blogs?page=${page}&limit=${limit}`);
        setBlogs(res.data.results || res.data); // depending on your pagination format
        setHasNextPage(res.data.next !== null); // for DRF-style pagination
      } catch (err) {
        console.error("Failed to fetch blogs:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchBlogs();
  }, [page]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white px-4 py-10">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-extrabold text-center text-gray-800 mb-10 tracking-tight">
          📚 Blog Posts
        </h1>

        {loading ? (
          <p className="text-center text-gray-500 text-lg">Loading blogs...</p>
        ) : blogs.length === 0 ? (
          <p className="text-center text-gray-500 text-lg">No blogs found.</p>
        ) : (
          blogs.map(blog => (
            <div
              key={blog.id || blog._id}
              className="mb-6 bg-white border border-gray-200 p-6 rounded-2xl shadow-sm hover:shadow-md transition duration-300"
            >
              <h2 className="text-2xl font-semibold text-gray-900 mb-2">{blog.title}</h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                {blog.content.length > 150
                  ? blog.content.slice(0, 150) + '...'
                  : blog.content}
              </p>
              <Link
                to={`/blog/${blog.id || blog._id}`}
                className="inline-block text-blue-600 hover:text-blue-800 font-medium transition"
              >
                Read more →
              </Link>
            </div>
          ))
        )}

        <div className="flex items-center justify-center gap-6 mt-12">
          <button
            disabled={page === 1}
            onClick={() => setPage(p => p - 1)}
            className={`px-5 py-2 rounded-full font-medium shadow ${
              page === 1
                ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                : 'bg-blue-600 hover:bg-blue-700 text-white transition'
            }`}
          >
            ⬅ Prev
          </button>
          <span className="text-lg text-gray-700 font-semibold">Page {page}</span>
          <button
            disabled={!hasNextPage}
            onClick={() => setPage(p => p + 1)}
            className={`px-5 py-2 rounded-full font-medium shadow ${
              !hasNextPage
                ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                : 'bg-blue-600 hover:bg-blue-700 text-white transition'
            }`}
          >
            Next ➡
          </button>
        </div>
      </div>
    </div>
  );
};

export default BlogList;


