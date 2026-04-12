import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const API_URL = import.meta.env.VITE_API_URL;

const getDailyFeatured = (shirts) => {
    if (!shirts || shirts.length === 0) return [];
    const today = new Date();
    const seed = today.getFullYear() * 10000 + (today.getMonth() + 1) * 100 + today.getDate();
    const shuffled = [...shirts].sort((a, b) => {
        const hashA = (a.id_shirts * seed) % 997;
        const hashB = (b.id_shirts * seed) % 997;
        return hashA - hashB;
    });
    return shuffled.slice(0, 3);
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
                            <p className="sf-card__precio-rango">{shirt.price}€</p>
                            <button className="sf-card__boton" onClick={(e) => { e.stopPropagation(); navigate(`/shirt/${shirt.id_shirts}`); }}>VER MÁS</button>
                        </div>
                    </article>
                ))}
            </div>
        </section>
    );
}

export default TrendingShirts;