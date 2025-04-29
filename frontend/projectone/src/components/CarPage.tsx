import CarList from "./CarList.tsx";
import {Car} from "../types.ts";

const CarPage = () => {

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

    return (
        <div>
            <h1>Car Dealership</h1>
            <CarList cars={mockCars}></CarList>
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