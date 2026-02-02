import { useState, useEffect } from 'react';

function Catalog() {
    const [shirts, setShirts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetch('http://localhost:5000/api/shirts')
            .then(res => res.json())
            .then(data => {
                setShirts(data);
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
                    <article key={shirt.id} className="sf-catalog-card">
                        <button className="sf-catalog-card__heart">♡</button>

                        <div className="sf-catalog-card__image-box">
                            <img src={shirt.image} alt={shirt.name} className="sf-catalog-card__image" />
                        </div>

                        <h3 className="sf-catalog-card__name">{shirt.name}</h3>

                        <p className="sf-catalog-card__price">{shirt.price}</p>

                        <div className="sf-catalog-card__footer">
                            <span className="sf-catalog-card__stars">{renderStars(shirt.rating)}</span>
                            <button className="sf-catalog-card__button">VER MÁS</button>
                        </div>
                    </article>
                ))}
            </div>
        </section>
    );
}

export default Catalog;
