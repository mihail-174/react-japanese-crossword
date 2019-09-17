import React, { Component } from 'react';

export default class NumTop extends Component {

    render() {
        const {context} = this.props;
        const state = context.state;

        const list = state.numTop.map(function(row, i) {
            return (
                <div key={i} className='num__col'>
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
            <div className='num num_top'>
                {list}
            </div>
        )
    }

    componentDidMount() {
        const {context} = this.props;
        const state = context.state;

        // ОТОБРАЖЕНИЕ НАПРАВЛЯЮЩИХ ЛИНИЙ
        function numGuideLinesMouseEnter(numCol, colId) {
            numCol.classList.add('hover');
            document.querySelectorAll('.cross__row').forEach((row, i) => {
                row.querySelectorAll('.cross__cell')[colId].classList.add('hover');
            });
        }
        function numGuideLinesMouseLeave(numCol, colId) {
            numCol.classList.remove('hover');
            document.querySelectorAll('.cross__row').forEach((row, i) => {
                row.querySelectorAll('.cross__cell')[colId].classList.remove('hover');
            });
        }
        if ( !JSON.parse(localStorage.getItem('cross_' + state.selectedType + '_id-' + state.selectedCross + '_done')) ) {
            document.querySelectorAll('.num_top .num__col').forEach((col, i) => {
                col.addEventListener('mouseenter', () => {
                    if ( JSON.parse(localStorage.getItem('cross_setting_guide-lines')) ) {
                        numGuideLinesMouseEnter(col, i);
                    }
                });
                col.addEventListener('mouseleave', () => {
                    if ( JSON.parse(localStorage.getItem('cross_setting_guide-lines')) ) {
                        numGuideLinesMouseLeave(col, i);
                    }
                });
            });
        }
    }

}
