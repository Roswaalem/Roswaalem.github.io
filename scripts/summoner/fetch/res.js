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
            // Mettez à jour les éléments HTML avec les données récupérées
            document.getElementById("nom_du_joueur").textContent = data.nomDuJoueur;
            document.getElementById("niveau_du_joueur").textContent = data.niveauDuJoueur;
            // Continuez à mettre à jour les autres éléments en fonction de vos données
        })
        .catch(error => console.error(error));
});

