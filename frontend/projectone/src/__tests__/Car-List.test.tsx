import {render} from "@testing-library/react";
import * as CarService from "../CarService"
import {expect} from "vitest";


//Mock the array of mock cars with the vi.mock and fn
// vi.mock("../services/CarService", () => ({
//     getCars: vi.fn(),
// }));

describe('Car List', () => {

    it('should render multiple car cards on the page', async () => {

        const mockCars = [

            {make: "Tesla",
                model: "Model3",
                year: 2024,
                price: 40000,
                isUsed: true },

            {make: "Kia",
                model: "Stinger",
                year: 2018,
                price: 150000,
                isUsed: true },

            {make: "BMW",
                model: "X3",
                year: 2021,
                price: 50000,
                isUsed: false }
        ]

        const mockFetchCars = vi.spyOn(CarService, 'fetchCars')
            .mockResolvedValue(mockCars)

        render(<CarList/>)
        expect(mockFetchCars).toHaveBeenCalledOnce();
    })
});