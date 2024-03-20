import { api_key } from "../../data.js";

document.addEventListener("DOMContentLoaded", function() {
    const params = new URLSearchParams(window.location.search);
    const summoner = params.get('summoner');

    const [summonerName, tagline] = summoner.split('#');

    const url = `/proxy?summonerName=${summonerName}&tagline=${tagline}`;

    fetch(url)
        .then(response => response.json())
        .then(data => {
            // Traitez les données reçues
            console.log(data);
        })
        .catch(error => console.error(error));
});
