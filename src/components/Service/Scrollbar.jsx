import React, { PureComponent } from 'react';
import styled, { css } from 'styled-components';

const ScrollControll = styled.span`
    position: fixed;
    border-radius: 6px;
    opacity: 0;
    z-index: 1;
    transition: all linear 0.4s;
    width: 2px;
    background-color: rgba(255, 255, 255, 0.5);
    height: 100px;
    cursor: pointer;
`;

const ScrollLine = styled.span`
    width: 1px;
    height: 96%;
    top: 2%;
    bottom: 2%;
    background-color: rgba(255, 255, 255, 0.2);
    position: fixed;
    border-radius: 6px;
    opacity: 0;
    z-index: 1;
    ${props =>
        props.hidden &&
        css`
            display: none;
        `};
`;

const ScrollContent = styled.div`
    position: absolute;
    transition: all linear 0.4s;
    width: 100%;
`;

const ScrollArea = styled.div`
    position: relative;
    &:hover > span {
        opacity: 1;
        & > span {
            opacity: 1;
        }
    }
`;

let topBody = 0;
export default class Scrollbar extends PureComponent {
    constructor() {
        super();
        this.startY = 0;
        this.mousewheelevt = /Firefox/i.test(navigator.userAgent)
            ? 'DOMMouseScroll'
            : 'mousewheel';
    }
    setControlSize = () => {
        const { clientHeight, clientWidth } = this.base.parentNode,
            contentHeight = this.content.clientHeight,
            lineHeight = this.line.clientHeight;

        const result = clientHeight / contentHeight * lineHeight;
        this.control.style.height = `${result}px`;
        this.control.style.transform = `translateY(${-(
            topBody /
            (contentHeight / lineHeight)
        )}px)`;

        this.line.style.left = `${clientWidth - 5}px`;
        this.control.style.left = `${clientWidth - 6}px`;
    };

    onMouseWheel = e => {
        const limit = this.content.offsetTop;
        e.preventDefault();

        const base = this.base.parentNode.clientHeight;
        topBody -= e.deltaY || e.detail * 10;
        const result = this.content.offsetHeight - base;

        if (topBody > limit) topBody = 0;

        if (-topBody >= result) topBody = -(this.content.offsetHeight - base);
        if (result < 0) topBody = 0;

        this.content.style.transform = `translateY(${topBody}px)`;
        this.setControlSize();
    };

    onTouchStart = e => {
        this.startY = e.changedTouches[0].clientY;
    };

    onTouchMove = e => {
        const limit = this.content.offsetTop;
        e.preventDefault();

        const base = this.base.parentNode.clientHeight;
        topBody -= this.startY - e.changedTouches[0].clientY;
        const result = this.content.offsetHeight - base;

        if (topBody > limit) topBody = 0;

        if (-topBody >= result) topBody = -(this.content.offsetHeight - base);
        if (result < 0) topBody = 0;

        this.content.style.transform = `translateY(${topBody}px)`;
        this.setControlSize();
    };

    componentEvents = action => {
        this.content[action](this.mousewheelevt, this.onMouseWheel);
        this.content[action]('mouseover', this.setControlSize);
        window[action]('resize', this.setControlSize);
        this.content[action]('touchstart', this.onTouchStart);
        this.content[action]('touchmove', this.onTouchMove);
    };

    componentDidMount() {
        this.componentEvents('addEventListener');
    }

    componentWillUnmount() {
        this.componentEvents('removeEventListener');
    }

    render() {
        const { hidden } = this.props;
        return (
            <ScrollArea innerRef={e => (this.base = e)}>
                <ScrollLine hidden={hidden} innerRef={e => (this.line = e)}>
                    <ScrollControll innerRef={e => (this.control = e)} />
                </ScrollLine>
                <ScrollContent innerRef={e => (this.content = e)}>
                    {this.props.children}
                </ScrollContent>
            </ScrollArea>
        );
    }
}
