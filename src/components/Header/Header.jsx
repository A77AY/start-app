import React, {Component} from 'react'
import {Link} from 'react-router'

export default class Header extends Component {

    static defaultProps = {};

    state = {};

    render() {
        return (
            <div>
                <Link to="/">Index</Link>&nbsp;
                <Link to="about">About</Link>&nbsp;
                <Link to="error">Error</Link>
                <br/>header
            </div>
        );
    }

}