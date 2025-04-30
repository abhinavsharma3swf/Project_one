import {useState} from "react";
import {Car} from "../types.ts";

type CarIntakeProp ={
    onAddCar: (car: Car) => void;
}

const CarIntake = ({onAddCar}: CarIntakeProp) => {

    const [formData, setFormData] = useState({
        make: "",
        model: "",
        year: 0,
        price: 0,
        isUsed: true
    });



    const handleSubmit=(e)=>{
    e.preventDefault();
    const newCar: Car ={
        id: null,
        make: formData.make,
        model: formData.model,
        year: formData.year,
        price: formData.price,
        isUsed: formData.isUsed
    }
    onAddCar(newCar);
    }



    const handleInput = (event) => {
        const { name, value, type } = event.target;

        setFormData((prevForm) => ({
            ...prevForm,
            [name]:
                type === "number"
                    ? Number(value)
                    : name === "isUsed"
                        ? value === "true"  // convert string to boolean
                        : value,
        }));
    };


    return (
        <div>
            <form role='form' onSubmit={handleSubmit}>
                <label>Make
                <input type='text'
                       name='make'
                       required
                       value={formData.make}
                       onChange={handleInput}
                       placeholder='Make'/>
                </label>

                <label>Model
                    <input type='text'
                           name='model'
                           required
                           onChange={handleInput}
                           value={formData.model}
                           placeholder='Model'/>
                </label>

                <label>Year
                    <input type='number'
                           name='year'
                           min={0}
                           onChange={handleInput}
                           value={formData.year}
                           required
                           placeholder='Year'/>
                </label>

                <label>Price
                    <input type='number'
                           min={0}
                           name='price'
                           onChange={handleInput}
                           value={formData.price}
                           required
                           placeholder='Price'/>
                </label>

                <input type='radio'
                       id='new'
                       name='isUsed'
                       value='false'
                        aria-label='condition'/>
                <label htmlFor='new'>
                    New
                </label>

                <input type='radio'
                       name='isUsed'
                       value='true'
                       id='used'
                       aria-label='condition'/>
                <label htmlFor='used'>
                    USED
                </label>
                <button type='submit'> Submit </button>

            </form>

        </div>
    );
};

export default CarIntake;