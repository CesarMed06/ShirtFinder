import { Routes, Route } from 'react-router-dom';
import Header from "./components/Header";
import Footer from "./components/Footer";
import Hero from "./components/Hero";
import TrendingShirts from "./components/TrendingShirts";
import Login from "./components/Login";
import Register from "./components/Register";
import Catalog from "./components/Catalog";
import ShirtDetail from "./pages/ShirtDetail";
import ForgotPassword from './pages/ForgotPassword';
import ResetPassword from './pages/ResetPassword';
import Forum from './pages/Forum';
import CreatePost from './pages/CreatePost';
import PostDetail from './pages/PostDetail';

function Home() {
  return (
    <>
      <Hero />
      <TrendingShirts />
    </>
  );
}

import MyAccount from "./pages/MyAccount";

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
          <Route path="/my-account" element={<MyAccount />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/reset-password" element={<ResetPassword />} />
          <Route path="/foro" element={<Forum />} />
          <Route path="/foro/crear" element={<CreatePost />} />
          <Route path="/foro/:postId" element={<PostDetail />} />
        </Routes>
      </main>

      <Footer />
    </div>
  );
}

export default App;
