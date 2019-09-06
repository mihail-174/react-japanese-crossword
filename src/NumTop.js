import React, { Component } from 'react';

export default class NumTop extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        const {context} = this.props;
        const state = context.state;
        return (
            <div className='num num_top'>
                {
                    state.images['img' + state.selected].numTop.map(function(row, i) {
                        return (
                            <div className='num__col' key={i}>
                                {
                                    row.map(function(value, j) {
                                        return (
                                            <div className='num__value' key={j}>
                                                {value}
                                            </div>
                                        )
                                    })
                                }
                            </div>
                        )
                    })
                }
            </div>
        )
    }
}
