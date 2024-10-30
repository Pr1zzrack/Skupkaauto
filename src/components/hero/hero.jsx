import React, { useState } from "react";
import axios from "axios";
import "./hero.scss";

function Hero() {
    const [address, setAddress] = useState("");
    const [data, setData] = useState({
        username: "",
        phone_number: "+996",
        locate: "",
    });
    const [showModal, setShowModal] = useState(false);
    const [loading, setLoading] = useState(false);
    const [geoError, setGeoError] = useState("");
    const [confirmAddress, setConfirmAddress] = useState(false);
    const [addressError, setAddressError] = useState(false);
    const [manualAddress, setManualAddress] = useState(false);
    const [isSubmitted, setIsSubmitted] = useState(false); 

    function send() {
        axios
            .post("https://api.skupkaavto.kg/AutoSell/fast-sell/", data)
            .then((res) => {
                console.log(res);
                setIsSubmitted(true);
                setData({
                    username: "",
                    phone_number: "",
                    locate: "",
                });
                setAddress("");
                setConfirmAddress(false); 
                setManualAddress(false); 
                setShowModal(false); 

                setTimeout(() => {
                    setIsSubmitted(false);
                }, 2000);
            })
            .catch((error) => {
                if (error.response) {
                    console.log("Ошибка сервера:", error.response.data);
                } else if (error.request) {
                    console.log("Сетевая ошибка:", error.request);
                } else {
                    console.log("Ошибка:", error.message);
                }
            });
    }

    function autoLocation() {
        if ("geolocation" in navigator) {
            setLoading(true);
            setAddress(""); 
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    const latitude = position.coords.latitude;
                    const longitude = position.coords.longitude;
                    fetchAddress(latitude, longitude);
                },
                (error) => {
                    setLoading(false);
                    setGeoError(
                        "Геолокация отключена или доступ запрещен. Пожалуйста, включите её в настройках вашего браузера или устройства."
                    );
                    setShowModal(true);
                }
            );
        } else {
            setGeoError("Геолокация недоступна в этом браузере.");
            setShowModal(true);
        }
    }

    const fetchAddress = async (latitude, longitude) => {
        const url = `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`;

        try {
            const response = await fetch(url);
            const data = await response.json();
            if (data && data.display_name) {
                setAddress(data.display_name);
                setData((prevData) => ({
                    ...prevData,
                    locate: data.display_name,
                }));
                setConfirmAddress(true);
            } else {
                setGeoError("Адрес не найден.");
                setShowModal(true);
            }
        } catch (error) {
            setGeoError("Ошибка при получении адреса: " + error.message);
            setShowModal(true);
        } finally {
            setLoading(false);
        }
    };

    const handleConfirmAddress = () => {
        if (!address) {
            setAddressError(true);
            setGeoError(
                "Адрес не найден. Пожалуйста, включите геолокацию или введите адрес вручную."
            );
            setShowModal(true);
        } else {
            setConfirmAddress(false);
            setAddressError(false);
        }
    };

    const handleAddressError = () => {
        setManualAddress(true); 
        setGeoError(
            "Адрес неправильный? Если адрес введен неверно, проверьте и введите правильный адрес вручную."
        );
        setShowModal(true);
    };

    return (
        <div className="hero">
            <div className="container">
                <div className="hero_content">
                    <div className="hero_textContent">
                        <h1 className="hero_title">
                            ВЫКУПИМ ВАШ АВТОМОБИЛЬ В ЛЮБОМ СОСТОЯНИИ В БИШКЕКЕ
                        </h1>
                        <p className="hero_pretitle">
                            Нам уже доверились более 500 человек. Приедем,
                            осмотрим и купим ваше авто из любой точки
                            Кыргызстана!
                        </p>
                        <a href="tel:0500805015" className="hero_callBtn">
                            ЗВОНИТЕ: (0500) 80-50-15
                        </a>
                    </div>
                    <div className="hero_form">
                        <p className="hero_form_text">Оцените автомобиль:</p>
                        <form className="form" action="#">
                            <input
                                placeholder="Ваше имя"
                                type="text"
                                className="name"
                                value={data.username}
                                onChange={(e) =>
                                    setData((prevData) => ({
                                        ...prevData,
                                        username: e.target.value,
                                    }))
                                }
                            />
                            <input
                                placeholder="Ваш номер телефона"
                                type="text"
                                className="number"
                                value={data.phone_number}
                                onChange={(e) =>
                                    setData((prevData) => ({
                                        ...prevData,
                                        phone_number: e.target.value,
                                    }))
                                }
                            />
                            {manualAddress ? (
                                <input
                                    placeholder="Введите ваш адрес вручную"
                                    value={address}
                                    type="text"
                                    className={`location ${
                                        addressError ? "error" : ""
                                    }`}
                                    onChange={(e) => {
                                        setAddress(e.target.value);
                                        setData((prevData) => ({
                                            ...prevData,
                                            locate: e.target.value,
                                        }));
                                    }}
                                />
                            ) : (
                                <input
                                    placeholder={
                                        loading
                                            ? "Загрузка..."
                                            : "Нажмите для заполнения"
                                    }
                                    value={address}
                                    type="text"
                                    className={`location ${
                                        addressError ? "error" : ""
                                    }`}
                                    onClick={autoLocation}
                                    readOnly
                                />
                            )}
                            {confirmAddress && (
                                <div>
                                    <button
                                        type="button"
                                        className="confirm-address"
                                        onClick={handleConfirmAddress}
                                    >
                                        Подтвердить адрес
                                    </button>
                                    <button
                                        type="button"
                                        className="address-error"
                                        onClick={handleAddressError}
                                    >
                                        Неправильно?
                                    </button>
                                </div>
                            )}
                            <button
                                type="button"
                                className="send"
                                onClick={send}
                                disabled={
                                    !data.username ||
                                    !data.phone_number ||
                                    !address
                                }
                            >
                                {isSubmitted ? "ОТПРАВЛЕНО" : "ОТПРАВИТЬ"}
                            </button>
                        </form>
                        <p className="info-adress">
                            {address
                                ? "Ваш адрес заполнен!"
                                : "Адрес не указан!"}
                        </p>
                    </div>
                </div>
            </div>
            {showModal && (
                <div className="modal-overlay">
                    <div className="modal-content">
                        <button
                            className="close"
                            onClick={() => setShowModal(false)}
                        >
                            &times;
                        </button>
                        <p>{geoError}</p>
                    </div>
                </div>
            )}
        </div>
    );
}

export default Hero;
