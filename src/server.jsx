import express from 'express'
import React from 'react'
import ReactDOMServer from 'react-dom/server'
import {RouterContext, match} from 'react-router'
import routes from '_/routes'
import {Template} from '_/template'

const app = express();

app.use(express.static('public'));

app.get('/', (req, res) => {
    res.send(`
    <!DOCTYPE html>
        <html>
        <head>
            <title>Hello World!</title>
        </head>
        <body>
            <h1 id="header">Hello test!</h1>
            <button id="button">Change color</button>
            <script src="http://localhost:5001/client.js"></script>
        </body>
    </html>`);
});

app.listen(3000, () => {
    console.log('App listening on port 3000');
});