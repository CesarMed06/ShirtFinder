import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const API_URL = import.meta.env.VITE_API_URL;

const getDailyFeatured = (shirts) => {
    if (!shirts || shirts.length === 0) return [];

    const today = new Date();
    let seed = today.getFullYear() * 10000 + (today.getMonth() + 1) * 100 + today.getDate();

    const rand = () => {
        seed = (seed * 1664525 + 1013904223) & 0xffffffff;
        return (seed >>> 0) / 0xffffffff;
    };

    const arr = [...shirts];
    for (let i = arr.length - 1; i > 0; i--) {
        const j = Math.floor(rand() * (i + 1));
        [arr[i], arr[j]] = [arr[j], arr[i]];
    }

    return arr.slice(0, 3);
};

const getPriceRange = (price) => {
    const base = parseFloat(price);
    if (isNaN(base)) return price;
    const low = Math.floor(base * 0.9 / 5) * 5;
    const high = Math.ceil(base * 1.2 / 5) * 5;
    return `${low}-${high}€`;
};

function TrendingShirts() {
    const navigate = useNavigate();
    const [featured, setFeatured] = useState([]);

    useEffect(() => {
        fetch(`${API_URL}/api/shirts`)
            .then(r => r.json())
            .then(data => {
                const shirts = Array.isArray(data) ? data : (data.data || []);
                setFeatured(getDailyFeatured(shirts));
            })
            .catch(() => setFeatured([]));
    }, []);

    if (featured.length === 0) return null;

    return (
        <section className="sf-tendencias">
            <h2>Tendencias del momento</h2>

            <div className="sf-tendencias__grid">
                {featured.map((shirt) => (
                    <article key={shirt.id_shirts} className="sf-card" onClick={() => navigate(`/shirt/${shirt.id_shirts}`)} style={{ cursor: 'pointer' }}>
                        <div className="sf-card__imagen-box">
                            <img
                                src={shirt.image_url || shirt.image_1}
                                alt={`${shirt.team} ${shirt.season}`}
                                className="sf-card__img"
                                style={{ mixBlendMode: 'multiply' }}
                            />
                        </div>

                        <h3 className="sf-card__titulo">{shirt.team} {shirt.season} - {shirt.tipo}</h3>

                        <div className="sf-card__info-bottom">
                            <p className="sf-card__precio-rango">{getPriceRange(shirt.price)}</p>
                            <button className="sf-card__boton" onClick={(e) => { e.stopPropagation(); navigate(`/shirt/${shirt.id_shirts}`); }}>VER MÁS</button>
                        </div>
                    </article>
                ))}
            </div>
        </section>
    );
}

export default TrendingShirts;