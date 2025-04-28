"use client";

import React, { useState, useEffect } from 'react';

const images = [
  "/img/banner1.jpg",
  "/img/banner2.jpg",
  "/img/banner3.jpg"
];

const Banner = () => {
  const [current, setCurrent] = useState(0);

  const nextSlide = () => {
    setCurrent((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  const prevSlide = () => {
    setCurrent((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev === images.length - 1 ? 0 : prev + 1));
    }, 7000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div style={{ position: "relative", width: "100%", overflow: "hidden", marginBottom: "1rem", marginLeft: "1cm", marginRight: "1cm", borderRadius: "0.8rem" }}>
      <div
        style={{
          display: "flex",
          width: `${images.length * 100}%`,
          transform: `translateX(-${current * (100 / images.length)}%)`,
          transition: "transform 1s ease",
        }}
      >
        {images.map((src, index) => (
          <img
            key={index}
            src={src}
            alt={`Banner ${index + 1}`}
            style={{ width: `${100 / images.length}%`, height: "auto", flexShrink: 0 }}
          />
        ))}
      </div>
      <button onClick={prevSlide} style={{ position: "absolute", top: "50%", left: "10px", transform: "translateY(-50%)", backgroundColor: "rgba(0,0,0,0.5)", color: "white", border: "none", padding: "0.5rem", cursor: "pointer" }}>
        {"<"}
      </button>
      <button onClick={nextSlide} style={{ position: "absolute", top: "50%", right: "10px", transform: "translateY(-50%)", backgroundColor: "rgba(0,0,0,0.5)", color: "white", border: "none", padding: "0.5rem", cursor: "pointer" }}>
        {">"}
      </button>
    </div>
  );
};

export default Banner;
