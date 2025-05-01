import {render, screen, waitFor} from "@testing-library/react";
import CarPage from "../components/CarPage.tsx";
import {expect, vi} from "vitest";
import {userEvent} from "@testing-library/user-event";
import * as CarService from '../CarService.ts'

describe('Car Page', () => {

    beforeEach(() => {
        vi.resetAllMocks();
    });

    it('should display the car page in the browser with a title', () => {

        render(<CarPage/>)
        expect(screen.getByRole("heading", {name: "Car Dealership"})).toBeVisible();
    });

    it('should display all of the components on the car page', () => {

        render(<CarPage/>)
        expect(screen.getAllByText(/Make*/i)[0]).toBeVisible();
        expect(screen.getByRole('form')).toBeVisible();
    });



    it('should add a new car when form is submitted', async () => {
       const car = { id: 5, make: 'Tess', model: '43', year: 2022, price: 2000, isUsed: true};
        // vi.spyOn(CarService, 'fetchCars').mockResolvedValue([]);

        render(<CarPage/>)

        const make = screen.getByPlaceholderText('Make');
        const model = screen.getByPlaceholderText('Model');
        const year = screen.getByPlaceholderText('Year');
        const price = screen.getByPlaceholderText('Price');
        const isUsed = car.isUsed ? screen.getAllByRole('radio')[1] : screen.getAllByRole('radio')[0];
        const submit = screen.getByRole('button', { name: /submit/i });


        await userEvent.type(make,car.make);
        await userEvent.type(model,car.model);
        await userEvent.type(year, car.year.toString());
        await userEvent.type(price, car.price.toString());
        await userEvent.click(isUsed);
        await userEvent.click(submit);

        screen.logTestingPlaygroundURL();
        expect (await screen.findByText('Make: ' + car.make)).toBeVisible();
        expect (await screen.findByText("Model: " + car.model)).toBeVisible();
    });

    it('should display list of fetch cars', async () => {
        const car = { id: 5, make: 'Kia', model: 'Forte', year: 2020, price: 5000, isUsed: false};
        const car2 = { id: 5, make: 'Tesla', model: '43', year: 2022, price: 2000, isUsed: true};
        const mockFetch = vi.spyOn(CarService, 'fetchCars').mockResolvedValue([car, car2]);

        await waitFor(() => render(<CarPage/>))

        expect(screen.getByRole('heading', { name: "Make: " + car.make})).toBeVisible();
        expect(screen.getByRole('heading', { name: "Make: " + car2.make})).toBeVisible();
        expect(mockFetch).toHaveBeenCalledOnce()
    });
});