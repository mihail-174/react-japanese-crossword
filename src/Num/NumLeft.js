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

}
