import CarIntake from "../components/CarIntake.tsx";
import {expect} from "vitest";
import {render, screen} from "@testing-library/react";

describe('Car Intake Form', () => {

    it('should display the car intake form with 5 input fields', () => {

        render(<CarIntake/>)
        expect(screen.getByPlaceholderText('Make')).toBeVisible();
        expect(screen.getByPlaceholderText('Price')).toBeVisible();
        expect(screen.getAllByLabelText('condition')[0]).toBeVisible();
    });

});