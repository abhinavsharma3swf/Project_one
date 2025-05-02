import {Car} from "../types.ts";




type CarCardProps = {
    car: Car,
    onDelete: (id:number | null) => void
}
const CarCard = ({car, onDelete}: CarCardProps ) => {
    const handleDelete = () => {
        onDelete(car.id)
    }

    return (
        <div>
            <h1>Make: {car.make}</h1>
            <h2>Model: {car.model}</h2>
            <h2>Year: {car.year}</h2>
            <h2>Price: {car.price}</h2>
            <p>isUsed: {car.used ? 'Used' : 'New'}</p>
            <button onClick={handleDelete}>Delete</button>
        </div>
    );
};

export default CarCard;