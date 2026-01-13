const SHIRTS = [
    {
    id: 1,
    name: "FC Barcelona 1ª Equipación 2025/2026",
    priceRange: "150–180€",
    },
    {
    id: 2,
    name: "PSG 1ª Equipación 2025/2026",
    priceRange: "95–100€",
    },
    {
    id: 3,
    name: "Venezia FC 1ª Equipación 2023/2024",
    priceRange: "90–100€",
    },
    {
    id: 4,
    name: "AS Roma 3ª Equipación 2025/2026",
    priceRange: "90–100€",
    },
];

function TrendingShirts() {
    return (
    <section className="sf-tendencias">
        <h2>Tendencias del momento</h2>

        <div className="sf-tendencias__grid">
        {SHIRTS.map((shirt) => (
        <article key={shirt.id} className="sf-card">
            <div className="sf-card__imagen" />
            <h3 className="sf-card__titulo">{shirt.name}</h3>
            <p className="sf-card__precio-rango">{shirt.priceRange}</p>
            <button className="sf-card__boton">VER MÁS</button>
        </article>
        ))}
        </div>
    </section>
    );
}

export default TrendingShirts;
