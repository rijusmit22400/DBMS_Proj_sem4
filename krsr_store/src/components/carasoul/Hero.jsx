import React, { useState, useEffect } from 'react';
import './Hero.css';

function Hero() {
    const [currentSlide, setCurrentSlide] = useState(0);
    const slides = [
        {
            id: 1,
            imageUrl: 'https://i1.adis.ws/i/canon/eos-r7-lifestyle_c604337a3b374a94a080d40b43f3a920?$70-30-header-4by3-dt-jpg$',
            description: 'DSLR Camera',
            subtext: 'The best camera for professional photography'
        },
        {
            id: 2,
            imageUrl: 'https://m.media-amazon.com/images/I/51dZjSUcs9L._AC_UF1000,1000_QL80_.jpg',
            description: 'Laptop Lamination',
            subtext: 'Protect your laptop from scratches and dust'
        },
        // Add more slide objects with imageUrl and description
    ];

    const nextSlide = () => {
        setCurrentSlide((currentSlide + 1) % slides.length);
    };

    const prevSlide = () => {
        setCurrentSlide((currentSlide - 1 + slides.length) % slides.length);
    };

    useEffect(() => {
        const handleKeyDown = (event) => {
            if (event.key === 'ArrowRight') {
                nextSlide();
            } else if (event.key === 'ArrowLeft') {
                prevSlide();
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => {
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, [nextSlide, prevSlide]);

    return (
        <div className="slider">
            {slides.map((slide, index) => (
                <div
                    className={`slide ${index === currentSlide ? 'active' : ''}`}
                    key={slide.id}
                    style={{ backgroundImage: `url(${slide.imageUrl})` }}
                >
                    <div className="slide-content">
                        <h2>{slide.description}</h2>
                        <p>{slide.subtext}</p>
                    </div>
                </div>
            ))}
            <div className="slider-nav">
                {slides.map((slide, index) => (
                    <a
                        href="#"
                        onClick={() => setCurrentSlide(index)}
                        key={slide.id}
                        className={index === currentSlide ? 'active' : ''}
                    ></a>
                ))}
            </div>
            <button className="arrow arrow-left" onClick={prevSlide}>
            <i className="bi bi-arrow-left-short"></i>
            </button>
            <button className="arrow arrow-right" onClick={nextSlide}>
            <i className="bi bi-arrow-right-short"></i>
            </button>
        </div>
    );
}

export default Hero;