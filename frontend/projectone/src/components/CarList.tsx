import {useState} from "react";
import {Car} from "../types.ts";
import carCard from "./CarCard.tsx";
import CarCard from "./CarCard.tsx";

type props = {
    cars: Car[];
}
const CarList = ({cars}:props) => {

    const [localCar, setLocalCar] = useState(cars)

    return (
        <div>
            setLocalCar(cars)
            {cars.map(() => (
                <CarCard
                key={cars.id}
                make={cars.make}
                model:{cars.model}
                year:{cars.year}
                price:{cars.price}
                isUsed:{cars.isUsed}


            )
            })}
        </div>
    );
};

export default CarList;