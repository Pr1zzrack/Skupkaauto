import React, { useEffect, useState } from "react";
import "./slider.scss";
import logo from "../../assets/logo-2.png";
import Aos from "aos";
import "aos/dist/aos.css";
import slider1 from "../../assets/slider1.webp";
import slider2 from "../../assets/slider2.avif";
import slider3 from "../../assets/slider3.avif";

const Slider = () => {
  useEffect(() => {
    Aos.init({
      duration: 650,
      once: true,
    });
  }, []);
  const [slideIndex, setSlideIndex] = useState(1);
  const slides = [`${slider1}`, `${slider2}`, `${slider3}`];

  const showDivs = (n) => {
    let newIndex = n;
    if (n > slides.length) newIndex = 1;
    if (n < 1) newIndex = slides.length;
    setSlideIndex(newIndex);
  };

  return (
    <div className="slider">
      <div className="container">
        <div className="contain">
          <div className="background">
            <div className="slider_textContent">
              <img
                data-aos="zoom-in"
                className="header_logo_img"
                src={logo}
                alt="#"
              />
              <h3 data-aos="fade-right" className="slider_logoText">
                Выкупим ваше авто на выгодных условиях
              </h3>
              <ul data-aos="fade-right" className="slider_ul">
                <li data-aos="fade-right" className="slider_li">
                  Оценим ваш автомобиль онлайн
                </li>
                <li data-aos="fade-right" className="slider_li">
                  Осмотр автомобиля в удобном месте, в удобное время
                </li>
                <li data-aos="fade-right" className="slider_li">
                  Подходят любые легковые авто
                </li>
              </ul>
              <button data-aos="zoom-in" className="slider_more">
                Подборнее
              </button>
            </div>
          </div>
        </div>
        <div data-aos="zoom-in" className="container">
          {slides.map((slide, index) => (
            <img
              key={index}
              src={slide}
              alt={`Slide ${index + 1}`}
              className={slideIndex === index + 1 ? "visible" : ""}
            />
          ))}
          <div className="controls">
            <div
              className="new-arrow left"
              onClick={() => showDivs(slideIndex - 1)}
            >
              &#10094;
            </div>
            <div className="dots">
              {slides.map((_, index) => (
                <span
                  key={index}
                  className={`dot ${slideIndex === index + 1 ? "active" : ""}`}
                  onClick={() => showDivs(index + 1)}
                ></span>
              ))}
            </div>
            <div
              className="new-arrow right"
              onClick={() => showDivs(slideIndex + 1)}
            >
              &#10095;
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Slider;
