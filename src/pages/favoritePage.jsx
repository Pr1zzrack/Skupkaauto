import React from "react";
import Header from "../components/header/header";
import Footer from "../components/footer/footer";
import { useSelector } from "react-redux";
import Card from "../components/card/card";
import "../pages/favoritePage.scss"

function FavoritePage() {
    const cars = useSelector((state) => state.like.favorite);

    return (
        <>
            <Header />
            <div className="container">
                <div className="cards-container-for-favorite">
                    {cars.length > 0 ? (
                        cars.map((card, index) => (
                            <Card key={index} data={card} />
                        ))
                    ) : (
                        <p className="no-favorites-message">Нет избранных</p>
                    )}
                </div>
            </div>
            <Footer />
        </>
    );
}

export default FavoritePage;
