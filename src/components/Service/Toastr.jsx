import React from 'react';
import { Position, Toaster, Intent } from '@blueprintjs/core';
import { connect } from 'react-redux';

function mapStateToProps(state) {
    return {
        message: state.toastr.message,
        intent: state.toastr.intent,
        id: state.toastr.id
    };
}

@connect(mapStateToProps)
export default class AppToaster extends React.PureComponent {
    componentWillReceiveProps(nextProps) {
        const { id } = this.props;
        const { intent, message } = nextProps;

        id !== nextProps.id &&
            this.toaster.show({
                intent: Intent[intent || 'PRIMARY'],
                message
            });
    }

    render() {
        return (
            <Toaster
                position={Position.TOP_RIGHT}
                ref={e => (this.toaster = e)}
            />
        );
    }
}
