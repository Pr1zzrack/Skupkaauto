import React, { useRef, useEffect, useState } from "react";
import Card from "../card/card";
import { useDispatch} from "react-redux";
import axios from "axios";
import { addData, filtrPrice } from "../../store/slices/data";
import "./cards.scss";
import { mileageFiltr } from "../../store/slices/filtr";
function Cards() {

  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showArrows, setShowArrows] = useState(window.innerWidth > 900);
  const dispatch = useDispatch();
  const containerRef = useRef(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(false);
      try {
        const res = await axios.get("https://api.skupkaavto.kg/AutoSell/cars/");
        
        if (res.data && res.data.length > 0) {
          setCars(res.data);
          res.data.forEach((el) => dispatch(addData(el)));
          res.data
            .filter((el) => el.price < 2000000)
            .forEach((el) => {
              dispatch(filtrPrice(el));
            });
          res.data
            .filter((el) => el.mileage === 0)
            .forEach((el) => {
              dispatch(mileageFiltr(el));
            });
        }
      } catch (error) {
        console.error("Error fetching cars data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [dispatch]);

  useEffect(() => {
    const handleResize = () => {
      setShowArrows(window.innerWidth > 900);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const scrollLeft = () => {
    containerRef.current.scrollBy({ left: -310, behavior: "smooth" });
  };

  const scrollRight = () => {
    containerRef.current.scrollBy({ left: 310, behavior: "smooth" });
  };

  if (loading) {
    return (
      <div className="loaderToFullScreen">
        <div className="loaderHelp">
          <div className="loader"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="cards">
      <div className="container">
        <h2 className="recomendText">Рекомендуем вам</h2>
        {showArrows && (
          <button className="arrow arrow-left" onClick={scrollLeft}>
            {"<"}
          </button>
        )}
        <div className="cards-container" ref={containerRef}>
          {cars.map((card, index) => (
            <Card key={card.id} data={card} />
          ))}
        </div>
        {showArrows && (
          <button className="arrow arrow-right" onClick={scrollRight}>
            {">"}
          </button>
        )}
      </div>
    </div>
  );
}

export default Cards;
