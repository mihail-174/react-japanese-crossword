import React, { Component } from 'react';
import './List.css';

export default class List extends Component {
    constructor(props) {
        super(props);
        this.click = this.click.bind(this);
    }

    click(e){
        const {context} = this.props;
        const state = context.state;
        const setAppState = context.methods.setAppState;

        // let clearArrData = state[state.selectedSize][e.currentTarget.getAttribute('data-id')];
        // state[state.selectedSize][e.currentTarget.getAttribute('data-id')].arr.map((row, index)=> {
        //     row.map((value, j) => {
        //         // console.log(value);
        //         if ( value === 1 ) {
        //             value = 0;
        //         }
        //         console.log(value);
        //     });
        //     console.log(row);
        // });
        // console.log(clearArrData);
        setAppState({
            selectedCross: e.currentTarget.getAttribute('data-id'),
            selectedCrossData: state[state.selectedSize][e.currentTarget.getAttribute('data-id')]
            // selectedCross: state[state.selectedSize][e.currentTarget.getAttribute('data-id')]
        });
        localStorage.setItem('cross_' + state.selectedSize + '_id-' + e.currentTarget.getAttribute('data-id'), JSON.stringify( state[state.selectedSize][e.currentTarget.getAttribute('data-id')] ) );

        // ВЫВОДИМ В ЛЕВУЮ КОЛОНКУ КОЛИЧЕСТВО ЗАКРАШИВАЕМЫХ КЛЕТОК
        function printNumLeft() {
            let newarrRow = []
            let newarrValues = []
            let a = 0;
            // console.log('строк в массиве = ' + this.state.images['img' + this.state.selected].arr.length);
            state[state.selectedSize][e.currentTarget.getAttribute('data-id')].arr.map((row, i) => {
                // console.group('СТРОКА #' + i);
                // console.log(row);
                row.map((value, j) => {
                    // console.log('цикл #' + j);
                    if ( value !== 0 ) {
                        // console.log(value + ' != 0');
                        a += value;
                        if ( j + 1 === row.length ) {
                            // console.log('значений в массиве = ' + row.length);
                            // console.log( '*** КОНЕЦ МАССИВА ***' );
                            newarrValues.push(a);
                            a = 0;
                            // console.log('записали в новый массив количество единиц = ' + a);
                        }
                    } else {
                        // console.log(value + ' == 0');
                        if ( a !== 0 ) {
                            newarrValues.push(a);
                            a = 0;
                            // console.log('записали в новый массив количество единиц = ' + a);
                        }
                    }
                    // newarrValues = [];
                });
                // console.log(newarrValues);
                newarrRow.push(newarrValues);
                newarrValues = [];
                // console.groupEnd();
            });
            // console.log(newarrValues);
            // console.log(newarrRow);
            setAppState({
                numLeft: newarrRow
            });
            // РАБОЧИЙ ПРИМЕР С ОДНОМЕРНЫМ МАССИВОМ
            // let newarr = []
            // let a = 0;
            // console.log('длина массива = ' + arr.length);
            // const my2 = arr.map((value, i) => {
            //     console.log('цикл #' + i);
            //     if ( arr[i] !== 0 ) {
            //         console.log(arr[i] + ' != 0');
            //         a += arr[i];
            //         if ( i + 1 === arr.length ) {
            //             console.log( 'конец массива' );
            //             newarr.push(a);
            //         }
            //     } else {
            //         console.log(arr[i] + ' == 0');
            //         if ( a !== 0 ) {
            //             newarr.push(a);
            //         }
            //         console.log('записали в новый массив количество единиц = ' + a);
            //         a = 0;
            //     }
            // });
            // console.log(newarr);
        }
        printNumLeft();
        // КОНЕЦ

        // ВЫВОДИМ В ВЕРХНЮЮ КОЛОНКУ КОЛИЧЕСТВО ЗАКРАШИВАЕМЫХ КЛЕТОК
        function printNumTop() {
            let newArrRow = []
            let newArrValues = []
            let a = 0;
            // let j = 1;
            // console.log('строк в массиве = ' + arr.length);
            let arr = state[state.selectedSize][e.currentTarget.getAttribute('data-id')].arr;
            for (var i = 0; i < arr[0].length; i++) {
                // console.group('************* GROUP *************');
                // console.log( arr );
                for (var key in arr) {
                    // console.group('ЦИКЛ #' + key);
                    if ( arr[key][i] !== 0 ) {
                        // console.log(arr[key][i] + ' != 0');
                        a += arr[key][i];
                        // console.log( key );
                        // console.log( parseInt(key) + 1 );
                        // console.log( arr.length );
                        if ( parseInt(key) + 1 === arr.length ) {
                            // console.log('+');
                            newArrValues.push(a);
                            a = 0;
                            // console.log(newArrValues);
                        }
                    } else {
                        // console.log(arr[key][i] + ' == 0');
                        if ( a !== 0 ) {
                            newArrValues.push(a);
                            a = 0;
                            // console.log('записали в новый массив количество единиц = ' + a);
                        }
                    }
                    // console.groupEnd();
                }
                // console.log('записали в новый массив количество единиц = ' + a);
                // a = 0;
                // console.log(newArrValues);
                newArrRow.push(newArrValues);
                newArrValues = [];
                // console.groupEnd();
            }
            // console.log(newArrRow);
            setAppState({
                numTop: newArrRow
            });
        }
        printNumTop(this);
    }

    render() {
        const {context} = this.props;
        const state = context.state;
        const newthis = this;
        const list = state[state.selectedSize].map(function(item, i) {
            return (
                <div key={i} data-id={i} className='list__item' onClick={newthis.click}>
                    <div className='list__img'></div>
                    <div className='list__info'>
                        <div className='list__name'>{item.name}</div>
                        <div className='list__size'>{item.width}x{item.height}</div>
                    </div>
                </div>
            )
        })
        return (
            <div className='list'>
                {list}
            </div>
        )
    }

}
