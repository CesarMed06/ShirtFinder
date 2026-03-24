import { Route, Routes } from 'react-router-dom';

import Catalog from './components/Catalog';
import Footer from './components/Footer';
import Header from './components/Header';
import Login from './components/Login';
import PrivateRoute from './components/PrivateRoute';
import Register from './components/Register';

import CreatePost from './pages/CreatePost';
import ForgotPassword from './pages/ForgotPassword';
import Forum from './pages/Forum';
import Home from './pages/Home';
import MyAccount from './pages/MyAccount';
import NotFound from './pages/NotFound';
import PostDetail from './pages/PostDetail';
import ResetPassword from './pages/ResetPassword';
import ShirtDetail from './pages/ShirtDetail';

function App() {
  return (
    <div className="app-container">
      <Header />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/catalog" element={<Catalog />} />
          <Route path="/shirt/:id" element={<ShirtDetail />} />
          <Route path="/my-account" element={<PrivateRoute><MyAccount /></PrivateRoute>} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/reset-password" element={<ResetPassword />} />
          <Route path="/foro" element={<Forum />} />
          <Route path="/foro/crear" element={<CreatePost />} />
          <Route path="/foro/:postId" element={<PostDetail />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App;
