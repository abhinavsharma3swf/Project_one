import {Car} from "../types.ts";


interface CarCardProps{
    car: Car
}
const CarCard = ({car}: CarCardProps ) => {
    return (
        <div>
            <h1> {car.make}</h1>
            <h2>{car.model}</h2>
            <h2>{car.year}</h2>
            <h2>{car.price}</h2>
            <p>{car.isUsed ? 'Used' : 'New'}</p>
        </div>
    );
};

export default CarCard;