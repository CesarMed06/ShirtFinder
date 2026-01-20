import { Routes, Route } from 'react-router-dom';
import Header from "./components/Header";
import Footer from "./components/Footer";
import Hero from "./components/Hero";
import TrendingShirts from "./components/TrendingShirts";
import Login from "./components/Login"; 

function Home() {
  return (
    <>
      <Hero />
      <TrendingShirts />
    </>
  );
}

function App() {
  return (
    <div className="app-container">
      <Header />

      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} /> 
        </Routes>
      </main>

      <Footer />
    </div>
  );
}

export default App;