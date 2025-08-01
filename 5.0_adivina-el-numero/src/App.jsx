import React from 'react';
import Game from './components/Game';
import './App.css';


const App = () => {
    return (
        <div className="App">
            <h1>Adivina el numero</h1>
            <Game />
        </div>
    );
}

export default App;