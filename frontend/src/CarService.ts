import {Car} from "./types.ts";
import axios, {AxiosResponse} from "axios";

export const MockCar: Car = {
    id: null,
    make: "Tesla",
    model: "Model3",
    year: 2024,
    price: 40000,
    isUsed: true
}

type FetchCars = () => Promise<Car[]>;

export const fetchCars: FetchCars = () => (
    axios.get('/api/cars')
        .then((r: AxiosResponse<Car[]>) => r.data)
)