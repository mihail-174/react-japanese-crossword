import React, { Component } from 'react';
import './Panel.css';

export default class Panel extends Component {

    constructor(props) {
        super(props);
        this.openSettings = this.openSettings.bind(this);
        this.startAgain = this.startAgain.bind(this);
    }

    openSettings() {
        const {context} = this.props;
        const setAppState = context.methods.setAppState;
        setAppState({
            modal: true
        });
    }

    startAgain() {
        const {context} = this.props;
        const state = context.state;
        const setAppState = context.methods.setAppState;
        localStorage.removeItem('cross_' + state.selectedType + '_id-' + state.selectedCross);
        localStorage.removeItem('cross_' + state.selectedType + '_id-' + state.selectedCross + '_done');
        localStorage.removeItem('cross_' + state.selectedType + '_id-' + state.selectedCross + '_time');
        state.selectedCrossData.map((row, i) => {
            row.map((value, j) => {
                row[j] = 2;
            });
        });
        setAppState({
            selectedCrossTime: {
                h: 0,
                m: 0,
                s: 0
            },
            selectedCrossChange: false
        });
        clearInterval(state.selectedCrossTimerId);
    }

    render() {
        const {context} = this.props;
        const state = context.state;
        return (
            <div className='panel'>
                    <div className='panel__time'>{String(state.selectedCrossTime.h).padStart(2, "0") + ':' + String(state.selectedCrossTime.m).padStart(2, "0") + ':' + String(state.selectedCrossTime.s).padStart(2, "0")}</div>
                {
                    !localStorage.getItem('cross_' + state.selectedType + '_id-' + state.selectedCross + '_done' )
                    &&
                    <div className='panel__settings' onClick={this.openSettings}>Настройки</div>
                }
                {
                    !localStorage.getItem('cross_' + state.selectedType + '_id-' + state.selectedCross + '_done' )
                    &&
                    <div className='panel__start-again' onClick={this.startAgain}>Начать заново</div>
                }
            </div>
        )
    }

}
