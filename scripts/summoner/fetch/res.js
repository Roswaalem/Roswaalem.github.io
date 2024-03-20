document.addEventListener("DOMContentLoaded", function() {
    const params = new URLSearchParams(window.location.search);
    const summoner = params.get('summoner');

    const [summonerName, tagline] = summoner.split('#');

    const url = `https://bright-stardust-bbf42d.netlify.app/.netlify/functions/server?summonerName=${summonerName}&tagline=${tagline}`;

    fetch(url)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            console.log(data);
        })
        .catch(error => console.error(error));
});

