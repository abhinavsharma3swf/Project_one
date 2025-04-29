import * as CarService from "../CarService"
import {expect} from "vitest";
import CarList from "../components/CarList.tsx";
import {Car} from "../types.ts";
import {render, screen} from '@testing-library/react';


//Mock the array of mock cars with the vi.mock and fn
// vi.mock("../services/CarService", () => ({
//     getCars: vi.fn(),
// }));

describe('Car List', () => {

    it('should render multiple car cards on the page', async () => {

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

        const mockFetchCars = vi.spyOn(CarService, 'fetchCars')
            .mockResolvedValue(mockCars)
        render(<CarList cars={mockCars}/>)
        expect(screen.getByText('Tesla')).toBeVisible();
    })
});