import CarCard from "../components/CarCard.tsx";
import {render, screen} from "@testing-library/react";
import {expect} from "vitest";
import {MockCar} from "../CarService.ts";

describe('CardCard', () => {

    it('should display the make, model, year, price and isUsed on the page', () => {

        render(<CarCard car= {MockCar}/>)
        expect(screen.getByText(`Make: ${MockCar.make}`)).toBeVisible();
        expect(screen.getByText(`isUsed: ${MockCar.isUsed ? "Used" : "New"}`)).toBeVisible();
    });

});