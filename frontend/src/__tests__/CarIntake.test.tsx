import CarIntake from "../components/CarIntake.tsx";
import {expect} from "vitest";
import {render, screen} from "@testing-library/react";
import {Car} from "../types.ts";
import {userEvent} from "@testing-library/user-event";


describe('Car Intake Form', () => {

    const testCar: Car = {id: null, make: "Honda", model: "Civic", price: 2000, year: 2024, isUsed: true }

    it('should display the car intake form with 5 input fields', () => {

        render(<CarIntake onAddCar={()=>{}}/>)
        const submitButton = screen.getByRole('button', {name: "Submit"})
        expect(screen.getByPlaceholderText('Make')).toBeVisible();
        expect(screen.getByPlaceholderText('Model')).toBeVisible();
        expect(screen.getByPlaceholderText('Year')).toBeVisible();
        expect(screen.getByPlaceholderText('Price')).toBeVisible();
        expect(screen.getAllByLabelText('condition')[0]).toBeVisible();
        expect(screen.getAllByLabelText('condition')[1]).toBeVisible();
        expect(submitButton).toBeVisible();

    });

    it('should submit the intake form when submit button is pressed', async () => {
        const mockClick = vi.fn();
        render(<CarIntake onAddCar={mockClick}/>)
        const submitButton = screen.getByRole('button', {name: "Submit"})
        const make = screen.getByPlaceholderText('Make');
        const model = screen.getByPlaceholderText('Model');
        const year = screen.getByPlaceholderText('Year');
        const price = screen.getByPlaceholderText('Price');
        const radio1 = screen.getAllByLabelText('condition')[0];
        const radio2 = screen.getAllByLabelText('condition')[1];
        await userEvent.type(make, testCar.make);
        await userEvent.type(model, testCar.model);
        await userEvent.type(year, testCar.year.toString());
        await userEvent.type(price, testCar.price.toString());
        testCar.isUsed ? await userEvent.click(radio2) : await userEvent.click(radio1);

        await userEvent.click(submitButton);
        expect(mockClick).toHaveBeenCalledExactlyOnceWith(testCar);
    });

    it('should not submit if the make is empty', async() => {
        const mockClick = vi.fn();
        render(<CarIntake onAddCar={mockClick}/>)
        const submitButton = screen.getByRole('button', {name: 'Submit'});
        const make = screen.getByPlaceholderText('Make');
        expect(make).toHaveValue("");
        await userEvent.click(submitButton);
        expect(mockClick).not.toHaveBeenCalled();
    });
});