import { api_key } from "../scripts/data.js";

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
