import {Car} from "../types.ts";


type CarCardProps = {
    car: Car
}
const CarCard = ({car}: CarCardProps ) => {
    return (
        <div>
            <h1>Make: {car.make}</h1>
            <h2>Model: {car.model}</h2>
            <h2>Year: {car.year}</h2>
            <h2>Price: {car.price}</h2>
            <p>isUsed: {car.isUsed ? 'Used' : 'New'}</p>
        </div>
    );
};

export default CarCard;