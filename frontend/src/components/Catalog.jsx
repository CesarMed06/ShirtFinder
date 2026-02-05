import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

function Catalog() {
    const [shirts, setShirts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetch('http://localhost:5000/api/shirts')
            .then(res => res.json())
            .then(data => {
                setShirts(data.data || []);
                setLoading(false);
            })
            .catch(err => {
                setError('Error al cargar las camisetas');
                setLoading(false);
            });
    }, []);

    const renderStars = (rating) => {
        return "★".repeat(rating) + "☆".repeat(5 - rating);
    };

    if (loading) {
        return <div className="sf-catalog"><p>Cargando camisetas...</p></div>;
    }

    if (error) {
        return <div className="sf-catalog"><p>{error}</p></div>;
    }

    return (
        <section className="sf-catalog">
            <div className="sf-catalog__header">
            
                <h1 className="sf-catalog__title">Resultados de búsqueda</h1>
                <p className="sf-catalog__count">Mostrando {shirts.length} resultados</p>
            </div>

            <div className="sf-catalog__grid">
                {shirts.map((shirt) => (
                    <article key={shirt.id_shirts} className="sf-catalog-card">
                        <button className="sf-catalog-card__heart">♡</button>

                        <div className="sf-catalog-card__image-box">
                            <img src={shirt.image_url} alt={shirt.team} className="sf-catalog-card__image" />
                        </div>

                        <h3 className="sf-catalog-card__name">{shirt.team} {shirt.season}</h3>

                        <p className="sf-catalog-card__price">{shirt.price}€</p>

                        <div className="sf-catalog-card__footer">
                            <span className="sf-catalog-card__stars">{renderStars(4)}</span>
                            <Link to={`/shirt/${shirt.id_shirts}`}>
                                <button className="sf-catalog-card__button">VER MÁS</button>
                            </Link>
                        </div>
                    </article>
                ))}
            </div>
        </section>
    );
}

export default Catalog;
