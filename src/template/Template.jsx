import React, {Component} from 'react'

export default class Template extends Component {

    getMarkup = () => {
        return {__html: this.props.markup};
    };

    getHead = () => {
        const head = this.props.head;
        return {
            __html: `
            ${head.title}
            ${head.meta}
            ${head.link}
            ${head.script}
            ${head.base}`
        };
    };

    getFoot = () => {
        return {
            __html: `
                ${this.props.foot.join('')}
                <script src="http://localhost:8888/client.js"></script>
            `
        }
    };

    render() {
        return (
            <html {...this.props.head.htmlAttributes.toComponent()}>
            <head dangerouslySetInnerHTML={this.getHead()}/>
            <body>
            <div id="app" dangerouslySetInnerHTML={this.getMarkup()}/>
            <div id="foot" dangerouslySetInnerHTML={this.getFoot()}/>
            </body>
            </html>
        );
    }

}