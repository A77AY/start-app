import React, {Component} from 'react'

export default class Template extends Component {

    getMarkup = () => {
        return {__html: this.props.markup};
    };

    getFoot = () => {
        return {
            __html: this.props.foot.join('')
        }
    };

    render() {
        const head = this.props.head;
        return (
            <html {...head.htmlAttributes.toComponent()}>
            <head>
                {head.title.toComponent()}
                {head.meta.toComponent()}
                {head.link.toComponent()}
                {head.script.toComponent()}
                {head.base.toComponent()}
            </head>
            <body>
            <div id="app" dangerouslySetInnerHTML={this.getMarkup()}/>
            <div id="foot" dangerouslySetInnerHTML={this.getFoot()}/>
            <script src="http://localhost:8888/client.js"></script>
            </body>
            </html>
        );
    }

}