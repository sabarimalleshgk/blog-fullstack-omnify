import { Routes, Route } from 'react-router-dom';
import Signup from './pages/Signup';
import Login from './pages/Login';
import CreateBlog from './pages/CreateBlog';
import BlogList from './pages/BlogList';
import BlogDetail from './pages/BlogDetail';
import EditBlog from './pages/EditBlog';
import Navbar from './components/Navbar';

function App() {
  return (
    
    <>
    
      <Navbar />
      <Routes>
        <Route path="/" element={<BlogList />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/blog/create" element={<CreateBlog />} />
        <Route path="/blog/:id" element={<BlogDetail />} />
        <Route path="/blog/:id/edit" element={<EditBlog />} />
        <Route path="/edit/:id" element={<EditBlog />} />
      </Routes>
    </>
  );
}

export default App;
