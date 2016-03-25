import React, {Component} from 'react'

export default class App extends Component {

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