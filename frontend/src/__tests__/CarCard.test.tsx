import CarCard from "../components/CarCard.tsx";
import {render, screen} from "@testing-library/react";
import {expect, vi} from "vitest";
import {Car} from "../types.ts";
import {userEvent} from "@testing-library/user-event";


describe('CardCard', () => {
    it('should display the make, model, year, price and isUsed on the page with delete button', () => {
        const mockCar: Car = {
            id: null,
            make: "Tesla",
            model: "Model3",
            year: 2024,
            price: 40000,
            used: true
        }
        render(<CarCard car= {mockCar} onDelete={()=>{}}/>)
        expect(screen.getByText(`Make: ${mockCar.make}`)).toBeVisible();
        expect(screen.getByText(`isUsed: ${mockCar.used ? "Used" : "New"}`)).toBeVisible();
        expect(screen.getByRole('button', { name: /delete/i})).toBeVisible();
    });

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

        render(<CarCard car={mockCar} onDelete={mockDelete}/>)
        const deleteBtn = screen.getByRole('button', { name: /delete/i});

        await userEvent.click(deleteBtn);
        expect(mockDelete).toHaveBeenCalledExactlyOnceWith(1);

    });

});