import React, {Component} from 'react'
import Helmet from 'react-helmet'

export default class About extends Component {

    static defaultProps = {
        path: 'about'
    };

    render() {
        return (
            <div>
                <Helmet title="About"/>
                <h1>About</h1>
            </div>
        );
    }

}