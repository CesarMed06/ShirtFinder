function Catalog() {
    const shirts = [
        {
            id: 1,
            name: "Manchester United 1ª Equipación 2021/2022",
            price: "90-110€",
            rating: 5
        },
        {
            id: 2,
            name: "Paris Saint-Germain 1ª Equipación 2021/2022",
            price: "85-105€",
            rating: 4
        },
        {
            id: 3,
            name: "Bayern München 1ª Equipación 2024/2025",
            price: "115-125€",
            rating: 5
        },
        {
            id: 4,
            name: "Ajax 1ª Equipación 2023/2024",
            price: "80-100€",
            rating: 4
        },
        {
            id: 5,
            name: "Arsenal 1ª Equipación 2024/2025",
            price: "115-125€",
            rating: 5
        },
        {
            id: 6,
            name: "Juventus 1ª Equipación 2025/2026",
            price: "125-135€",
            rating: 4
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

                        <div className="sf-catalog-card__image-box"></div>

                        <h3 className="sf-catalog-card__name">{shirt.name}</h3>

                        <div className="sf-catalog-card__footer">
                            <span className="sf-catalog-card__stars">{renderStars(shirt.rating)}</span>
                            <p className="sf-catalog-card__price">{shirt.price}</p>
                            <button className="sf-catalog-card__button">VER MÁS</button>
                        </div>
                    </article>
                ))}
            </div>
        </section>
    );
}

export default Catalog;
