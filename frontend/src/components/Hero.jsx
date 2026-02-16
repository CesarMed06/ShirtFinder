import { useNavigate } from 'react-router-dom';

function Hero() {
    const navigate = useNavigate();

    return (
        <section className="sf-hero">
            <div className="sf-hero__contenido">
                <h1>Viste la historia del fútbol</h1>
                <p>Esa equipación mítica que dabas por perdida...</p>
                <button className="sf-btn-principal" onClick={() => navigate('/catalog')}>Explorar catálogo</button>
            </div>
        </section>
    );
}

export default Hero;