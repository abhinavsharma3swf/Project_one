import {afterEach, beforeAll, expect} from "vitest";
import {setupServer} from "msw/node";
import axios from "axios";
import {http, HttpResponse} from "msw";
import {Car} from "../types.ts";
import {addCar, fetchCars} from "../CarService.ts";

describe('Car Service', () => {

    axios.defaults.baseURL = "http://localhost:3000"

    const server = setupServer()
    beforeAll(() => server.listen({onUnhandledRequest: 'error'}))
    afterAll(() => server.close())
    afterEach(() => server.resetHandlers())

    it('should post a new car', async () => {
        const car1:Car = {
            id: null,
            make: "Tesla",
            model: "Model3",
            year: 2024,
            price: 40000,
            isUsed: true
        }

        const carReciept:Car = {
            id: 1,
            make: "Tesla",
            model: "Model3",
            year: 2024,
            price: 40000,
            isUsed: true
        }

        server.use(http.post('api/car', () =>
            HttpResponse.json(carReciept, {status: 201})
        ))

        expect(await addCar(car1)).toStrictEqual(carReciept);

    });


    it('should fetch list of cars', async () => {
        const expected: Car[] = [
            {
                id: null,
                make: "Tesla",
                model: "Model3",
                year: 2024,
                price: 40000,
                isUsed: true
            },

            {
                id: 1,
                make: "Kia",
                model: "Stinger",
                year: 2018,
                price: 150000,
                isUsed: true
            },

            {
                id: 2,
                make: "BMW",
                model: "X3",
                year: 2021,
                price: 50000,
                isUsed: false
            }
        ];

        server.use(http.get('api/car', () =>
            HttpResponse.json(expected, {status: 200})
        ))
        expect(await fetchCars()).toStrictEqual(expected);

    });

});