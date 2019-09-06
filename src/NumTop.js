import React, { Component } from 'react';

export default class NumTop extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: []
        }
    }
    render() {
        const {context} = this.props;
        const state = context.state;

        const list = state.numLeft.map(function(row, i) {
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
            <div className='num num_left'>
                {list}
            </div>
        )

        // return (
        //     <div className='num num_top'>
        //         {
        //             state.images['img' + state.selected].numTop.map(function(row, i) {
        //                 return (
        //                     <div className='num__col' key={i}>
        //                         {
        //                             row.map(function(value, j) {
        //                                 return (
        //                                     <div className='num__value' key={j}>
        //                                         {value}
        //                                     </div>
        //                                 )
        //                             })
        //                         }
        //                     </div>
        //                 )
        //             })
        //         }
        //     </div>
        // )
    }

    componentDidMount() {
        const {context} = this.props;
        const state = context.state;

        let arr = [
            [1,1,0,1,1],
            // [1,0,1,0,1]
        ];

        // let newArrRow = []
        // let newArrValues = []
        let a = 0;
        // let j = 1;
        // console.log('строк в массиве = ' + arr.length);

        // for (var i = 0; i < arr.length; i++) {
        for (var i = 0; i <= 2; i++) {
            // console.log( arr[i] );
            for (var key in arr) {
                console.log( arr[key][i] );
                // if ( arr[key][i] !== 0 ) {
                //     console.log(arr[key][i] + ' != 0');
                //     // a += arr[key][i];
                //     // console.log(a);
                // } else {
                //     console.log(arr[key][i] + ' == 0');
                // }
                // console.log(a);
                // summ[i] += arr[key][i];
            }
        }
        // console.log(summ);





        // var summ = {
        //     0: 0,
        //     1: 0,
        //     2: 0,
        //     3: 0,
        //     4: 0
        // };
        //
        // for (var i = 0; i < 5; i++) {
        //     for (var key in arr) {
        //         summ[i] += arr[key][i];
        //     }
        // }
        // console.log(summ);







        // let summ = []
        // for (var i = 0; i < 5; i++) {
        //     for (var j in arr) {
        //         console.log(arr[j][i]);
        //         // a += arr[variable][i];
        //     }
        //     // summ.push( a );
        // }
        // console.log(a);

        // var mArr = [
        //     ['a','b'],
        //     ['c','d'],
        //     ['e','f']
        // ];
        // for(var i in mArr){
        //     console.log(mArr[i][1])
        //     for(var j in mArr){
        //         console.log(mArr[1][j])
        //     }
        // }


        // arr.map((value, i) => {
        //     console.log('key-I ' + i);
        //     value.map((value2, j) => {
        //         console.log('key-J ' + j);
        //         // console.log(value2);
        //         console.log(arr[j][i]);
        //     });
        // });



        // for (var i = 0; i < 5; i++) {
        //     // console.log(i);
        //     for (var j in arr) {
        //         // a += arr[j][0];
        //         console.log(arr[j][0]);
        //    }
        //    // summ[i] += arr[key][i];
        //    // console.log(a);
        // }
        // // summ;








        arr.map((row, i) => {
            // console.group('СТРОКА #' + i);
            // console.log(row);
            // row.map((value, j) => {
            //     console.log(row[j]);
            // });
            // row.map((value, j) => {
            //     console.log('цикл #' + j);
            //     if ( value !== 0 ) {
            //         // console.log(value + ' != 0');
            //         a += value;
            //         if ( j + 1 === row.length ) {
            //             // console.log('значений в массиве = ' + row.length);
            //             // console.log( '*** КОНЕЦ МАССИВА ***' );
            //             newArrValues.push(a);
            //             a = 0;
            //             // console.log('записали в новый массив количество единиц = ' + a);
            //         }
            //     } else {
            //         // console.log(value + ' == 0');
            //         if ( a !== 0 ) {
            //             newArrValues.push(a);
            //             a = 0;
            //             // console.log('записали в новый массив количество единиц = ' + a);
            //         }
            //     }
            //     // newArrValues = [];
            // });
            // // console.log(newArrValues);
            // newArrRow.push(newArrValues);
            // newArrValues = [];
            console.groupEnd();
        });
        // // console.log(newArrValues);
        // // console.log(newArrRow);
        // this.setState({
        //     numLeft: newArrRow
        // })

    }
}
