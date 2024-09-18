/**
 * Content loaded first
 */
document.addEventListener("DOMContentLoaded", function() {
    /**
     * Getting the api key from the client
     */
    let apiKey = localStorage.getItem('apiKey');

    if (!apiKey) {
        apiKey = window.prompt('Please enter your api key :');
        localStorage.setItem('apiKey', apiKey);
    }

    document.addEventListener('keypress', function(e) {
        if (e.key == '²') {
            apiKey = window.prompt('Change your api key :');
            localStorage.setItem('apiKey', apiKey);
            this.location.reload();
        }
    })

    let div = this.getElementById('accountDiv');

    fetch(`https://europe.api.riotgames.com/riot/account/v1/accounts/by-riot-id/Roswaal/696?api_key=${apiKey}`)
        .then(response => {
            div.textContent = response;
        })
        .catch(error => {
            div.textContent = error;
        })
});

