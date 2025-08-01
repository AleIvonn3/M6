import React from 'react';

const Message = ({ message }) => {
    return (
        <div className="message">
            {message ? message : "¡Intenta adivinar el número!"}
        </div>
    );
}

export default Message;