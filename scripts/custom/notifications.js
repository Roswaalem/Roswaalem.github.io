export function showNotification(message) {
    const notification = document.createElement('section');
    notification.classList.add('notification');
    notification.textContent = message;

    const notiftitle = document.createElement('h2');
    notiftitle.textContent = 'Notification';
    notification.appendChild(notiftitle);

    document.body.appendChild(notification);

    setTimeout(() => {
        notification.classList.add('show');
    }, 10);

    setTimeout(() => {
        notification.classList.remove('show');

        setTimeout(() => {
            notification.remove();
        }, 500);
    }, 3000);
}