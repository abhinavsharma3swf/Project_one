import {expect, vi} from "vitest";
import CarList from "../components/CarList.tsx";
import {Car} from "../types.ts";
import {render, screen} from '@testing-library/react';
import {userEvent} from "@testing-library/user-event";


//Mock the array of mock cars with the vi.mock and fn
// vi.mock("../services/CarService", () => ({
//     getCars: vi.fn(),
// }));

describe('Car List', () => {


    it('should trigger delete event with car id', async () => {
        const mockCar: Car = {
            id: 1,
            make: "Tesla",
            model: "Model3",
            year: 2024,
            price: 40000,
            used: true
        }

        const mockDelete = vi.fn()

        render(<CarList cars={[mockCar]} onDelete={mockDelete}/>)
        const deleteBtn = screen.getByRole('button', { name: /delete/i});

        await userEvent.click(deleteBtn);
        expect(mockDelete).toHaveBeenCalledExactlyOnceWith(1);
    });

    it('should render multiple car cards on the page', async () => {

        const mockCars: Car[] = [

            {id: 1,
                make: "Tesla",
                model: "Model3",
                year: 2024,
                price: 40000,
                used: true },

            {id: 2,
                make: "Kia",
                model: "Stinger",
                year: 2018,
                price: 150000,
                used: true },

            {id: 3,
                make: "BMW",
                model: "X3",
                year: 2021,
                price: 50000,
                used: false }
        ]

        // const mockFetchCars = vi.spyOn(CarService, 'fetchCars')
        //     .mockResolvedValue(mockCars)
        render(<CarList cars={mockCars}/>)
        expect(screen.getByText(/Tesla*/i)).toBeVisible();
    })
});