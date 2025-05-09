import {Car} from "./types.ts";
import axios, {AxiosResponse} from "axios";


type FetchCars = () => Promise<Car[]>;

export const fetchCars: FetchCars = () => (
    axios.get('/api/car')
        .then((r: AxiosResponse<Car[]>) => r.data)
)

type AddCar = (newCar:Car) => Promise<Car>;

export const addCar:AddCar = (newCar:Car) => (
    axios.post('api/car', newCar)
        .then((r:AxiosResponse<Car>) => r.data)
)

type DeleteCar = (id:number) => Promise<void>;

export const deleteCar:DeleteCar = (id:number) => (
    axios.delete(`api/car/${id}`).then((r)=> r.data)
)