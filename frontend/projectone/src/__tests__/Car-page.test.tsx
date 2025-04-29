import {render, screen} from "@testing-library/react";
import CarPage from "../components/CarPage.tsx";
import {expect} from "vitest";
import {name} from "axios";

describe('Car Page', () => {

    it('should display the car page in the browser with a title', () => {

        render(<CarPage/>)
        expect(screen.getByRole("heading", {name: "Car Dealership"})).toBeVisible();
    });

    it('should display all of the components on the car page', () => {

        render(<CarPage/>)
        expect(screen.getAllByText(/Make*/i)[0]).toBeVisible();
        expect(screen.getByRole('button', {name: 'Fetch Cars'})).toBeVisible();
        expect(screen.getByRole('button', {name: 'Add Car'})).toBeVisible();
    });
});