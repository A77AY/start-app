import React, {Component} from 'react'
import Helmet from 'react-helmet'
import {Header} from '_/components'

export default class App extends Component {

    static defaultProps = {
        path: '/'
    };

    state = {};

    render() {
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
            </div>
        );
    }

}