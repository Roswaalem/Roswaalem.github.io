import { showNotification } from "../../custom/notifications.js";

const copyButton = document.getElementById('copy_button');
const puuid = document.querySelector('h5');

copyButton.addEventListener('click', () => {
    navigator.clipboard.writeText(puuid.textContent)
        .then(() => {
            showNotification('Content copied to clipboard!');
        })
        .catch((error) => {
            showNotification('Failed to copy content: ', error);
        });
    });