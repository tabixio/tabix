import React from 'react';
import hljs from 'highlight.js';

export default class Markdown extends React.Component {
    componentDidMount() {
        for (const item of this.node.querySelectorAll('pre code')) {
            hljs.highlightBlock(item);
        }
    }

    render() {
        const { source } = this.props;

        return (
            <div
                dangerouslySetInnerHTML={{ __html: source }}
                className="markdown-body"
                ref={e => (this.node = e)}
            />
        );
    }
}
