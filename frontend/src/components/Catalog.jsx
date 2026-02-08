import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

function Catalog() {
    const [shirts, setShirts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const [filters, setFilters] = useState({
        ordenar: '',
        tipo: '',
        talla: '',
        marca: '',
        version: '',
        valoracion: '',
        stock: false,
        descuento: false
    });

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

    const handleFilterChange = (filterName, value) => {
        setFilters(prev => ({
            ...prev,
            [filterName]: value
        }));
    };

    const toggleCheckbox = (filterName) => {
        setFilters(prev => ({
            ...prev,
            [filterName]: !prev[filterName]
        }));
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

            <div className="sf-catalog__content">
                <aside className="sf-catalog__filters">
                    <div className="sf-filter">
                        <label className="sf-filter__label">Ordenar por</label>
                        <select
                            className="sf-filter__select"
                            value={filters.ordenar}
                            onChange={(e) => handleFilterChange('ordenar', e.target.value)}
                        >
                            <option value="">Seleccionar</option>
                            <option value="precio-menor">Precio (menor a mayor)</option>
                            <option value="precio-mayor">Precio (mayor a menor)</option>
                            <option value="recientes">Más recientes</option>
                        </select>
                    </div>

                    <div className="sf-filter">
                        <label className="sf-filter__label">Tipo de equipación</label>
                        <select
                            className="sf-filter__select"
                            value={filters.tipo}
                            onChange={(e) => handleFilterChange('tipo', e.target.value)}
                        >
                            <option value="">Seleccionar</option>
                            <option value="local">Local</option>
                            <option value="visitante">Visitante</option>
                            <option value="alternativa">Alternativa</option>
                            <option value="portero">Portero</option>
                        </select>
                    </div>

                    <div className="sf-filter">
                        <label className="sf-filter__label">Talla</label>
                        <select
                            className="sf-filter__select"
                            value={filters.talla}
                            onChange={(e) => handleFilterChange('talla', e.target.value)}
                        >
                            <option value="">Seleccionar</option>
                            <option value="xl">XL</option>
                            <option value="l">L</option>
                            <option value="m">M</option>
                            <option value="s">S</option>
                            <option value="xs">XS</option>
                        </select>
                    </div>

                    <div className="sf-filter">
                        <label className="sf-filter__label">Marca</label>
                        <select
                            className="sf-filter__select"
                            value={filters.marca}
                            onChange={(e) => handleFilterChange('marca', e.target.value)}
                        >
                            <option value="">Seleccionar</option>
                            <option value="adidas">Adidas</option>
                            <option value="nike">Nike</option>
                            <option value="puma">Puma</option>
                            <option value="hummel">Hummel</option>
                        </select>
                    </div>

                    <div className="sf-filter">
                        <label className="sf-filter__label">Versión</label>
                        <select
                            className="sf-filter__select"
                            value={filters.version}
                            onChange={(e) => handleFilterChange('version', e.target.value)}
                        >
                            <option value="">Seleccionar</option>
                            <option value="jugador">Jugador</option>
                            <option value="aficionado">Aficionado</option>
                        </select>
                    </div>

                    <div className="sf-filter">
                        <label className="sf-filter__label">Valoración</label>
                        <select
                            className={`sf-filter__select ${filters.valoracion ? 'sf-filter__select--stars' : ''}`}
                            value={filters.valoracion}
                            onChange={(e) => handleFilterChange('valoracion', e.target.value)}
                        >
                            <option value="">Seleccionar</option>
                            <option value="5">★★★★★</option>
                            <option value="4">★★★★☆</option>
                            <option value="3">★★★☆☆</option>
                            <option value="2">★★☆☆☆</option>
                            <option value="1">★☆☆☆☆</option>
                        </select>
                    </div>

                    <div className="sf-filter sf-filter--checkbox">
                        <label className="sf-filter__label">En stock</label>
                        <label className="sf-filter__checkbox-container">
                            <input
                                type="checkbox"
                                checked={filters.stock}
                                onChange={() => toggleCheckbox('stock')}
                            />
                            <span className="sf-filter__checkmark"></span>
                        </label>
                    </div>

                    <div className="sf-filter sf-filter--checkbox">
                        <label className="sf-filter__label">En descuento</label>
                        <label className="sf-filter__checkbox-container">
                            <input
                                type="checkbox"
                                checked={filters.descuento}
                                onChange={() => toggleCheckbox('descuento')}
                            />
                            <span className="sf-filter__checkmark"></span>
                        </label>
                    </div>

                    <button className="sf-filter__apply-btn">Aplicar cambios</button>
                </aside>

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
                                <span className="sf-catalog-card__stars">{renderStars(0)}</span>
                                <Link to={`/shirt/${shirt.id_shirts}`}>
                                    <button className="sf-catalog-card__button">VER MÁS</button>
                                </Link>
                            </div>
                        </article>
                    ))}
                </div>
            </div>
        </section>
    );
}

export default Catalog;
