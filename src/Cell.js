import React, { Component } from 'react';

export default class Cell extends Component {
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
        console.log( row + ' | ' + cell + ' = ' + value );
        // console.log( 'row ' + row + ' | ' + 'cell ' + cell + ' = ' + value );
        e.target.classList.toggle('active');
        if ( e.target.hasAttribute('data-type') ) {
            e.target.removeAttribute('data-type', 1);
        } else {
            e.target.setAttribute('data-type', 1);
        }
        // console.log( state.pic1.arr[row][cell] );
    }
    render() {
        // console.log( this.props.value );
        const row = this.props.value.map(function(cell, j) {
            // console.log( cell );
            return <div className='cross__cell' data-index={j} key={j}>{cell}</div>;
        });
        return (
            <div className='cross__row-inner' onClick={this.click} >{row}</div>
        )
    }
}

// {row.map(function(cell, j){
//     return <td className={cell?'true':'false'} key={j}> {cell} </td>;
// })}
