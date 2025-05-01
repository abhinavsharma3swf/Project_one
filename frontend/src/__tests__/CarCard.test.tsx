import CarCard from "../components/CarCard.tsx";
import {render, screen} from "@testing-library/react";
import {expect} from "vitest";
import {Car} from "../types.ts";


describe('CardCard', () => {
    it('should display the make, model, year, price and isUsed on the page', () => {
        const mockCar: Car = {
            id: null,
            make: "Tesla",
            model: "Model3",
            year: 2024,
            price: 40000,
            isUsed: true
        }
        render(<CarCard car= {mockCar}/>)
        expect(screen.getByText(`Make: ${mockCar.make}`)).toBeVisible();
        expect(screen.getByText(`isUsed: ${mockCar.isUsed ? "Used" : "New"}`)).toBeVisible();
    });

});