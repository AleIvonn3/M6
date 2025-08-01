import React from 'react';

const InputNumber = ({ value, onChange, onSubmit }) => {
    return (
        <div>
            <input
                type="number"
                value={value}
                onChange={onChange}
                placeholder="Ingresa un número entre 1 y 100"
            />
            <button onClick={onSubmit}>Adivinar</button>
        </div>
    );
};

export default InputNumber;