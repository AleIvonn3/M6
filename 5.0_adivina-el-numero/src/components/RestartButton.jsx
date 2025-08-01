import React from 'react';

const RestartButton = ({ onRestart }) => {
    return (
        <button onClick={onRestart}>
            Reiniciar Juego
        </button>
    );
}

export default RestartButton;