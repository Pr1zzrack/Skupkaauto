import Card from "../card/card";
import { useSelector } from "react-redux";

function NewCars() {
  const mileage = useSelector((state) => state.filtr.carMileageFiltr);
  return (
    <div className="container">
      <h4 className="recomendText">Новые, крутые автомобили</h4>
      <div className="cards-container">
        {mileage.map((el) => (
          <Card key={el.id} data={el} />
        ))}
      </div>
    </div>
  );
}

export default NewCars;
