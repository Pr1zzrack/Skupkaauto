import React, { useEffect } from "react";
import Swiper from "swiper/bundle";
import "swiper/css/bundle";
import "./banner.scss";
import banner1 from "../../assets/banner.webp";
import banner2 from "../../assets/banner2.webp";
import banner3 from "../../assets/banner3.webp";
import banner4 from "../../assets/banner4.webp";
import banner5 from "../../assets/banner5.webp";
import banner6 from "../../assets/banner6.webp";
import banner7 from "../../assets/banner7.webp";
import banner8 from "../../assets/banner8.webp";
import banner9 from "../../assets/banner9.webp";
import banner10 from "../../assets/banner10.webp";
import banner11 from "../../assets/banner11.webp";
import banner12 from "../../assets/banner12.webp";
import banner13 from "../../assets/banner13.webp";
import banner14 from "../../assets/banner14.webp";

function Banner() {
  useEffect(() => {
    new Swiper(".swiper", {
      effect: "coverflow",
      grabCursor: true,
      centeredSlides: true,
      slidesPerView: "auto",
      coverflowEffect: {
        rotate: 50,
        stretch: 0,
        depth: 100,
        modifier: 1,
        slideShadows: true,
      },
      pagination: {
        el: ".swiper-pagination",
        clickable: true,
      },
    });
  }, []);

  const banners = [
    banner1,
    banner2,
    banner3,
    banner4,
    banner5,
    banner6,
    banner7,
    banner8,
    banner9,
    banner10,
    banner11,
    banner12,
    banner13,
    banner14,
  ];
  const text = [
    "Самые нужные сервисы",
    "Комплексная проверка авто",
    "Платный подбор авто",
    "Что докупить в новое авто?",
    "Выбор авто в 21 веке",
    "Что такое Сберавто?",
    "Ваш личный помощник",
    "Сертификаты Минцифры",
    "Купим ваше авто",
    "Помощь в выборе авто",
    "Пройдите ТО",
    "Сэкономь на ОСАГО",
    "Помощь на дороге",
    "Продажа авто от частников",
  ];

  return (
    <div className="swiper">
      <div className="swiper-wrapper">
        {banners.map((bannerImg, index) => (
          <div
            key={index}
            className="swiper-slide"
            style={{ backgroundImage: `url(${bannerImg})` }}
          >
            <p className="texts">{text[index]}</p>
          </div>
        ))}
      </div>
      <div className="swiper-pagination"></div>
    </div>
  );
}

export default Banner;
