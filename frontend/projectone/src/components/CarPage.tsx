import CarList from "./CarList.tsx";
import {Car} from "../types.ts";
import CarIntake from "./CarIntake.tsx";
import {useEffect, useState} from "react";

const mockCars: Car[] = [

    {id: 1,
        make: "Tesla",
        model: "Model3",
        year: 2024,
        price: 40000,
        isUsed: true },

    {id: 2,
        make: "Kia",
        model: "Stinger",
        year: 2018,
        price: 150000,
        isUsed: true },

    {id: 3,
        make: "BMW",
        model: "X3",
        year: 2021,
        price: 50000,
        isUsed: false }
]


const CarPage = () => {

    const [carList, setCarList] = useState<Car[]>([]);

    useEffect(() => {
        // fetchCars().then(setCarList)
        setCarList(mockCars)
        console.log(mockCars)

    }, []);

    const handleAddCar = (newCar: Car) => {
        setCarList( prevState => [...prevState, newCar])
        console.log(carList)
        console.log(newCar)
    }

    console.log(carList)


    return (
        <div>

            <h1>Car Dealership</h1>
            <CarList cars={carList}></CarList>
            <button>
                Fetch Cars
            </button>
            <button>
                Add Car
            </button>


        </div>
    );
};

export default CarPage;