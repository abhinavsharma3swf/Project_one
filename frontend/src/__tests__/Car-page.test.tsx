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



    it('should post a new car when form is submitted, and display', async () => {
       const receiptCar1 = { id: 5, make: 'Tess', model: '43', year: 2022, price: 2000, used: true};
       const oldData = { id: null, make: 'Tess', model: '43', year: 2022, price: 2000, used: true};
        const mockFetch = vi.spyOn(CarService, 'fetchCars').mockResolvedValue([]);
        const mockAdd = vi.spyOn(CarService, 'addCar').mockResolvedValue(receiptCar1);

        render(<CarPage/>)

        const make = screen.getByPlaceholderText('Make');
        const model = screen.getByPlaceholderText('Model');
        const year = screen.getByPlaceholderText('Year');
        const price = screen.getByPlaceholderText('Price');
        const isUsed = receiptCar1.used ? screen.getAllByRole('radio')[1] : screen.getAllByRole('radio')[0];
        const submit = screen.getByRole('button', { name: /submit/i });


        await userEvent.type(make,receiptCar1.make);
        await userEvent.type(model,receiptCar1.model);
        await userEvent.type(year, receiptCar1.year.toString());
        await userEvent.type(price, receiptCar1.price.toString());
        await userEvent.click(isUsed);
        await userEvent.click(submit);

        screen.logTestingPlaygroundURL();

        expect(mockAdd).toHaveBeenCalledExactlyOnceWith(oldData);
        expect(mockFetch).toHaveBeenCalledOnce();
        expect (await screen.findByText('Make: ' + receiptCar1.make)).toBeVisible();
        expect (await screen.findByText("Model: " + receiptCar1.model)).toBeVisible();

    });

    it('should display list of fetch cars', async () => {
        const car = { id: 5, make: 'Kia', model: 'Forte', year: 2020, price: 5000, used: false};
        const car2 = { id: 5, make: 'Tesla', model: '43', year: 2022, price: 2000, used: true};
        const mockFetch = vi.spyOn(CarService, 'fetchCars').mockResolvedValue([car, car2]);

        await waitFor(() => render(<CarPage/>))

        expect(screen.getByRole('heading', { name: "Make: " + car.make})).toBeVisible();
        expect(screen.getByRole('heading', { name: "Make: " + car2.make})).toBeVisible();
        expect(mockFetch).toHaveBeenCalledOnce()
    });

    it('should send delete request and remove car', async () => {
        const car = { id: 4, make: 'Kia', model: 'Forte', year: 2020, price: 5000, used: false};
        const car2 = { id: 5, make: 'Tesla', model: '43', year: 2022, price: 2000, used: true};
        const mockFetch = vi.spyOn(CarService, 'fetchCars').mockResolvedValue([car, car2]);
        const mockDelete = vi.spyOn(CarService, 'deleteCar').mockResolvedValue()
        await waitFor(() => render(<CarPage/>));

        expect(mockFetch).toHaveBeenCalledOnce();
        const car1Display = screen.getByRole('heading', { name: "Make: " + car.make})
        expect(screen.getByRole('heading', { name: "Make: " + car2.make})).toBeVisible();

        const deleteBtn = screen.getAllByRole('button', { name: /delete/i})[0]
        const mockFetch2 = vi.spyOn(CarService, 'fetchCars').mockResolvedValue([car2]);
        await userEvent.click(deleteBtn)

        expect(mockDelete).toHaveBeenCalledExactlyOnceWith(4)
        expect(screen.queryByRole('heading', {name: "Make: " + car.make})).toBe(null);
    });

});