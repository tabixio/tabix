import React from 'react';
import styled from 'styled-components';
import SplitterLayout from 'react-splitter-layout';
import Scrollbar from './Scrollbar.jsx';

const scrollbarConfig = {
    top: '53px',
    bottom: '20px'
};

const SplitterContent = styled.div`
    & > div {
        & > div:first-child,
        & > div:last-child {
            overflow: hidden;
        }
    }
`;

export default class SplitterLayoutWrapper extends React.PureComponent {

    constructor() {
        super();
        this.node = undefined;
        this.separatorPosition = '99%';
    }

    componentDidMount() {
        this.node = this.item.querySelector('.layout-splitter');
        this.node.addEventListener('dblclick', this.onDblClick);
    }

    componentWillUnmount() {
        this.node.removeEventListener('dblclick', this.onDblClick);
    }

    render() {
        const { children ,vertical} = this.props;
        return (
            <SplitterContent innerRef={e => this.item = e}>
                <SplitterLayout
                    percentage
                    primaryMinSize={0}
                    vertical={vertical}
                    secondaryInitialSize={80}
                >
                    <Scrollbar {...scrollbarConfig}>{children[0]}</Scrollbar>
                    <Scrollbar {...scrollbarConfig} toRight>
                        {children[1]}
                    </Scrollbar>
                </SplitterLayout>
            </SplitterContent>
        );
    }

    onDblClick = () => {
        const secondaryPane = this.item.querySelectorAll('.layout-pane')[1];
        const position = secondaryPane.style.width;
        
        if (position === '99%') {
            secondaryPane.style.width = this.separatorPosition;   
        }
        else {
            this.separatorPosition = position;
            secondaryPane.style.width = '99%';
        }

    }
}
