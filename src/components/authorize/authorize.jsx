import { useState } from "react";
import "./authorize.scss";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Authorize = () => {
    const [isRegister, setIsRegister] = useState(false);
    const navigate = useNavigate();
    const [isResetPassword, setIsResetPassword] = useState(false);
    const [isConfirming, setIsConfirming] = useState(false);
    const [isSettingNewPassword, setIsSettingNewPassword] = useState(false);
    const [data, setData] = useState({
        email: "",
        password: "",
        code: "",
        newPassword: "",
        confirmPassword: "",
        token: "",
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleRegister = async () => {
        try {
            const response = await axios.post(
                "https://api.skupkaavto.kg/Auth/sign-up/",
                data
            );

            if (response.status === 200) {
                alert("Код регистрации отправлен на ваш email.");
                setIsRegister(false);
                setIsConfirming(true);
            } else {
                const error = response.data;
                alert(error.message);
            }
        } catch (error) {
            console.error("Ошибка:", error);
        }
    };

    const handleConfirm = async () => {
        try {
            const response = await axios.post(
                "https://api.skupkaavto.kg/Auth/sign-up-confirmation/",
                {
                    email: data.email,
                    code: data.code,
                }
            );

            if (response.status === 200) {
                const result = response.data;
                localStorage.setItem("token", result.token);
                navigate("/form");
            } else {
                const error = response.data;
                alert(error.message);
            }
        } catch (error) {
            console.error("Ошибка:", error);
        }
    };

    const handleSubmit = async () => {
        const newData = {
            email: data.email,
            password: data.password,
        };
        try {
            const response = await axios.post(
                "https://api.skupkaavto.kg/Auth/sign-in/",
                newData
            );
            if (response.status === 200) {
                const result = response.data;
                localStorage.setItem("token", result.token);
                navigate("/form");
            } else {
                console.error("Ошибка авторизации:", response.data);
                alert(
                    response.data.message || "Произошла ошибка при авторизации."
                );
            }
        } catch (error) {
            console.error(
                "Ошибка авторизации:",
                error.response?.data || error.message
            );
            alert("Произошла ошибка при авторизации. Проверьте свои данные.");
        }
    };

    const handleResetPassword = async () => {
        try {
            const response = await axios.post(
                "https://api.skupkaavto.kg/Auth/request-password-reset/",
                { email: data.email }
            );

            if (response.status === 200) {
                alert("Ссылка для сброса пароля отправлена на ваш email.");
                setIsResetPassword(false);
                setIsSettingNewPassword(true);
            } else {
                const error = response.data;
                alert(error.message);
            }
        } catch (error) {
            console.error("Ошибка:", error);
            alert("Произошла ошибка при отправке запроса на сброс пароля.");
        }
    };

    const handleSetNewPassword = async () => {
        if (data.newPassword !== data.confirmPassword) {
            alert("Пароли не совпадают.");
            return;
        }

        try {
            const response = await axios.post(
                "https://api.skupkaavto.kg/Auth/reset-password/",
                {
                    email: data.email,
                    token: data.token,
                    password: data.newPassword,
                }
            );
            if (response.status === 200) {
                alert("Пароль успешно изменён.");
                setIsSettingNewPassword(false);
                navigate("/");
            } else {
                const error = response.data;
                alert(error.message);
            }
        } catch (error) {
            console.error("Ошибка:", error);
            alert("Произошла ошибка при изменении пароля.");
        }
    };

    return (
        <div className="authorize">
            <div className="authorize__form">
                {isRegister ? (
                    <>
                        <h2>Регистрация</h2>
                        <label>
                            Email:
                            <input
                                type="email"
                                name="email"
                                value={data.email}
                                onChange={handleChange}
                            />
                        </label>
                        <label>
                            Password:
                            <input
                                type="password"
                                name="password"
                                value={data.password}
                                onChange={handleChange}
                            />
                        </label>
                        <button onClick={handleRegister}>
                            Зарегистрироваться
                        </button>
                        <p onClick={() => setIsRegister(false)}>
                            Уже есть аккаунт? Войти
                        </p>
                    </>
                ) : isConfirming ? (
                    <>
                        <h2>Подтверждение регистрации</h2>
                        <label>
                            Ваша почта:
                            <input
                                type="email"
                                name="email"
                                value={data.email}
                                onChange={handleChange}
                                disabled 
                            />
                        </label>
                        <label>
                            Код подтверждения:
                            <input
                                type="text"
                                name="code"
                                value={data.code}
                                onChange={handleChange}
                            />
                        </label>
                        <button onClick={handleConfirm}>Подтвердить</button>
                        <p onClick={() => setIsConfirming(false)}>
                            Вернуться к регистрации
                        </p>
                    </>
                ) : isSettingNewPassword ? (
                    <>
                        <h2>Установить новый пароль</h2>
                        <label>
                            Email:
                            <input
                                type="email"
                                name="email"
                                value={data.email}
                                onChange={handleChange}
                                disabled
                            />
                        </label>
                        <label>
                            Новый пароль:
                            <input
                                type="password"
                                name="newPassword"
                                value={data.newPassword}
                                onChange={handleChange}
                            />
                        </label>
                        <label>
                            Подтвердите новый пароль:
                            <input
                                type="password"
                                name="confirmPassword"
                                value={data.confirmPassword}
                                onChange={handleChange}
                            />
                        </label>
                        <label>
                            Токен, отправленный на email:
                            <input
                                type="text"
                                name="token"
                                value={data.token}
                                onChange={handleChange}
                            />
                        </label>
                        <button onClick={handleSetNewPassword}>
                            Подтвердить
                        </button>
                        <p onClick={() => setIsSettingNewPassword(false)}>
                            Вернуться к входу
                        </p>
                    </>
                ) : isResetPassword ? (
                    <>
                        <h2>Восстановление пароля</h2>
                        <label>
                            Email:
                            <input
                                type="email"
                                name="email"
                                value={data.email}
                                onChange={handleChange}
                            />
                        </label>
                        <button onClick={handleResetPassword}>Отправить</button>
                        <p onClick={() => setIsResetPassword(false)}>
                            Вернуться к входу
                        </p>
                    </>
                ) : (
                    <>
                        <h2>Авторизация</h2>
                        <label>
                            Email:
                            <input
                                type="email"
                                name="email"
                                value={data.email}
                                onChange={handleChange}
                            />
                        </label>
                        <label>
                            Password:
                            <input
                                type="password"
                                name="password"
                                value={data.password}
                                onChange={handleChange}
                            />
                        </label>
                        <button onClick={handleSubmit}>Войти</button>
                        <p onClick={() => setIsRegister(true)}>
                            У вас еще нет аккаунта?
                        </p>
                        <p onClick={() => setIsResetPassword(true)}>
                            Забыли пароль?
                        </p>
                    </>
                )}
            </div>
        </div>
    );
};

export default Authorize;
