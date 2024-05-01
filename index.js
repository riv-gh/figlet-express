const express = require('express');
const figlet = require('figlet');

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

const startPage = () => `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Enter text</title>
</head>
<body>
    <form>
        <input type="text" name="string" value="some text...">
        <input type="submit" value="send">
    </form>
    <script>
        document.forms[0].onsubmit = function() {
            window.open('/' + encodeURIComponent(this.string.value));
            return false;
        }
    </script>
</body>
</html>`;

app.get('/', (req, res) => {
    res.send(startPage());
})

app.get('/:string', async (req, res) => {
    console.log(req.params);
    const data = await figlet(req.params.string);
    res.send(preBlockPage(data));
})

const server = app.listen(3000, () => {
    console.log('start on port 3000', new Date());
});

process.on('SIGINT', () => server.close());
process.on('SIGTERM', () => server.close());