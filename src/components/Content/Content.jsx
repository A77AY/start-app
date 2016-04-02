import React, {Component} from 'react'

export default class Content extends Component {

    static defaultProps = {};

    state = {};

    render() {
        return (
            <div>
                {this.props.children}
            </div>
        );
    }

}