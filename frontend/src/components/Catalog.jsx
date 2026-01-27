function Catalog() {
    const shirts = [
        {
            id: 1,
            name: "Ajax 1ª Equipación 2023/2024",
            price: "80-100€",
            rating: 5,
            image: "https://res.cloudinary.com/dwldyiruu/image/upload/v1769505263/AJAX_23-24_fpzbqa.png"
        },
        {
            id: 2,
            name: "Arsenal 1ª Equipación 2024/2025",
            price: "115-125€",
            rating: 5,
            image: "https://res.cloudinary.com/dwldyiruu/image/upload/v1769505260/ARSENAL_24-25_zrtjuj.png"
        },
        {
            id: 3,
            name: "Bayern de Múnich 1ª Equipación 2024/2025",
            price: "110-125€",
            rating: 5,
            image: "https://res.cloudinary.com/dwldyiruu/image/upload/v1769505260/BAYERN_24-25_w4cyiv.png"
        },
        {
            id: 4,
            name: "Juventus 1ª Equipación 2025/2026",
            price: "125-135€",
            rating: 5,
            image: "https://res.cloudinary.com/dwldyiruu/image/upload/v1769505260/JUVENTUS_25-26_hlukzs.png"
        },
        {
            id: 5,
            name: "Arsenal 1ª Equipación 2025/2026",
            price: "150-180€",
            rating: 5,
            image: "https://res.cloudinary.com/dwldyiruu/image/upload/v1769505260/ARSENAL_24-25_zrtjuj.png"
        },
        {
            id: 6,
            name: "Manchester United 1ª Equipación 2024/2026",
            price: "180-180€",
            rating: 5,
            image: "https://res.cloudinary.com/dwldyiruu/image/upload/v1769505261/UNITED_25-26_knnnmo.png"
        }
    ];

    const renderStars = (rating) => {
        return "★".repeat(rating) + "☆".repeat(5 - rating);
    };

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
