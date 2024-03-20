document.addEventListener("DOMContentLoaded", function() {
    const params = new URLSearchParams(window.location.search);
    const summoner = params.get('summoner');

    const [summonerName, tagline] = summoner.split('#');

    const url = `https://lol-glhf.netlify.app/.netlify/functions/server?summonerName=${summonerName}&tagline=${tagline}`;

    fetch(url)
        .then(response => {
            if(!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            document.querySelector("h1").innerText = data.response1.gameName;
            document.getElementById("summoner_name").innerText = data.response1.gameName + "#" + data.response1.tagLine;
            document.querySelector("h5").innerText = data.response1.puuid;

            document.getElementById("summoner_icon").src = "https://ddragon.leagueoflegends.com/cdn/14.5.1/img/profileicon/" + data.response2.profileIconId + ".png";
            document.getElementById("summoner_level").innerText = data.response2.summonerLevel;

            document.getElementById("champion1_icon").src = "https://ddragon.leagueoflegends.com/cdn/14.5.1/img/champion/" + data.response3[0].championId + ".png";
            document.getElementById("champion1_name").innerText = data.championNames[0];
            document.getElementById("champion1_mastery").innerText = data.response3[0].championPoints;

            document.getElementById("champion2_icon").src = "https://ddragon.leagueoflegends.com/cdn/14.5.1/img/champion/" + data.response3[1].championId + ".png";
            document.getElementById("champion2_name").innerText = data.championNames[1];
            document.getElementById("champion2_mastery").innerText = data.response3[1].championPoints;

            document.getElementById("champion3_icon").src = "https://ddragon.leagueoflegends.com/cdn/14.5.1/img/champion/" + data.response3[2].championId + ".png";
            document.getElementById("champion3_name").innerText = data.championNames[2];
            document.getElementById("champion3_mastery").innerText = data.response3[2].championPoints;

            console.log(data);
        })
        .catch(error => console.error(error));
});
