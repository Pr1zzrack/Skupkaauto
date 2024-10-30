import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./form.scss";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Form() {
    const [errors, setErrors] = useState({});
    const [images, setImages] = useState([]);
    const [statusMessage] = useState("");
    const [car, carSet] = useState({
        marka: [],
        body: [],
        color: [],
        checkpoint: [],
        driveUnit: [],
        steer: [],
        introduceYear: [],
    });
    const [formData, setFormData] = useState({
        marka: 0,
        car_model: "",
        price: 0,
        year_of_manufacture: "",
        mileage: 0,
        body: 0,
        body_color: 0,
        engine: "",
        power: "",
        name: "",
        phone_number: "",
        checkpoint: 0,
        drive_unit: 0,
        owners: 0,
        steering_wheel: 0,
        image_uploads: [],
    });
    const navigate = useNavigate();
    const token = localStorage.getItem("token");

    useEffect(() => {
        axios
            .get("https://api.skupkaavto.kg/AutoSell/car-data/")
            .then((res) => {
                carSet({
                    marka: res.data.marka,
                    body: res.data.body,
                    color: res.data.body_color,
                    checkpoint: res.data.checkpoint,
                    driveUnit: res.data.drive_unit,
                    steer: res.data.steering_wheel,
                    introduceYear: res.data.year_of_manufacture,
                });
            });
    }, []);

    const validateForm = () => {
        const newErrors = {};
        if (!formData.name) newErrors.name = "Это поле обязательно";
        if (!formData.phone_number)
            newErrors.phone_number = "Это поле обязательно";
        if (!formData.marka) newErrors.marka = "Это поле обязательно";
        if (!formData.car_model) newErrors.car_model = "Это поле обязательно";
        if (!formData.body) newErrors.body = "Это поле обязательно";
        if (!formData.body_color) newErrors.body_color = "Это поле обязательно";
        if (!formData.engine) newErrors.engine = "Это поле обязательно";
        if (!formData.power) newErrors.power = "Это поле обязательно";
        if (!formData.price) newErrors.price = "Это поле обязательно";
        if (!formData.year_of_manufacture)
            newErrors.year_of_manufacture = "Это поле обязательно";
        if (!formData.mileage) newErrors.mileage = "Это поле обязательно";
        if (!formData.checkpoint) newErrors.checkpoint = "Это поле обязательно";
        if (!formData.drive_unit) newErrors.drive_unit = "Это поле обязательно";
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleFileChange = (event) => {
        const files = Array.from(event.target.files);
        setImages((prevImages) => [
            ...prevImages,
            ...files.map((file) => URL.createObjectURL(file)),
        ]);
        setFormData((prevFormData) => ({
            ...prevFormData,
            image_uploads: [...prevFormData.image_uploads, ...files],
        }));
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
        setErrors({
            ...errors,
            [name]: "",
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validateForm()) return;

        const formDataToSend = new FormData();
        for (const key in formData) {
            if (Array.isArray(formData[key])) {
                formData[key].forEach((item, index) => {
                    formDataToSend.append(`${key}[${index}]`, item);
                });
            } else {
                formDataToSend.append(key, formData[key]);
            }
        }
        try {
            axios
                .post(
                    "https://api.skupkaavto.kg/AutoSell/cars/",
                    formDataToSend,
                    {
                        headers: {
                            Authorization: `Token ${token}`,
                            "Content-Type": "multipart/form-data",
                        },
                    }
                )
                .then((res) => 
                    
                    console.log(res));
            navigate("/");
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div className="form">
            <Link to="/">
                <button className="btn-back">{"< "}Назад</button>
            </Link>
            <h2>Введите данные об авто</h2>
            <form>
                <div className="form-group">
                    <label htmlFor="name">Имя</label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        placeholder="Введите имя"
                        value={formData.name}
                        onChange={handleChange}
                    />
                    {errors.name && (
                        <span className="error">{errors.name}</span>
                    )}
                </div>
                <div className="form-group">
                    <label htmlFor="phone_number">Телефон номер</label>
                    <input
                        type="text"
                        id="phone_number"
                        name="phone_number"
                        placeholder="Введите номер"
                        value={formData.phone_number}
                        onChange={handleChange}
                    />
                    {errors.phone_number && (
                        <span className="error">{errors.phone_number}</span>
                    )}
                </div>
                <div className="form-group">
                    <label htmlFor="marka">Марка авто</label>
                    <select
                        id="marka"
                        name="marka"
                        value={formData.marka}
                        onChange={handleChange}
                    >
                        <option value="">Выберите марку</option>
                        {car.marka.map((el) => (
                            <option key={el.id} value={el.id}>
                                {el.marka}
                            </option>
                        ))}
                    </select>
                    {errors.marka && (
                        <span className="error">{errors.marka}</span>
                    )}
                </div>
                <div className="form-group">
                    <label htmlFor="car_model">Модель</label>
                    <input
                        type="text"
                        id="car_model"
                        name="car_model"
                        placeholder="Введите модель"
                        value={formData.car_model}
                        onChange={handleChange}
                    />
                    {errors.car_model && (
                        <span className="error">{errors.car_model}</span>
                    )}
                </div>
                <div className="form-group">
                    <label htmlFor="body">Кузов</label>
                    <select
                        id="body"
                        name="body"
                        value={formData.body}
                        onChange={handleChange}
                    >
                        <option value="">Выберите кузов</option>
                        {car.body.map((el) => (
                            <option key={el.id} value={el.id}>
                                {el.body}
                            </option>
                        ))}
                    </select>
                    {errors.body && (
                        <span className="error">{errors.body}</span>
                    )}
                </div>
                <div className="form-group">
                    <label htmlFor="body_color">Цвет</label>
                    <select
                        id="body_color"
                        name="body_color"
                        value={formData.body_color}
                        onChange={handleChange}
                    >
                        <option value="">Выберите цвет</option>
                        {car.color.map((el) => (
                            <option key={el.id} value={el.id}>
                                {el.body_color}
                            </option>
                        ))}
                    </select>
                    {errors.body_color && (
                        <span className="error">{errors.body_color}</span>
                    )}
                </div>
                <div className="form-group">
                    <label htmlFor="engine">Двигатель</label>
                    <input
                        type="text"
                        id="engine"
                        name="engine"
                        placeholder="Введите двигатель"
                        value={formData.engine}
                        onChange={handleChange}
                    />
                    {errors.engine && (
                        <span className="error">{errors.engine}</span>
                    )}
                </div>
                <div className="form-group">
                    <label htmlFor="power">Мощность, л.с.</label>
                    <input
                        type="number"
                        id="power"
                        name="power"
                        placeholder="Введите мощность"
                        value={formData.power}
                        onChange={handleChange}
                    />
                    {errors.power && (
                        <span className="error">{errors.power}</span>
                    )}
                </div>
                <div className="form-group">
                    <label htmlFor="price">Цена, $</label>
                    <input
                        type="number"
                        id="price"
                        name="price"
                        placeholder="Введите цену"
                        value={formData.price}
                        onChange={handleChange}
                    />
                    {errors.price && (
                        <span className="error">{errors.price}</span>
                    )}
                </div>
                <div className="form-group">
                    <label htmlFor="year_of_manufacture">Год выпуска</label>
                    <select
                        id="year_of_manufacture"
                        name="year_of_manufacture"
                        value={formData.year_of_manufacture}
                        onChange={handleChange}
                    >
                        <option value="">Выберите год выпуска</option>
                        {car.introduceYear.map((el) => (
                            <option key={el.id} value={el.id}>
                                {el.year_of_manufacture}
                            </option>
                        ))}
                    </select>
                    {errors.year_of_manufacture && (
                        <span className="error">
                            {errors.year_of_manufacture}
                        </span>
                    )}
                </div>
                <div className="form-group">
                    <label htmlFor="mileage">Пробег, км</label>
                    <input
                        type="number"
                        id="mileage"
                        name="mileage"
                        placeholder="Введите пробег"
                        value={formData.mileage}
                        onChange={handleChange}
                    />
                    {errors.mileage && (
                        <span className="error">{errors.mileage}</span>
                    )}
                </div>
                <div className="form-group">
                    <label htmlFor="checkpoint">КПП</label>
                    <select
                        id="checkpoint"
                        name="checkpoint"
                        value={formData.checkpoint}
                        onChange={handleChange}
                    >
                        <option value="">Выберите КПП</option>
                        {car.checkpoint.map((el) => (
                            <option key={el.id} value={el.id}>
                                {el.checkpoint}
                            </option>
                        ))}
                    </select>
                    {errors.checkpoint && (
                        <span className="error">{errors.checkpoint}</span>
                    )}
                </div>
                <div className="form-group">
                    <label htmlFor="drive_unit">Привод</label>
                    <select
                        id="drive_unit"
                        name="drive_unit"
                        value={formData.drive_unit}
                        onChange={handleChange}
                    >
                        <option value="">Выберите привод</option>
                        {car.driveUnit.map((el) => (
                            <option key={el.id} value={el.id}>
                                {el.drive_unit}
                            </option>
                        ))}
                    </select>
                    {errors.drive_unit && (
                        <span className="error">{errors.drive_unit}</span>
                    )}
                </div>
                <div className="form-group">
                    <label htmlFor="owners">Количество владельцев</label>
                    <input
                        type="number"
                        id="owners"
                        name="owners"
                        placeholder="Введите количество владельцев"
                        value={formData.owners}
                        onChange={handleChange}
                    />
                    {errors.owners && (
                        <span className="error">{errors.owners}</span>
                    )}
                </div>
                <div className="form-group">
                    <label htmlFor="steering_wheel">Руль</label>
                    <select
                        id="steering_wheel"
                        name="steering_wheel"
                        value={formData.steering_wheel}
                        onChange={handleChange}
                    >
                        <option value="">Выберите сторону</option>
                        {car.steer.map((el) => (
                            <option key={el.id} value={el.id}>
                                {el.steering_wheel}
                            </option>
                        ))}
                    </select>
                    {errors.steering_wheel && (
                        <span className="error">{errors.steering_wheel}</span>
                    )}
                </div>
                <div className="form-group">
                    <label htmlFor="image_uploads">Загрузить изображения</label>
                    <input
                        type="file"
                        id="image_uploads"
                        name="image_uploads"
                        accept="image/*"
                        onChange={handleFileChange}
                        multiple
                    />
                    {errors.image_uploads && (
                        <span className="error">{errors.image_uploads}</span>
                    )}
                </div>
                <div className="image-preview">
                    {images.map((image, index) => (
                        <img
                            key={index}
                            src={image}
                            alt={`Preview ${index}`}
                            loading="lazy"
                        />
                    ))}
                </div>
                <button
                    type="submit"
                    className="btn-submit"
                    onClick={handleSubmit}
                >
                    Подтвердить
                </button>
            </form>
            {statusMessage && <p className="status-message">{statusMessage}</p>}
        </div>
    );
}

export default Form;
