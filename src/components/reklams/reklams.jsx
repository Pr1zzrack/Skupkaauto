import React, { useEffect, useState } from "react";
import "./reklams.scss";
import { Link, useNavigate } from "react-router-dom";
import reklam1 from "../../assets/reklam1.png";
import reklam2 from "../../assets/reklam2.png";
import reklam3 from "../../assets/reklam3.png";
import reklam4 from "../../assets/reklam4.png";
import reklam5 from "../../assets/reklam5.png";
import reklam6 from "../../assets/reklam6.png";
import { LiaCarSideSolid } from "react-icons/lia";
import { IoCarSportOutline } from "react-icons/io5";
import { RiMapPinLine } from "react-icons/ri";
import { FaRegMoneyBillAlt } from "react-icons/fa";
import { IoDocumentsOutline } from "react-icons/io5";
import { MdOutlineReportProblem } from "react-icons/md";
import logoAdd from "../../assets/logoAdd.webp";
import Aos from "aos";
import "aos/dist/aos.css";

function Reklams() {
    const [showModal, setShowModal] = useState(false);
    const [showRegistrationPrompt, setShowRegistrationPrompt] = useState(false);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const navigate = useNavigate();

    const handleOpenModal = () => {
        if (!isAuthenticated) {
            setShowRegistrationPrompt(true);
        } else {
            setShowModal(true);
        }
    };

    const handleCloseModal = () => setShowModal(false);
    const handleCloseRegistrationPrompt = () =>
        setShowRegistrationPrompt(false);
    const handleRegisterClick = () => {
        setShowRegistrationPrompt(false);
        navigate("/authorization");
    };

    useEffect(() => {
        Aos.init({
            duration: 650,
            once: true,
        });
    }, []);

    useEffect(() => {
        if (showModal || showRegistrationPrompt) {
            document.body.style.overflowY = "hidden";
        } else {
            document.body.style.overflowY = "auto";
        }
        return () => {
            document.body.style.overflowY = "auto";
        };
    }, [showModal, showRegistrationPrompt]);

    return (
        <>
            <div className="container">
                <div className="reklams-container">
                    <h2 data-aos="zoom-in" className="advantages-header">
                        Наши преимущества
                    </h2>
                    <div className="reklams">
                        <div className="reklam-card">
                            <img
                                data-aos="fade-right"
                                src={reklam1}
                                alt="Operatively"
                            />
                            <div
                                data-aos="zoom-out-up"
                                className="text-overlay"
                            >
                                <LiaCarSideSolid size={40} />
                                <h3>Оперативно</h3>
                                <p>
                                    Осмотр авто и выкуп за 30 минут. Без
                                    необходимости ездить куда-либо.
                                </p>
                            </div>
                        </div>
                        <div className="reklam-card">
                            <img
                                data-aos="fade-right"
                                src={reklam2}
                                alt="Profitably"
                            />
                            <div
                                data-aos="zoom-out-up"
                                className="text-overlay"
                            >
                                <IoCarSportOutline size={40} />
                                <h3>Выгодно</h3>
                                <p>
                                    Даём справедливую цену за Ваше авто.
                                    Покупаем выгоднее, чем в trade-in (трейд
                                    ин).
                                </p>
                            </div>
                        </div>
                        <div className="reklam-card">
                            <img
                                data-aos="fade-right"
                                src={reklam3}
                                alt="Any location"
                            />
                            <div
                                data-aos="zoom-out-up"
                                className="text-overlay"
                            >
                                <RiMapPinLine size={40} />
                                <h3>В любую точку</h3>
                                <p>
                                    Выезжаем по всей области для осмотра и
                                    оценки, в любое удобное для Вас время.
                                </p>
                            </div>
                        </div>
                        <div className="reklam-card">
                            <img
                                data-aos="fade-right"
                                src={reklam4}
                                alt="Immediate payment"
                            />
                            <div
                                data-aos="zoom-out-up"
                                className="text-overlay"
                            >
                                <FaRegMoneyBillAlt size={40} />
                                <h3>Деньги сразу</h3>
                                <p>
                                    Полный расчет сразу после заключения сделки
                                    на месте.
                                </p>
                            </div>
                        </div>
                        <div className="reklam-card">
                            <img
                                data-aos="fade-right"
                                src={reklam5}
                                alt="Without preparation"
                            />
                            <div
                                data-aos="zoom-out-up"
                                className="text-overlay"
                            >
                                <IoDocumentsOutline size={40} />
                                <h3>Без подготовки</h3>
                                <p>
                                    Покупаем автомобили в любом юридическом
                                    состоянии.
                                </p>
                            </div>
                        </div>
                        <div className="reklam-card">
                            <img
                                data-aos="fade-right"
                                src={reklam6}
                                alt="Problem cars"
                            />
                            <div
                                data-aos="zoom-out-up"
                                className="text-overlay"
                            >
                                <MdOutlineReportProblem size={40} />
                                <h3>Проблемные авто</h3>
                                <p>
                                    Выкупаем даже авто с техническими проблемами
                                    и не на ходу.
                                </p>
                            </div>
                        </div>
                    </div>
                    <button
                        onClick={handleOpenModal}
                        data-aos="fade-up"
                        className="sell-car-button"
                    >
                        Продать авто
                    </button>
                </div>
            </div>

            {/* Основное модальное окно */}
            {showModal && (
                <div className="modal">
                    <div className="modal-content">
                        <span className="close" onClick={handleCloseModal}>
                            &times;
                        </span>
                        <h2>Как вы хотите продать авто?</h2>
                        <div className="modal-body">
                            <div className="tab-content">
                                <ul className="ul">
                                    <li className="li">
                                        Нет ограничений по возрасту и пробегу
                                        автомобиля
                                    </li>
                                    <li className="li">
                                        Вы сами определяете стоимость вашего
                                        автомобиля
                                    </li>
                                    <li className="li">
                                        Личная коммуникация с покупателями
                                    </li>
                                </ul>
                                <img className="icon" src={logoAdd} alt="#" />
                                <Link to={"/form"}>
                                    <button className="btn-create-final">
                                        Создать объявление
                                    </button>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Модальное окно регистрации */}
            {showRegistrationPrompt && (
                <div className="modal">
                    <div className="modal-content">
                        <span
                            className="close"
                            onClick={handleCloseRegistrationPrompt}
                        >
                            &times;
                        </span>
                        <h2>Пожалуйста, зарегистрируйтесь</h2>
                        <div className="modal-body">
                            <p>
                                Для продолжения, пожалуйста, зарегистрируйтесь
                                или войдите в систему.
                            </p>
                            <button
                                onClick={handleRegisterClick}
                                className="btn-create-final"
                            >
                                Зарегистрироваться
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}

export default Reklams;
