import {Car} from "../types.ts";


interface CarCardProps{
    car: Car
}
const CarCard = ({car}: CarCardProps ) => {
    return (
        <div>
        <h1>Tesla</h1>
            <h2>Model3</h2>
            <h2> 2024</h2>
            <h2>20</h2>
            <h2>No</h2>
        </div>
    );
};

export default CarCard;