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

                // var str ='z,x,c'
                // var arr = str.split(',');
                // // var bbb = row.split('0');
                // console.log( arr );

        // const aaa = ;
        // const aaa = state.images['img' + state.selected].arr.map(function(item, i) {
        //     // var arr = str.split(',');
        //     console.log( item.split('0') );
        //     return (
        //         <div>
        //             {item}
        //         </div>
        //     )
        // });

        let a = 0;

        // const str = state.images['img' + state.selected].arr.map(function(item, i) {
        //     item.map(function(val, i) {
        //         // console.log( val )
        //         if ( val ) {
        //             // console.log( val );
        //             a = val;
        //         }
        //         // return a
        //     })
        //     // console.log( a )
        //     // console.log( item )
        //     // return a
        //     return a
        //     // var res = item[i];
        // });

        // var str = '1010001';
        return (
            <div className='num num_left'>
            {
                state.images['img' + state.selected].arr.map(function(item, i) {
                    item.map(function(val, i) {
                        // console.log( val )
                        if ( val ) {
                            // console.log( val );
                            a = val;
                        }
                        // return a
                    })
                    console.log( a )
                    // console.log( item )
                    // return a
                    return a
                    // var res = item[i];
                })
            }
            </div>
        )
    }
    /*
    componentDidMount() {
        const {context} = this.props,
                state = context.state;
        let a = 0;
        const str = state.images['img' + state.selected].arr.map(function(item, i) {
            item.map(function(val, i) {
                // console.log( val )
                if ( val ) {
                    console.log( val );
                    a = val;
                }
                return a
            })
            console.log( a )
            return item
            // var res = item[i];
        });
    }
    */
}

// {row.map(function(cell, j){
//     return <td className={cell?'true':'false'} key={j}> {cell} </td>;
// })}


    // {
    //     state.temp.map(function(item, i) {
    //         return (
    //             <div>
    //                 {item}
    //             </div>
    //         )
    //     })
    // }

// {
//     state.images['img' + state.selected].numLeft.map(function(row, i) {
//         return (
//             <div className='num__col' key={i}>
//                 {
//                     row.map(function(value, j) {
//                         return (
//                             <div className='num__value' key={j}>
//                                 {value}
//                             </div>
//                         )
//                     })
//                 }
//             </div>
//         )
//     })
// }
