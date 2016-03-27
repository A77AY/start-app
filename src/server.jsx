import express from 'express'
import React from 'react'
import ReactDOMServer from 'react-dom/server'
import {RouterContext, match} from 'react-router'
import Helmet from 'react-helmet'
import AsyncProps, {loadPropsOnServer} from 'async-props'
import routes from '_/routes'
import {Template} from '_/template'
import config from '../config/app'

const app = express();

app.use(express.static(config.structure.public.dir));

app.get('*', (req, res) => {
    match({routes, location: req.url}, (error, redirectLocation, renderProps) => {
        if (error) {
            //res.status(500).send(error.message)
            res.status(500).send('Internal server error')
        } else if (redirectLocation) {
            res.redirect(302, redirectLocation.pathname + redirectLocation.search)
        } else if (renderProps) {
            loadPropsOnServer(renderProps, RouterContext, (err, asyncProps, scriptTag) => {
                const markup = ReactDOMServer.renderToString(<AsyncProps {...renderProps} {...asyncProps} />);
                const template = ReactDOMServer.renderToStaticMarkup(<Template
                    head={Helmet.rewind()}
                    foot={[scriptTag]}
                    markup={markup}
                />);
                res.status(200).send(template);
            });
        } else {
            res.status(404).send('Not found')
        }
    })
});

app.listen(3000, () => {
    console.log('App listening on port 3000');
});