import CarIntake from "../components/CarIntake.tsx";
import {expect} from "vitest";
import {render, screen} from "@testing-library/react";
import * as CarService from "../CarService.ts";
import CarPage from "../components/CarPage.tsx";
import {userEvent} from "@testing-library/user-event/index";

describe('Car Intake Form', () => {

    it('should display the car intake form with 5 input fields', () => {

        render(<CarIntake/>)
        expect(screen.getByPlaceholderText('Make')).toBeVisible();
        expect(screen.getByPlaceholderText('Price')).toBeVisible();
        expect(screen.getAllByLabelText('condition')[0]).toBeVisible();
    });

    it('should add a new car when form is submitted', async () => {
        const car = { id: 5, make: 'Tess', model: '43', year: 2022, price: 2000, isUsed: true};
        vi.spyOn(CarService, 'fetchCars').mockResolvedValue([car]);

        render(<CarPage/>)

        const make = screen.getByPlaceholderText('Make');
        const model = screen.getByPlaceholderText('Model');
        const year = screen.getByPlaceholderText('Year');
        const price = screen.getByPlaceholderText('Price');
        const isUsed = screen.getAllByRole('radio')[0];
        const submit = screen.getByRole('button', { name: /add car/i });


        await userEvent.type(make,'Audi');
        await userEvent.type(model,'A3');
        await userEvent.type(year, '2024');
        await userEvent.type(price, '20000');
        await userEvent.click(isUsed);
        await userEvent.click(submit);

        screen.logTestingPlaygroundURL();
        expect (await screen.findByText('Audi')).toBeVisible();
        expect (await screen.findByText('new')).toBeVisible();
    });

});