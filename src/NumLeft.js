import React, { Component } from 'react';

export default class NumLeft extends Component {
    constructor(props) {
        super(props);
        this.click = this.click.bind(this);
        this.state = {
            data: 'JORDAN'
        }
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
            {this.state.data}
            {/*
                state.images['img' + state.selected].arr.map(function(item, i) {
                    item.map(function(val, i) {
                        // console.log( val )
                        if ( val ) {
                            // console.log( val );
                            a = val;
                        }
                        // return a
                    })
                    // console.log( a )
                    // console.log( item )
                    // return a
                    return a
                    // var res = item[i];
                })
            */}
            </div>
        )
    }
    // componentDidMount() {
    //     // setTimeout(() => {
    //         // console.log('Our data is fetched');
    //         this.setState({
    //             data: 'HELLO'
    //         })
    //     // }, 1000)
    // }
    /*
    */
    componentDidMount() {
        const {context} = this.props,
                state = context.state;

        let arr = [
            [1,1,1,1],
            [1,0,1,0],
            [1,1,0,0],
            [1,1,1,0],
            [0,1,0,1]
        ];
        let arr2 = [];
        // for (let i=0; i < 3; i++) {
        //     for (let j=0; j < 3; j++) {
        //         arr[i][j].push( 'j' );
        //     }
        // }
        var a = 0;
        const my1 = arr.map(function(val1, i) {
            // console.log( arr[i].join() );
            arr[i] = arr[i].join();
            // arr[i] = arr[i].replace(/\,/g, '');
            // console.log( arr[i] );
            // console.log( i + ' ' + arr[i].split('0').join().replace(/\,/g, '') );


            // arr[i] = arr[i].split('0').join().replace(/\,/g, '');
            // console.log( arr[i].split('') );
            // arr2.push( val1 );
            // const my2 = arr[i].map(function(val2, j) {
                // if ( val2 === 0 ) {
                //     arr[i] = '*';
                // }
                // arr[0][0] = '*';
            // });
        });
        // console.log( arr );

        console.log( "1,1,0,1".match(new RegExp("1", "g")) );


        let arrRow = [];
        let arrCell = [];
        const AAA = arr.map(function(rowVal, i) {
            // console.log( rowVal );
            return (
                <div>
                    {rowVal}
                </div>
            )
        });
        // const AAA = state.images['img' + state.selected].arr.map(function(rowVal, i) {
            // if ( rowVal ) {
            //     console.log( rowVal );
            // }
            // arrRow.push( rowVal );
            // console.log( arrRow );
            // return <div>{rowVal}</div>
            // rowVal[0] = '*';
            // console.log( rowVal[1] );
//
            // let cell = rowVal.map(function(cellVal, j) {
                // arrRow.push(rowVal);
                // arrRow.push( j );
                // cellVal[0] = '*';
                // console.log( rowVal );
                // console.log( i );
                // console.log( j );
                // console.log( cellVal );
                // arrRow.push( j );
                // a = cellVal;
                // return cell
            // });
            // return row
        // });
        // console.log( arrRow );
        // console.log( row );

        var newrow = [];
        // for (let i=0; i < row.length; i++) {
        //     // console.log( row[i] );
        //     for (var j = 0; j < row[i].length; j++) {
        //         // console.log( row[i][j] );
        //         if ( row[i][j] ) {
        //             console.log( row[i][j] );
        //             newrow.push(row[i][j]);
        //         }
        //     }
        // }

        // const BBB = AAA[1].map(function(item, i) {
        //     if ( item ) {
        //         console.log( item );
        //     }
        //     return item
        // });

        this.setState({
            data: AAA
        })
    }



        // let a = 0;
        // console.log( a )
        // item.map(function(val, i) {
        //     // console.log( val )
        //     if ( val ) {
        //         console.log( val );
        //         a = val;
        //     } else {
        //         a = 9;
        //     }
        //     // return a
        // })


}

// {row.map(function(cell, j){
//     return <td className={cell?'true':'false'} key={j}> {cell} </td>;
// })}



// context.methods.setAppState({
//     'temp': 'sss'
// });
// }

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
