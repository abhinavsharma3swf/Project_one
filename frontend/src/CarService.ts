import {Car} from "./types.ts";
import axios, {AxiosResponse} from "axios";


type FetchCars = () => Promise<Car[]>;

export const fetchCars: FetchCars = () => (
    axios.get('/api/car')
        .then((r: AxiosResponse<Car[]>) => r.data)
)