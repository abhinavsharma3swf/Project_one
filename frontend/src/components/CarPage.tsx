import CarList from "./CarList.tsx";
import {Car} from "../types.ts";
import {useEffect, useState} from "react";
import CarIntake from "./CarIntake.tsx";
import {addCar, deleteCar, fetchCars} from "../CarService.ts";

const CarPage = () => {

    const [carList, setCarList] = useState<Car[]>([]);

    useEffect(() => {
        fetchCars().then(setCarList)
    }, []);

    const handleAddCar = (newCar: Car) => {
        addCar(newCar).then((r) => {
            setCarList(prevState => (
                [...prevState, r]
            ))
        });

        // setCarList(prevState => (
        //     [...prevState, ]
        // ))
    }

    const handleDelete = (id: number | null) => {
        id ? deleteCar(id).then(() => {
            fetchCars().then((r) => {
                setCarList(r)
            })
        }) : -1;

    };
    return (
        <div>

            <h1>Car Dealership</h1>
            <CarIntake onAddCar={handleAddCar}/>
            <CarList cars={carList} onDelete={handleDelete}></CarList>
        </div>
    );
};

export default CarPage;