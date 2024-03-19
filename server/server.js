import { api_key } from '../scripts/data.js';
import express from 'express';
import https from 'https';
import path from 'path';
import { fileURLToPath } from 'url';

const app = express();
const port = 3000;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(express.static(path.join(__dirname, '../html')));

let cachedData = {};

const fetchData = (summonerName, tagline) => {
    return new Promise((resolve, reject) => {
        https.get(`https://europe.api.riotgames.com/riot/account/v1/accounts/by-riot-id/${summonerName}/${tagline}?api_key=${api_key}`, (response) => {
            let data = '';
            response.on('data', (chunk) => {
                data += chunk;
            });
            response.on('end', async () => {
                const accountData = JSON.parse(data);
                const puuid = accountData.puuid;
                try {
                    const getIdentifiers = await new Promise((resolve, reject) => {
                        https.get(`https://euw1.api.riotgames.com/lol/summoner/v4/summoners/by-puuid/${puuid}?api_key=${api_key}`, (response) => {
                            let data = '';
                            response.on('data', (chunk) => {
                                data += chunk;
                            });
                            response.on('end', () => {
                                resolve(JSON.parse(data));
                            });
                        }).on('error', (error) => {
                            reject(error);
                        });
                    });

                    const getChampions = await new Promise((resolve, reject) => {
                        https.get(`https://euw1.api.riotgames.com/lol/champion-mastery/v4/champion-masteries/by-puuid/${puuid}/top?count=3&api_key=${api_key}`, (response) => {
                            let data = '';
                            response.on('data', (chunk) => {
                                data += chunk;
                            });
                            response.on('end', () => {
                                const champions = JSON.parse(data);
                                const championIds = Object.values(champions).map(champion => champion.championId);
                                try {
                                    const getChampionsData = new Promise((resolve, reject) => {
                                        https.get(`https://ddragon.leagueoflegends.com/cdn/14.5.1/data/en_US/championFull.json`, (response) => {
                                            let data = '';
                                            response.on('data', (chunk) => {
                                                data += chunk;
                                            });
                                            response.on('end', () => {
                                                const championsData = JSON.parse(data);
                                                const championNames = championIds.map(championId => championsData.keys[championId]);
                                                resolve(championNames, championsData);
                                            });
                                        }).on('error', (error) => {
                                            reject(error);
                                        });
                                    });

                                    resolve(championsData, championNames);
                                } catch (error) {
                                    reject(error);
                                }
                            });
                        }).on('error', (error) => {
                            reject(error);
                        });
                    });

                    resolve({ response1: accountData, response2: getIdentifiers, response3: getChampions});
                } catch (error) {
                    reject(error);
                }
            });
        }).on('error', (error) => {
            reject(error);
        });
    });
};

app.get('/data', async (req, res) => {
    const summonerName = req.query.summonerName;
    const tagline = req.query.tagline;

    if (cachedData[summonerName + '#' + tagline]) {
        console.log("Using cached data");

        res.setHeader('Access-Control-Allow-Origin', '*');

        res.send(cachedData[summonerName + '#' + tagline]);
    } else {
        console.log("Fetching data from Riot API");
        try {
            const { response1, response2, response3 } = await fetchData(summonerName, tagline);
            cachedData[summonerName + '#' + tagline] = { response1, response2, response3 };

            res.setHeader('Access-Control-Allow-Origin', '*');
            
            res.send(cachedData[summonerName + '#' + tagline]);
        } catch (error) {
            console.error('Error:', error);
            res.status(500).send('Internal Server Error');
        }
    }
});

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});
