import React from "react";
import TrendingShirts from "../components/TrendingShirts";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();
  return (
    <div className="home-container">
      <section className="hero-section">
        <h1>ShirtFinder</h1>
        <p>Descubre camisetas históricas de fútbol de todo el mundo</p>
        <button className="explore-btn" onClick={() => navigate('/catalog')}>Explorar catálogo</button>
      </section>
      <section className="trending-section">
        <h2>Tendencias del momento</h2>
        <TrendingShirts
          onCardClick={id => navigate(`/shirt/${id}`)}
          onVerMas={id => navigate(`/shirt/${id}`)}
        />
      </section>
    </div>
  );
};

export default Home;
