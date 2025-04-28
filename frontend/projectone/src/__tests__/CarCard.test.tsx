import CarCard from "../components/CarCard.tsx";
import {render, screen} from "@testing-library/react";
import {expect} from "vitest";


describe('CardCard', () => {

    it('should display the make, model, year, price and isUsed on the page', () => {

        const mockCar = {
            make: 'Tesla',
            model: 'Model3',
            year: 2024,
            price: 20,
            isUsed: false
        }

        render(<CarCard car={mockCar}/>)
        expect(screen.getByRole('heading',{name: 'Tesla'})).toBeVisible();
        expect(screen.getByText('No')).toBeVisible();


    });

});