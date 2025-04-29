

const CarIntake = () => {
    return (
        <div>
            <form>
                <label>Make
                <input type='text'
                       required
                       placeholder='Make'/>
                </label>

                <label>Model
                    <input type='text'
                           required
                           placeholder='Model'/>
                </label>

                <label>Year
                    <input type='number'
                           required
                           placeholder='Year'/>
                </label>

                <label>Price
                    <input type='number'
                           required
                           placeholder='Price'/>
                </label>

                <input type='radio'
                       id='new'
                       value='false'
                        aria-label='condition'/>
                <label htmlFor='new'>
                    New
                </label>

                <input type='radio'
                       value='true'
                       id='used'
                       aria-label='condition'/>
                <label htmlFor='used'>
                    USED
                </label>

            </form>
        </div>
    );
};

export default CarIntake;