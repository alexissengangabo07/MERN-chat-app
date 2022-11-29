import axios from 'axios';

const url = 'http://localhost:5000/messages/';

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



