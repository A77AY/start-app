import React, {Component} from 'react'
import {Link, IndexLink} from 'react-router'

export default class Header extends Component {

    static defaultProps = {};

    state = {};

    render() {
        return (
            <div>
                <IndexLink to="/">Index</IndexLink>&nbsp;
                <Link to="about">About</Link>&nbsp;
                <Link to="error">Error</Link>
            </div>
        );
    }

}