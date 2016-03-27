import React, {Component} from 'react'
import Helmet from 'react-helmet'
import {Header} from '_/components'
import AsyncProps from 'async-props'

export default class App extends Component {

    static defaultProps = {
        path: '/'
    };

    static loadProps(params, cb) {
        cb(null, {
            tacos: [ 'Pollo', 'Carnitas' ]
        })
    }

    state = {};

    render() {
        const tacos = this.props.tacos;
        return (
            <div>
                <Helmet
                    htmlAttributes={{lang: 'ru'}}
                    meta={[
                        {charset: 'utf-8'},
                        {name: 'description', content: 'Application'}
                    ]}
                    title='Application'
                />
                <Header/>
                {this.props.children}
                <ul>
                    {tacos.map((taco, i) => (
                        <li key={i}>{taco}</li>
                    ))}
                </ul>
            </div>
        );
    }

}