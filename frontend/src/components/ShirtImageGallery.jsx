import { useState } from 'react';
import './ShirtImageGallery.css';

function ShirtImageGallery({ shirt }) {
    const [imagenActiva, setImagenActiva] = useState(0);

    const imagenes = [
        shirt.image_1,
        shirt.image_2,
        shirt.image_3,
        shirt.image_4,
        shirt.image_5
    ].filter(img => img);

    if (imagenes.length === 0) {
        return (
            <div className="gallery-simple">
                <img src={shirt.image_url} alt={shirt.team} loading="lazy" />
            </div>
        );
    }

    if (imagenes.length === 1) {
        return (
            <div className="gallery-simple">
                <img src={imagenes[0]} alt={shirt.team} loading="lazy" />
            </div>
        );
    }

    return (
        <div className="gallery">
            <div className="main-image-container">
                <img src={imagenes[imagenActiva]} alt={shirt.team} loading="lazy" />
            </div>

            <div className="thumbnails">
                {imagenes.map((img, index) => (
                    <div
                        key={index}
                        className={`thumbnail ${imagenActiva === index ? 'active' : ''}`}
                        onClick={() => setImagenActiva(index)}
                    >
                        <img src={img} alt="" loading="lazy" />
                    </div>
                ))}
            </div>
        </div>
    );
}

export default ShirtImageGallery;
