import React, { Component } from 'react';

export default class NumTop extends Component {
    constructor(props) {
        super(props);
        this.click = this.click.bind(this);
    }
    click(e) {
        const {context} = this.props,
                state = context.state;

        // console.log( e.target );
        let row = e.target.parentNode.parentNode.getAttribute('data-index');
        let cell = e.target.getAttribute('data-index');
        let value = state.pic1.arr[row][cell];
        // console.log( 'row ' + row + ' | ' + 'cell ' + cell + ' = ' + value );
        e.target.classList.toggle('active');
    }
    render() {
        const {context} = this.props,
                state = context.state;
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
    // componentDidMount() {
    //     const {context} = this.props,
    //             state = context.state;
    //     state.pic1.numTop.map(function(row, i) {
    //         console.log(row);
    //     });
    // }
}

// {row.map(function(cell, j){
//     return <td className={cell?'true':'false'} key={j}> {cell} </td>;
// })}
