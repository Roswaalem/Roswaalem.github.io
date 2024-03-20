import { api_key } from "../../data.js";

document.addEventListener("DOMContentLoaded", function() {
    const params = new URLSearchParams(window.location.search);
    const summoner = params.get('summoner');

    const [summonerName, tagline] = summoner.split('#');
    
    const proxyUrl = 'https://cors-anywhere.herokuapp.com/';

    const fetchData = async (summonerName, tagline) => {
        try {
            // Fetching account data
            const accountResponse = await fetch(proxyUrl + `https://europe.api.riotgames.com/riot/account/v1/accounts/by-riot-id/${summonerName}/${tagline}?api_key=${api_key}`);
            const accountData = await accountResponse.json();

            // Fetching identifiers
            const puuid = accountData.puuid;
            const identifierResponse = await fetch(proxyUrl + `https://euw1.api.riotgames.com/lol/summoner/v4/summoners/by-puuid/${puuid}?api_key=${api_key}`);
            const identifierData = await identifierResponse.json();

            // Fetching champion masteries
            const championResponse = await fetch(proxyUrl + `https://euw1.api.riotgames.com/lol/champion-mastery/v4/champion-masteries/by-puuid/${puuid}/top?count=3&api_key=${api_key}`);
            const championData = await championResponse.json();

            return { response1: accountData, response2: identifierData, response3: championData };
        } catch(error) {
            console.error(error);
            throw error;
        }
    };

    fetchData(summonerName, tagline)
        .then(data => {
            document.querySelector("h1").innerText = data.response1.gameName;
            document.getElementById("summoner_name").innerText = data.response1.gameName + "#" + data.response1.tagLine;
            document.querySelector("h5").innerText = data.response1.puuid;

            document.getElementById("summoner_icon").src = "https://ddragon.leagueoflegends.com/cdn/14.5.1/img/profileicon/" + data.response2.profileIconId + ".png";
            document.getElementById("summoner_level").innerText = data.response2.summonerLevel;

            document.getElementById("champion1_icon").src = "https://ddragon.leagueoflegends.com/cdn/14.5.1/img/champion/" + data.response3[0].championId + ".png";
            document.getElementById("champion1_name").innerText = data.response3[0].championId;
            document.getElementById("champion1_mastery").innerText = data.response3[0].championLevel;

            document.getElementById("champion2_icon").src = "https://ddragon.leagueoflegends.com/cdn/14.5.1/img/champion/" + data.response3[1].championId + ".png";
            document.getElementById("champion2_name").innerText = data.response3[1].championId;

            document.getElementById("champion3_icon").src = "https://ddragon.leagueoflegends.com/cdn/14.5.1/img/champion/" + data.response3[2].championId + ".png";
            document.getElementById("champion3_name").innerText = data.response3[2].championId;

            console.log(data);
        })
        .catch(error => console.error(error));
});
