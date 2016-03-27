import React, {Component} from 'react'
import Helmet from 'react-helmet'

export default class About extends Component {

    static defaultProps = {
        path: 'about'
    };

    state = {
        title: "About"
    };

    render() {
        return (
            <div>
                <Helmet title={this.state.title}/>
                About
                <br/><button onClick={()=>{this.setState({title: 'Test'})}}>rename</button>
            </div>
        );
    }

}