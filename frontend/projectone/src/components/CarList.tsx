import {useEffect, useState} from "react";
import {Car} from "../types.ts";
import CarCard from "./CarCard.tsx";

type props = {
    cars: Car[];
}
const CarList = ({cars}:props) => {

    const [localCar, setLocalCar] = useState(cars)

    useEffect(() => {
        setLocalCar(cars)
    }, []);
    return (
        <div>

            {localCar.map((element, index) => (
                <CarCard
                key={index}
                car={element}
                />
            ))}
        </div>
    );
};

export default CarList;