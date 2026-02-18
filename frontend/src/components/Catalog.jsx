import { useState, useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { FaStar, FaRegStar, FaStarHalfAlt } from 'react-icons/fa';
import Swal from 'sweetalert2';

function Catalog() {
    const [searchParams] = useSearchParams();
    const searchQuery = searchParams.get('search');

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
        fetchShirts();
    }, [searchQuery]);

    const fetchShirts = () => {
        let url;

        if (searchQuery) {
            url = `http://localhost:5000/api/shirts/search?q=${searchQuery}`;
        } else {
            url = 'http://localhost:5000/api/shirts?';
            const params = [];

            if (filters.marca) params.push(`brand=${filters.marca}`);
            if (filters.tipo) params.push(`tipo=${filters.tipo}`);
            if (filters.version) params.push(`version=${filters.version}`);
            if (filters.valoracion) params.push(`rating=${filters.valoracion}`);
            if (filters.ordenar === 'precio-menor') params.push('sortBy=price_asc');
            if (filters.ordenar === 'precio-mayor') params.push('sortBy=price_desc');
            if (filters.ordenar === 'recientes') params.push('sortBy=recent');

            url += params.join('&');
        }

        fetch(url)
            .then(res => res.json())
            .then(data => {
                setShirts(data.data || []);
                setLoading(false);
            })
            .catch(err => {
                setError('Error al cargar las camisetas');
                setLoading(false);
                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: 'No se pudieron cargar las camisetas. Inténtalo de nuevo más tarde.',
                    confirmButtonColor: '#ff8a3d'
                });
            });
    };

    const renderStars = (rating) => {
        const stars = [];
        const fullStars = Math.floor(rating);
        const hasHalfStar = rating % 1 >= 0.5;

        for (let i = 0; i < 5; i++) {
            if (i < fullStars) {
                stars.push(<FaStar key={i} />);
            } else if (i === fullStars && hasHalfStar) {
                stars.push(<FaStarHalfAlt key={i} />);
            } else {
                stars.push(<FaRegStar key={i} />);
            }
        }
        return stars;
    };

    const getPriceRange = (price) => {
        const base = parseFloat(price);
        if (isNaN(base)) return price;
        const low = Math.floor(base * 0.9 / 5) * 5;
        const high = Math.ceil(base * 1.2 / 5) * 5;
        return `${low}-${high}€`;
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

    const applyFilters = () => {
        fetchShirts();
        Swal.fire({
            icon: 'success',
            title: 'Filtros aplicados',
            text: 'El catálogo se ha actualizado según tus preferencias.',
            timer: 3000, // Aumentado de 1500 a 3000
            showConfirmButton: false,
            toast: true,
            position: 'top-end'
        });
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
                <h1 className="sf-catalog__title">
                    {searchQuery ? `Resultados de búsqueda para: "${searchQuery}"` : 'Catálogo de camisetas'}
                </h1>
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
                            <option value="Local">Local</option>
                            <option value="Visitante">Visitante</option>
                            <option value="Alternativa">Alternativa</option>
                            <option value="Portero">Portero</option>
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
                            <option value="Adidas">Adidas</option>
                            <option value="Nike">Nike</option>
                            <option value="Puma">Puma</option>
                            <option value="Hummel">Hummel</option>
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
                            <option value="Jugador">Jugador</option>
                            <option value="Aficionado">Aficionado</option>
                        </select>
                    </div>

                    <div className="sf-filter">
                        <label className="sf-filter__label">Valoración</label>
                        <select
                            className="sf-filter__select"
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

                    <button className="sf-filter__apply-btn" onClick={applyFilters}>Aplicar cambios</button>
                </aside>

                <div className="sf-catalog__grid">
                    {shirts.map((shirt) => (
                        <article key={shirt.id_shirts} className="sf-catalog-card">
                            <button className="sf-catalog-card__heart">♡</button>

                            <div className="sf-catalog-card__image-box">
                                <img
                                    src={(shirt.image_url || shirt.image_1)?.replace('dwidyinuu', 'dwldyiruu')}
                                    alt={`${shirt.team} ${shirt.season}`}
                                    className="sf-catalog-card__image"
                                    onError={(e) => {
                                        e.target.onerror = null;
                                        e.target.style.display = 'none';
                                    }}
                                />
                            </div>

                            <h3 className="sf-catalog-card__name">{shirt.team} {shirt.season} - {shirt.tipo}</h3>

                            <p className="sf-catalog-card__price">{getPriceRange(shirt.price)}</p>

                            <div className="sf-catalog-card__footer">
                                <span className="sf-catalog-card__stars">{renderStars(shirt.average_rating || 0)}</span>
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
