const express = require('express');

const port = 1327;

const app = express();
const server = app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

app.use(express.static('public'));

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/public/index.html');
});
