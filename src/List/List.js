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
        const crossType = state.crossList[e.currentTarget.getAttribute('id')].type; // ТИП выбранного кроссворда
        const crossListId = e.currentTarget.getAttribute('id'); // ID выбранного кроссворда из списка
        const crossId = e.currentTarget.getAttribute('data-id-cross'); // ID выбранного кроссворда

        let arrOld = state.crossList[crossListId];
        let selectedCrossData = arrOld.arr.map((row, index)=> {
            let newNewArr = row.map((value, j) => {
                if ( value === 1 ) {
                    value = 2;
                }
                if ( value === 0 ) {
                    value = 2;
                }
                return value;
            });
            return newNewArr;
        });
        setAppState({
            selectedType: crossType,
            selectedCrossId: crossListId,
            selectedCross: crossId,
            selectedCrossName: state.crossList[e.currentTarget.getAttribute('id')].name
        });
        if ( localStorage.getItem('cross_' + crossType + '_id-' + crossId) ) {
            setAppState({
                selectedCrossData: JSON.parse( localStorage.getItem('cross_' + crossType + '_id-' + crossId) )
            });
        } else {
            setAppState({
                selectedCrossData
            });
        }
        if ( localStorage.getItem('cross_' + crossType + '_id-' + crossId + '_time') ) {
            setAppState({
                selectedCrossTime: JSON.parse( localStorage.getItem('cross_' + crossType + '_id-' + crossId + '_time') )
            });
        }

        // ВЫВОДИМ В ЛЕВУЮ КОЛОНКУ КОЛИЧЕСТВО ЗАКРАШИВАЕМЫХ КЛЕТОК
        function printNumLeft() {
            let newarrRow = []
            let newarrValues = []
            let a = 0;
            // console.log('строк в массиве = ' + this.state.images['img' + this.state.selected].arr.length);
            state.crossList[crossListId].arr.map((row, i) => {
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
                    return true;
                    // newarrValues = [];
                });
                // console.log(newarrValues);
                newarrRow.push(newarrValues);
                newarrValues = [];
                return true;
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
        printNumTop(this);
        function printNumTop() {
            let newArrRow = []
            let newArrValues = []
            let a = 0;
            // let j = 1;
            // console.log('строк в массиве = ' + arr.length);
            let arr = state.crossList[crossListId].arr;
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
                        // console.log('записали в новый массив количество единиц = ' + a);
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
    }

    render() {
        const {context} = this.props;
        const state = context.state;
        const list = state.crossList.map((item, i) => {
            return (
                <div key={i} id={i} data-id-cross={item.id} data-type-cross={item.type} className='list__item' onClick={this.click}>
                    <div className='list__status'>
                        {
                            JSON.parse(localStorage.getItem('cross_' + item.type + '_id-' + item.id + '_done'))
                            &&
                                <div className='status status_done'></div>
                        }
                        {
                            !JSON.parse(localStorage.getItem('cross_' + item.type + '_id-' + item.id + '_done'))
                            &&
                                <div className='status status_not-resolved'></div>
                        }
                    </div>
                    {/*
                    <div className='list__img'>
                        {
                            localStorage.getItem('cross_' + state.selectedSize + '_id-' + i + '_done' )
                            &&
                                <img src={process.env.PUBLIC_URL + '/icons-' + state.selectedSize + '/' + i + '.png'} alt='' />
                        }
                    </div>
                    */}
                    <div className='list__info'>

                        <div className='list__name'>
                            {
                                JSON.parse(localStorage.getItem('cross_setting_hide-names')) && !JSON.parse(localStorage.getItem('cross_' + state.selectedType + '_id-' + i + '_done'))
                                ?
                                item.name.replace(/[\W\w]/g, "*")
                                :
                                item.name
                            }
                        </div>
                        <div className='list__size'>{item.width}x{item.height}</div>
                    </div>
                </div>
            )
        });

        return (
            <div className='list'>
                {list}
            </div>
        )
    }

    componentDidMount() {}

}
