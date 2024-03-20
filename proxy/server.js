/*import { api_key } from "../scripts/data.js";
import fetch from 'node-fetch';

exports.handler = async (event, context) => {
  const { summonerName, tagline } = event.queryStringParameters;

  try {
    const response = await fetch(`https://europe.api.riotgames.com/riot/account/v1/accounts/by-riot-id/${summonerName}/${tagline}?api_key=${api_key}`);
    const data = await response.json();

    return {
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Internal Server Error' })
    };
  }
};
*/

import { api_key } from "../scripts/data.js";

exports.handler = async (event, context) => {
  const { summonerName, tagline } = event.queryStringParameters;

  try {
    const accountResponse = await fetch(`https://europe.api.riotgames.com/riot/account/v1/accounts/by-riot-id/${summonerName}/${tagline}?api_key=${api_key}`);
    const accountData = await accountResponse.json();

    const puuid = accountData.puuid;

    const summonerResponse = await fetch(`https://euw1.api.riotgames.com/lol/summoner/v4/summoners/by-puuid/${puuid}?api_key=${api_key}`);
    const summonerData = await summonerResponse.json();

    const championsResponse = await fetch(`https://euw1.api.riotgames.com/lol/champion-mastery/v4/champion-masteries/by-puuid/${puuid}/top?count=3&api_key=${api_key}`);
    const championsData = await championsResponse.json();

    const championIds = championsData.map(champion => champion.championId);

    const championsDataResponse = await fetch(`https://ddragon.leagueoflegends.com/cdn/14.5.1/data/en_US/championFull.json`);
    const championsFullData = await championsDataResponse.json();
    const championNames = championIds.map(championId => championsFullData.data[championId].name);

    return {
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ response1: accountData, response2: summonerData, response3: championsData, championNames })
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Internal Server Error' })
    };
  }
}
