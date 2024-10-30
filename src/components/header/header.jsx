import React, { useEffect, useState } from "react";
import logo from "../../assets/logo.png";
import { FiPlusCircle } from "react-icons/fi";
import { FaRegHeart } from "react-icons/fa";
import { FaRegUser } from "react-icons/fa6";
import { Link, useNavigate } from "react-router-dom";
import logoAdd from "../../assets/logoAdd.webp";
import "./header.scss";

function Header() {
    const [showSellModal, setShowSellModal] = useState(false);
    const [showRegistrationPrompt, setShowRegistrationPrompt] = useState(false);
    const [isAuthenticated, setIsAuthenticated] = useState(false); // флаг для проверки авторизации
    const navigate = useNavigate();

    const handleOpenSellModal = () => setShowSellModal(true);
    const handleCloseSellModal = () => setShowSellModal(false);

    const handleCreateListingClick = () => {
        if (!isAuthenticated) {
            setShowSellModal(false);
            setShowRegistrationPrompt(true);
        } else {
            navigate("/form");
        }
    };

    const handleCloseRegistrationPrompt = () => {
        setShowRegistrationPrompt(false);
    };

    const handleRegisterClick = () => {
        setShowRegistrationPrompt(false);
        navigate("/authorization");
    };

    useEffect(() => {
        if (showSellModal || showRegistrationPrompt) {
            document.body.style.overflowY = "hidden";
        } else {
            document.body.style.overflowY = "auto";
        }
        return () => {
            document.body.style.overflowY = "auto";
        };
    }, [showSellModal, showRegistrationPrompt]);

    return (
        <>
            <div className="header">
                <div className="container">
                    <div className="header_content">
                        <Link to={"/"}>
                            <div className="header_logo">
                                <img
                                    src={logo}
                                    alt="#"
                                    className="header_logo_img"
                                />
                                <div className="header_logo_textContent"></div>
                            </div>
                        </Link>
                        <div className="header_nav">
                            <div className="header_nav_add">
                                <Link
                                    className="pluss"
                                    to="#"
                                    onClick={handleOpenSellModal}
                                >
                                    <FiPlusCircle className="plus" />
                                    <p className="header_nav_add_text">
                                        Продать авто
                                    </p>
                                </Link>
                            </div>
                            <div className="header_nav_like">
                                <Link to={"/favorite"} className="likes">
                                    <FaRegHeart className="like" />
                                    <p className="header_nav_like_text">
                                        Избранное
                                    </p>
                                </Link>
                            </div>
                            <div className="header_nav_signin">
                                <Link className="signins" to={"/authorization"}>
                                    <FaRegUser className="signin" />
                                    <p className="header_nav_signin_text">
                                        Войти
                                    </p>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {showSellModal && (
                <div className="modal">
                    <div className="modal-content">
                        <span className="close" onClick={handleCloseSellModal}>
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
                                <button
                                    className="btn-create-final"
                                    onClick={handleCreateListingClick}
                                >
                                    Создать объявление
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}

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
                                className="btn-create-final"
                                onClick={handleRegisterClick}
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

export default Header;
