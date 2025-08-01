import React, { useState, useEffect } from 'react';
import InputNumber from './InputNumber';
import Message from './Message';
import RestartButton from './RestartButton';


const Game = () => {
    const [randomNumber, setRandomNumber] = useState(null);
    const [userGuess, setUserGuess] = useState('');
    const [message, setMessage] = useState('');
    const [attempts, setAttempts] = useState(0);

    useEffect(() => {
        startNewGame();
    }, []);

    const startNewGame = () => {
        setRandomNumber(Math.floor(Math.random() * 100) + 1);
        setUserGuess('');
        setMessage('');
        setAttempts(0);
    };

    const handleGuess = () => {
        const guess = parseInt(userGuess);
        setAttempts(attempts + 1);

        if (guess === randomNumber) {
            setMessage('¡Correcto!');
        } else if (guess < randomNumber) {
            setMessage('El número es mayor');
        } else {
            setMessage('El número es menor');
        }
    };

    return (
        <div className="game-container">
            <InputNumber 
                value={userGuess} 
                onChange={(e) => setUserGuess(e.target.value)} 
                onSubmit={handleGuess} 
            />
            <Message message={message} />
            <p className="attempts">Intentos: {attempts}</p>
            <RestartButton onRestart={startNewGame} />
        </div>
    );
};

export default Game;