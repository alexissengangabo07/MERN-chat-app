import axios from 'axios';

const url = 'https://easy-chat-api.onrender.com/messages/';

export const fetchMessages = (expediteur, destinateur) => axios.get(url, {
    params: {
        expediteur, destinateur
    }
});

export const sendMessage = (expediteur, destinateur, messageContent) => axios.post(url, {
    expediteur,
    destinateur,
    messageContent
});



