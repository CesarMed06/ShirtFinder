import { useEffect, useMemo, useState } from 'react';
import './ShirtImageGallery.css';

function ShirtImageGallery({ shirt }) {
    const images = useMemo(() => {
        const list = [
            shirt?.image_1,
            shirt?.image_2,
            shirt?.image_3,
            shirt?.image_4,
            shirt?.image_url
        ].filter(Boolean);

        return [...new Set(list)];
    }, [shirt]);

    const [selectedImage, setSelectedImage] = useState('');

    useEffect(() => {
        setSelectedImage(images[0] || '');
    }, [images]);

    if (!images.length) return null;

    return (
        <div className="gallery">
            <div className="main-image-container">
                <img src={selectedImage} alt={shirt?.team || 'Camiseta'} />
            </div>

            {images.length > 1 && (
                <div className="thumbnails">
                    {images.map((image, index) => (
                        <button
                            key={index}
                            type="button"
                            className={`thumbnail ${selectedImage === image ? 'active' : ''}`}
                            onClick={() => setSelectedImage(image)}
                        >
                            <img src={image} alt={`${shirt?.team || 'Camiseta'} ${index + 1}`} />
                        </button>
                    ))}
                </div>
            )}
        </div>
    );
}

export default ShirtImageGallery;