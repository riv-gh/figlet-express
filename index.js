const express = require('express');
const figlet = require('figlet');
const fs = require('fs');

const app = express();

const preBlockPage = (text, title='') => `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${title}</title>
</head>
<body>
<pre>${text}</pre>
</body>
</html>`;

const startPageText = fs.readFileSync('./startPage.html').toString()


const startPage = () => startPageText;

app.get('/', (req, res) => {
    res.send(startPage());
})

app.get('/page/:string', async (req, res) => {
    const data = await figlet(req.params.string);
    res.send(preBlockPage(data));
})
app.get('/text/', (req, res) => res.send(''));
app.get('/text/:string', async (req, res) => {
    const data = await figlet(req.params.string);
    res.send(data);
})

const server = app.listen(3000, () => {
    console.log('start on port 3000', new Date());
});

process.on('SIGINT', () => server.close());
process.on('SIGTERM', () => server.close());