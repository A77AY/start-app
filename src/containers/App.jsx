import React, {Component} from 'react'
import Helmet from 'react-helmet'
import styles from './App.css'
import {Content, Header, Footer} from '_/components'

export default class App extends Component {

    static defaultProps = {
        path: '/'
    };

    state = {};

    render() {
        return (
            <div>
                <Helmet
                    htmlAttributes={{lang: 'ru-RU'}}
                    meta={[
                        {charset: 'utf-8'},
                        {name: 'description', content: 'Application'},
                        {name: 'viewport', content: 'width=device-width, initial-scale=1'}
                    ]}
                    title='Application'
                    link={[
                        {href: 'public/fonts/roboto/roboto.css', rel: 'stylesheet', type: 'text/css'}
                    ]}
                />
                <Header />
                <Content>
                    {this.props.children}
                </Content>
                <Footer />
            </div>
        );
    }

}