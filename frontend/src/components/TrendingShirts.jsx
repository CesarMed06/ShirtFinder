const SHIRTS = [
    {
        id: 1,
        name: "FC Barcelona 1ª Equipación 2025/2026",
        priceRange: "150–180€",
        image: "https://res.cloudinary.com/dwldyiruu/image/upload/v1768391529/CAMI_BARSA_hqgltq.png"
    },
    {
        id: 2,
        name: "PSG 1ª Equipación 2025/2026",
        priceRange: "95–100€",
        image: "https://res.cloudinary.com/dwldyiruu/image/upload/v1768391529/CAMI_PSG_vvsblc.png"
    },
    {
        id: 3,
        name: "Venezia FC 1ª Equipación 2023/2024",
        priceRange: "90–100€",
        image: "https://res.cloudinary.com/dwldyiruu/image/upload/v1768391529/CAMI_VENECIA_xpfc7g.png"
    },
    {
        id: 4,
        name: "AS Roma 3ª Equipación 2025/2026",
        priceRange: "90–100€",
        image: "https://res.cloudinary.com/dwldyiruu/image/upload/v1768391529/CAMI_ROMA_rfhor4.png"
    },
];

function TrendingShirts() {
    return (
    <section className="sf-tendencias">
        <h2>Tendencias del momento</h2>

        <div className="sf-tendencias__grid">
        {SHIRTS.map((shirt) => (
        <article key={shirt.id} className="sf-card">
            <div className="sf-card__imagen-box">
                <img 
                    src={shirt.image} 
                    alt={shirt.name} 
                    className="sf-card__img" 
                />
            </div>
            
            <h3 className="sf-card__titulo">{shirt.name}</h3>
            
            <div className="sf-card__info-bottom">
                <p className="sf-card__precio-rango">{shirt.priceRange}</p>
                <button className="sf-card__boton">VER MÁS</button>
            </div>
        </article>
        ))}
        </div>
    </section>
    );
}

export default TrendingShirts;