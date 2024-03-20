import { api_key } from "../scripts/data.js";

exports.handler = async (event, context) => {
  const { summonerName, tagline } = event.queryStringParameters;
  const API_KEY = 'YOUR_API_KEY'; // Remplacez par votre propre clé d'API

  try {
    const response = await fetch(`https://europe.api.riotgames.com/riot/account/v1/accounts/by-riot-id/${summonerName}/${tagline}?api_key=${API_KEY}`);
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
