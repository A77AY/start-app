import React, {Component} from 'react'
import Helmet from 'react-helmet'

export default class Error extends Component {

    static defaultProps = {
        path: '*'
    };

    state = {};

    render() {
        return (
            <div>
                <h1>Page not found</h1>
            </div>
        );
    }

}