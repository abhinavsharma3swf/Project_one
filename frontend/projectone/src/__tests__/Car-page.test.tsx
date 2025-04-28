import {render, screen} from "@testing-library/react";
import CarPage from "../components/CarPage.tsx";
import {expect} from "vitest";

describe('Car Page', () => {

    it('should display the car page in the browser with a title', () => {

        render(<CarPage/>)
        expect(screen.getByRole("heading", {name: "Car Dealership"})).toBeVisible();

    });
});