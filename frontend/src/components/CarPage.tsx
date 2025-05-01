import CarList from "./CarList.tsx";
import {Car} from "../types.ts";
import {useEffect, useState} from "react";
import CarIntake from "./CarIntake.tsx";
import {fetchCars} from "../CarService.ts";

const CarPage = () => {

    const [carList, setCarList] = useState<Car[]>([]);

    useEffect(() => {
        fetchCars().then(setCarList)
        // setCarList(mockCars)
        // console.log(mockCars)

    }, []);

    const handleAddCar = (newCar: Car) => {
        setCarList(prevState => (
            [...prevState, newCar]
        ))
    }

    return (
        <div>

            <h1>Car Dealership</h1>
            <CarIntake onAddCar={handleAddCar}/>
            <CarList cars={carList}></CarList>
        </div>
    );
};

export default CarPage;