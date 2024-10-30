import React, { useEffect, useRef, useState } from "react";
import Card from "../card/card";
import { useSelector } from "react-redux";

function WithPrice() {
  const price = useSelector((state) => state.filtr.priceFiltr);
  console.log(price);
  
  const [showArrows, setShowArrows] = useState(window.innerWidth > 900);
  const containerRef = useRef(null);

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

  return (
    <div className="container">
      <h4 className="recomendText">Автомобили до 2 млн сом</h4>
      {showArrows && (
        <button className="arrow arrow-left" onClick={scrollLeft}>
          {"<"}
        </button>
      )}
      <div className="cards-container" ref={containerRef}>
        {price.map((card, index) => (
          <Card key={index} data={card} />
        ))}
      </div>
      {showArrows && (
        <button className="arrow arrow-right" onClick={scrollRight}>
          {">"}
        </button>
      )}
    </div>
  );
}

export default WithPrice;
