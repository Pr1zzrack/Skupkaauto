import React, { useEffect, useState } from "react";
import "./card.scss";
import { MdFavoriteBorder, MdFavorite } from "react-icons/md";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { detailData } from "../../store/slices/detail";
import { addFavorite, removeFavorite } from "../../store/slices/like";
import Aos from "aos";
import "aos/dist/aos.css";

function Card({ data }) {
    useEffect(() => {
        Aos.init({
            duration: 650,
            once: true,
        });
    }, []);

    const nav = useNavigate();
    const dispatch = useDispatch();
    const favoriteItems = useSelector((state) => state.like.favorite);
    const [hover, setHover] = useState(false);
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [isTransitioning, setIsTransitioning] = useState(false);
    const [favorite, setFavorite] = useState(
        favoriteItems.some((item) => item.id === data.id)
    );

    useEffect(() => {
        setFavorite(favoriteItems.some((item) => item.id === data.id));
    }, [favoriteItems, data.id]);

    const handlePrevClick = (e) => {
        e.stopPropagation();
        if (!isTransitioning) {
            setIsTransitioning(true);
            setCurrentImageIndex((prevIndex) =>
                prevIndex === 0 ? data?.images.length - 1 : prevIndex - 1
            );
            setTimeout(() => setIsTransitioning(false), 300);
        }
    };

    const handleNextClick = (e) => {
        e.stopPropagation();
        if (!isTransitioning) {
            setIsTransitioning(true);
            setCurrentImageIndex((prevIndex) =>
                prevIndex === data?.images.length - 1 ? 0 : prevIndex + 1
            );
            setTimeout(() => setIsTransitioning(false), 300);
        }
    };

    function cardClick(id) {
        nav(`/detail/${id}`);
        dispatch(detailData(data));
    }

    function likeHandler(e) {
        e.stopPropagation();
        if (favorite) {
            dispatch(removeFavorite(data));
        } else {
            dispatch(addFavorite(data));
        }
        setFavorite(!favorite);
    }

    return (
        <div
            onClick={() => cardClick(data.id)}
            className={`card ${hover ? "hover" : ""}`}
            onMouseEnter={() => setHover(true)}
            onMouseLeave={() => setHover(false)}
        >
            <div data-aos="zoom-in" className="card-image-container">
                {data && data.images && data.images.length > 0 && (
                    <img
                        src={data.images[currentImageIndex].image_url}
                        alt="#"
                        className={`card-image ${
                            isTransitioning ? "transitioning" : ""
                        }`}
                    />
                )}
                <span
                    data-aos="zoom-in-down"
                    data-aos-duration="3000"
                    className="heart-icon"
                    onClick={likeHandler}
                >
                    {favorite ? (
                        <MdFavorite className="favorite" />
                    ) : (
                        <MdFavoriteBorder />
                    )}
                </span>
                <div className="arrows-adaptive">
                    <button
                        className="prev-photo-button"
                        onClick={handlePrevClick}
                    >
                        <FaChevronLeft />
                    </button>
                    <button
                        className="next-photo-button"
                        onClick={handleNextClick}
                    >
                        <FaChevronRight />
                    </button>
                </div>
            </div>
            <Link to={`/detail/${data.id}`} className="card-link">
                <div className="card-content">
                    <h3
                        data-aos="fade-right"
                        className="card-title"
                    >{`${data.marka_name} ${data.car_model}`}</h3>
                    <p data-aos="fade-right" className="card-price">
                        {data.price} сом
                    </p>
                    <p data-aos="fade-right" className="card-installment">
                        от {Math.floor(data.price / 12)} сом/мес
                    </p>
                    <div data-aos="fade-right" className="card-details">
                        <span>{data.mileage} км</span>
                        <span>{data.year_of_manufacture_name} г</span>
                        <span>{data.transmission}</span>
                        <span>{data.checkpoints}</span>
                    </div>
                </div>
            </Link>
        </div>
    );
}

export default Card;
