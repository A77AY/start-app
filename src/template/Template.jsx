import React, {Component} from 'react'

export default class Template extends Component {

    getMarkup = () => {
        return {__html: this.props.markup};
    };

    render() {
        return (
            <html>
            <head>
                <title>{this.props.title}</title>
            </head>
            <body>
            <div id="app" dangerouslySetInnerHTML={this.getMarkup()}/>
            <script src={'http://localhost:8888/client.js'}></script>
            </body>
            </html>
        );
    }

}