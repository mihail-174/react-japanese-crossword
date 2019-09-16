import React, { Component } from 'react';
import './Panel.css';

export default class Panel extends Component {

    constructor(props) {
        super(props);
        this.openSettings = this.openSettings.bind(this);
    }

    openSettings() {
        const {context} = this.props;
        const setAppState = context.methods.setAppState;
        setAppState({
            modal: true
        });
    }

    render() {
        const {context} = this.props;
        const state = context.state;
        return (
            <div className='panel'>
                {
                    !localStorage.getItem('cross_' + state.selectedSize + '_id-' + state.selectedCross + '_done' )
                    &&
                    <div className='panel__time'>{String(state.selectedCrossTime.h).padStart(2, "0") + ':' + String(state.selectedCrossTime.m).padStart(2, "0") + ':' + String(state.selectedCrossTime.s).padStart(2, "0")}</div>
                }
                {
                    !localStorage.getItem('cross_' + state.selectedSize + '_id-' + state.selectedCross + '_done' )
                    &&
                    <div className='panel__settings' onClick={this.openSettings}>Настройки</div>
                }
            </div>
        )
    }

}
