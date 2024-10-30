import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./filter.scss";
import axios from "axios";
import Card from "../card/card";
import { useSelector } from "react-redux";

function Filter() {
    const [title, setTitle] = useState("Купить автомобиль");
    const [filData, setFilData] = useState([]);
    const datasData = useSelector((state) => state.data.data);
    const [isResultsFetched, setIsResultsFetched] = useState(false); // Новое состояние

    const initialFilters = {
        marka: "",
        year_lte: "",
        year_gte: "",
        lte_price: "",
        gte_price: "",
        checkpoint: "",
        steering_wheel: "",
        body_color: "",
        body: "",
        drive_unit: "",
        mileage_lte: "",
        mileage_gte: "",
    };

    const [filters, setFilters] = useState(initialFilters);
    const [car, carSet] = useState({
        marka: [],
        body: [],
        color: [],
        checkpoint: [],
        driveUnit: [],
        steer: [],
        introduceYear: [],
    });

    useEffect(() => {
        axios
            .get("https://api.skupkaavto.kg/AutoSell/car-data/")
            .then((res) => {
                carSet({
                    ...car,
                    marka: res.data.marka,
                    body: res.data.body,
                    color: res.data.body_color,
                    checkpoint: res.data.checkpoint,
                    driveUnit: res.data.drive_unit,
                    steer: res.data.steering_wheel,
                    introduceYear: res.data.year_of_manufacture,
                    images: res.data.images,
                });
            });
    }, []);

    function handleFilterChange(key, value) {
        setFilters((prevFilters) => ({
            ...prevFilters,
            [key]: value,
        }));
    }

    const resetFilters = () => {
        setFilters(initialFilters);
        setFilData([]); // Очистить результаты при сбросе фильтров
        setIsResultsFetched(false); // Сбросить состояние загрузки результатов
    };

    function fetchFilteredCars() {
        const queryParams = Object.keys(filters)
            .filter((key) => filters[key] !== "")
            .map((key) => `${key}=${filters[key]}`)
            .join("&");

        if (queryParams) {
            axios
                .get(`https://api.skupkaavto.kg/AutoSell/cars/?${queryParams}`)
                .then((res) => {
                    setFilData(res.data);
                    setIsResultsFetched(true); // Установить состояние после загрузки результатов
                })
                .catch((error) => {
                    console.error("Ошибка при фильтрации:", error);
                    setIsResultsFetched(true); // Установить состояние, чтобы показать сообщение об ошибке
                });
        } else {
            setFilData([]);
            setIsResultsFetched(true); // Установить состояние, если фильтры пусты
        }
    }

    return (
        <>
            <div className="container">
                <div className="cars-container">
                    <div className="breadcrumb">
                        <Link to={"/"}>
                            <span className="cars_link">СберАвто {">"}</span>
                        </Link>
                        <Link to={""}>
                            <span className="cars_link">Продажа авто</span>
                        </Link>
                    </div>
                    <h2 className="title">{title}</h2>
                    <div className="tabs">
                        <button
                            onClick={() => {
                                setTitle("Купить автомобиль");
                                setFilters(initialFilters);
                            }}
                            className="tab active"
                        >
                            Автомобили
                        </button>
                    </div>
                    <div className="filters">
                        <div className="row">
                            <div className="col">
                                <select
                                    placeholder="marka"
                                    name="brand"
                                    value={filters.marka}
                                    onChange={(e) =>
                                        handleFilterChange(
                                            "marka",
                                            e.target.value
                                        )
                                    }
                                >
                                    <option value="">Марка</option>
                                    {car.marka.map((el) => (
                                        <option value={el.marka} key={el.id}>
                                            {el.marka}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <div className="col">
                                <select
                                    name="bodyType"
                                    value={filters.body}
                                    onChange={(e) =>
                                        handleFilterChange(
                                            "body",
                                            e.target.value
                                        )
                                    }
                                >
                                    <option value="">Кузов</option>
                                    {car.body.map((el) => (
                                        <option value={el.body} key={el.id}>
                                            {el.body}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <div className="col">
                                <select
                                    name="checkpoint"
                                    value={filters.checkpoint}
                                    onChange={(e) =>
                                        handleFilterChange(
                                            "checkpoint",
                                            e.target.value
                                        )
                                    }
                                >
                                    <option value="">Коробка</option>
                                    {car.checkpoint.map((el) => (
                                        <option
                                            value={el.checkpoint}
                                            key={el.id}
                                        >
                                            {el.checkpoint}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <div className="col">
                                <select
                                    name="steering"
                                    value={filters.steering_wheel}
                                    onChange={(e) =>
                                        handleFilterChange(
                                            "steering_wheel",
                                            e.target.value
                                        )
                                    }
                                >
                                    <option value="">Руль</option>
                                    {car.steer.map((el) => (
                                        <option
                                            value={el.steering_wheel}
                                            key={el.id}
                                        >
                                            {el.steering_wheel}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <div className="col">
                                <input
                                    type="text"
                                    name="priceFrom"
                                    value={filters.gte_price}
                                    placeholder="Цена, от"
                                    onChange={(e) =>
                                        handleFilterChange(
                                            "gte_price",
                                            e.target.value
                                        )
                                    }
                                />
                            </div>
                            <div className="col">
                                <input
                                    type="text"
                                    name="priceTo"
                                    value={filters.lte_price}
                                    placeholder="Цена, до"
                                    onChange={(e) =>
                                        handleFilterChange(
                                            "lte_price",
                                            e.target.value
                                        )
                                    }
                                />
                            </div>
                            <div className="col">
                                <select
                                    name="yearTo"
                                    value={filters.year_gte}
                                    onChange={(e) =>
                                        handleFilterChange(
                                            "year_gte",
                                            e.target.value
                                        )
                                    }
                                >
                                    <option value="">Год, от</option>
                                    {car.introduceYear.map((el) => (
                                        <option
                                            value={el.year_of_manufacture}
                                            key={el.id}
                                        >
                                            {el.year_of_manufacture}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <div className="col">
                                <select
                                    name="yearFrom"
                                    value={filters.year_lte}
                                    onChange={(e) =>
                                        handleFilterChange(
                                            "year_lte",
                                            e.target.value
                                        )
                                    }
                                >
                                    <option value="">Год, до</option>
                                    {car.introduceYear.map((el) => (
                                        <option
                                            value={el.year_of_manufacture}
                                            key={el.id}
                                        >
                                            {el.year_of_manufacture}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <div className="col">
                                <input
                                    type="text"
                                    name="mileageTo"
                                    value={filters.mileage_gte}
                                    placeholder="Пробег, от"
                                    onChange={(e) =>
                                        handleFilterChange(
                                            "mileage_gte",
                                            e.target.value
                                        )
                                    }
                                />
                            </div>
                            <div className="col">
                                <input
                                    type="text"
                                    name="mileageFrom"
                                    value={filters.mileage_lte}
                                    placeholder="Пробег, до"
                                    onChange={(e) =>
                                        handleFilterChange(
                                            "mileage_lte",
                                            e.target.value
                                        )
                                    }
                                />
                            </div>
                            <div className="col">
                                <select
                                    name="color"
                                    value={filters.body_color}
                                    onChange={(e) =>
                                        handleFilterChange(
                                            "body_color",
                                            e.target.value
                                        )
                                    }
                                >
                                    <option value="">Цвет</option>
                                    {car.color.map((el) => (
                                        <option
                                            value={el.body_color}
                                            key={el.id}
                                        >
                                            {el.body_color}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        </div>
                    </div>
                    <div className="buttons">
                        <button className="reset-button" onClick={resetFilters}>
                            Сбросить
                        </button>
                        <button
                            onClick={fetchFilteredCars}
                            className="results-button"
                        >
                            Показать результат
                        </button>
                    </div>
                    <div className="cards-container">
                        {isResultsFetched && filData.length > 0 // Условие для отображения карточек
                            ? filData.map((card, index) => (
                                  <Card key={index} data={card} />
                              ))
                            : isResultsFetched && (
                                  <p className="no-results">
                                      Результат не найден
                                  </p>
                              )}
                    </div>
                </div>
            </div>
        </>
    );
}

export default Filter;
