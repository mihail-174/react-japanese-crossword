import React, { Component } from 'react';

export default class NumLeft extends Component {

    render() {
        const {context} = this.props;
        const state = context.state;

        const list = state.numLeft.map(function(row, i) {
            return (
                <div key={i} className='num__row'>
                    {
                        row.map((value, index) => {
                            return (
                                <div key={index} className='num__value'>
                                    {value}
                                </div>
                            )
                        })
                    }
                </div>
            )
        })

        return (
            <div className='num num_left'>
                {list}
            </div>
        )
    }

    componentDidMount() {
        const {context} = this.props;
        const state = context.state;
        
        // ОТОБРАЖЕНИЕ НАПРАВЛЯЮЩИХ ЛИНИЙ
        function numGuideLinesMouseEnter(numRow, rowId) {
            numRow.classList.add('hover');
            document.querySelectorAll('.cross__row')[rowId].querySelectorAll('.cross__cell').forEach((col, i) => {
                col.classList.add('hover');
            });
        }
        function numGuideLinesMouseLeave(numRow, rowId) {
            numRow.classList.remove('hover');
            document.querySelectorAll('.cross__row').forEach((row, i) => {
                row.querySelectorAll('.cross__cell').forEach((col, i) => {
                    col.classList.remove('hover');
                });
            });
        }
        if ( !JSON.parse(localStorage.getItem('cross_' + state.selectedSize + '_id-' + state.selectedCross + '_done')) ) {
            document.querySelectorAll('.num_left .num__row').forEach((row, i) => {
                row.addEventListener('mouseenter', () => {
                    if ( JSON.parse(localStorage.getItem('cross_setting_guide-lines')) ) {
                        numGuideLinesMouseEnter(row, i);
                    }
                });
                row.addEventListener('mouseleave', () => {
                    if ( JSON.parse(localStorage.getItem('cross_setting_guide-lines')) ) {
                        numGuideLinesMouseLeave(row, i);
                    }
                });
            });
        }
    }

}
