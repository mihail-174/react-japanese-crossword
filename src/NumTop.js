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

}
