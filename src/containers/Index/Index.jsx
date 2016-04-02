import React, {Component} from 'react'
import Helmet from 'react-helmet'

export default class Index extends Component {

    static defaultProps = {
        path: '/'
    };

    state = {};

    render() {
        return (
            <div>
                <Helmet title="Index"/>
                <h1>Main</h1>
            </div>
        );
    }

}