import {useEffect, useState} from "react";
import {Car} from "../types.ts";
import CarCard from "./CarCard.tsx";

type props = {
    cars: Car[],
    onDelete:(id:number | null)=>void
}
const CarList = ({cars, onDelete}:props) => {

    // @ts-ignore
    const [localCar, setLocalCar] = useState(cars)

    useEffect(() => {
        setLocalCar(cars);
    }, [cars]);


    const handleDelete = (id:number | null) => {
            onDelete(id);
    };

    return (
        <div>

            {cars.map((element, index) => (
                <CarCard
                key={index}
                car={element}
                onDelete={handleDelete}
                />
            ))}
        </div>
    );
};

export default CarList;