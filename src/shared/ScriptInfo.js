import React from 'react';
import PropTypes from 'prop-types';

import EmptyData from './EmptyData';

export default class ScriptInfo extends React.PureComponent {
    static propTypes = {
        script: PropTypes.string
    };

    render() {
        const isEmpty = !this.props.script;
        const rowClassName = 'data-container' + (isEmpty ? ' empty' : '');

        return (
            <div className={rowClassName}>
                {isEmpty ? <EmptyData /> : <pre>{this.props.script}</pre> }
            </div>
        );
    }
}
