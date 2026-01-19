import { Routes, Route } from 'react-router-dom';
import Header from "./components/Header";
import Footer from "./components/Footer";
import Hero from "./components/Hero";
import TrendingShirts from "./components/TrendingShirts";

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

        </Routes>
      </main>

      <Footer />
    </div>
  );
}

export default App;