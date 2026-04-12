import { Link } from 'react-router-dom';
import { FaStar, FaRegStar, FaStarHalfAlt } from 'react-icons/fa';
import FavoriteButton from './FavoriteButton';

const ShirtCard = ({ shirt }) => {
    const renderStars = (rating) => {
        const stars = [];
        const fullStars = Math.floor(rating);
        const hasHalfStar = rating % 1 >= 0.5;

        for (let i = 0; i < 5; i++) {
            if (i < fullStars) stars.push(<FaStar key={i} />);
            else if (i === fullStars && hasHalfStar) stars.push(<FaStarHalfAlt key={i} />);
            else stars.push(<FaRegStar key={i} />);
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

    return (
        <article className="sf-catalog-card" style={{ position: 'relative' }}>
            <div className="sf-catalog-card__heart-btn">
                <FavoriteButton shirtId={shirt.id_shirts} size="small" />
            </div>

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
    );
};

export default ShirtCard;