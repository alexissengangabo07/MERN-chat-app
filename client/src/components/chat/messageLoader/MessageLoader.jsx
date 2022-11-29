import React from 'react';
import './style.css';

const MessageLoader = () => {
    return (
        <div className="message-loader-container">
            <div className="lds-ripple">
                <div></div>
                <div></div>
            </div>
        </div>
    )
}

export default MessageLoader