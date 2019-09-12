import React, { Component } from 'react';
import NumTop from '../Num/NumTop';
import NumLeft from '../Num/NumLeft';
import './Cross.css';
import '../Num/Num.css';


// let timer = 0;
// let sec = 0;
// timer = setInterval(function(){
//     sec++;
//     console.log(sec);
// }, 1000);
// clearInterval(timer)

// КОНВЕРТИРОВАТЬ СЕКУНДЫ В HH-MM-SS
// ВАРИАНТ 1
// var date = new Date(null);
// date.setSeconds(sec); // specify value for SECONDS here
// var result = date.toISOString().substr(11, 8);
// console.log( result );
// ВАРИАНТ 2
// console.log( new Date(sec * 1000).toISOString().substr(11, 8) );
// ВАРИАНТ 3
// let totalSeconds = 28565;
// let hours = Math.floor(totalSeconds / 3600);
// totalSeconds %= 3600;
// let minutes = Math.floor(totalSeconds / 60);
// let seconds = totalSeconds % 60;
// console.log("hours: " + hours);
// console.log("minutes: " + minutes);
// console.log("seconds: " + seconds);
// // If you want strings with leading zeroes:
// minutes = String(minutes).padStart(2, "0");
// hours = String(hours).padStart(2, "0");
// seconds = String(seconds).padStart(2, "0");
// console.log(hours + ":" + minutes + ":" + seconds);

let timer = 0;
let totalCrossSeconds = 0;

export default class Cross extends Component {

    constructor(props) {
        super(props);
        this.clickCell = this.clickCell.bind(this);
        this.clickPaintSuper = this.clickPaintSuper.bind(this);
        this.clickPaint = this.clickPaint.bind(this);
        this.clickBlank = this.clickBlank.bind(this);
        this.clickDelete = this.clickDelete.bind(this);
        this.clickSave = this.clickSave.bind(this);
        this.clickStartTimer = this.clickStartTimer.bind(this);
    }

    clickStartTimer() {
        const {context} = this.props;
        const state = context.state;
        const setAppState = context.methods.setAppState;
        timer = setInterval(function(){
            totalCrossSeconds++;
            // console.log(totalCrossSeconds);
            let newSeconds = Math.floor( (state.selectedCrossTime.h * 60 * 60) + (state.selectedCrossTime.m * 60) + state.selectedCrossTime.s );
            // console.log( newSeconds );
            newSeconds += totalCrossSeconds;
            // console.log( newSeconds );
            //======================
            let hours = Math.floor(newSeconds / 3600);
                newSeconds %= 3600;
            let minutes = Math.floor(newSeconds / 60);
            let seconds = newSeconds % 60;
            // console.log("hours: " + hours);
            // console.log("minutes: " + minutes);
            // console.log("seconds: " + seconds);
            // If you want strings with leading zeroes:
            // hours = String(hours).padStart(2, "0");
            // minutes = String(minutes).padStart(2, "0");
            // seconds = String(seconds).padStart(2, "0");
            // console.log(hours + ":" + minutes + ":" + seconds);
            //======================
            setAppState({
                selectedCrossTime: {
                    h: hours,
                    m: minutes,
                    s: seconds
                }
            });
        }, 1000);
        totalCrossSeconds = 0;
    }

    clickPaintSuper(e) {
        const {context} = this.props;
        const setAppState = context.methods.setAppState;
        setAppState({
            paintSuper: true,
            paint: false,
            blank: false,
            delete: false,
        });
    }
    clickPaint(e) {
        const {context} = this.props;
        const setAppState = context.methods.setAppState;
        setAppState({
            paintSuper: false,
            paint: true,
            blank: false,
            delete: false,
        });
    }

    clickBlank(e) {
        const {context} = this.props;
        const setAppState = context.methods.setAppState;
        setAppState({
            paintSuper: false,
            paint: false,
            blank: true,
            delete: false,
        });
    }

    clickDelete(e) {
        const {context} = this.props;
        const setAppState = context.methods.setAppState;
        setAppState({
            paintSuper: false,
            paint: false,
            blank: false,
            delete: true,
        });
    }

    clickSave() {
        const {context} = this.props;
        const state = context.state;
        localStorage.setItem('cross_' + state.selectedSize + '_id-' + state.selectedCross, JSON.stringify( state.selectedCrossData ) );
        localStorage.setItem('cross_' + state.selectedSize + '_id-' + state.selectedCross + '_time', JSON.stringify( state.selectedCrossTime ) );
    }

    clickCell(e) {
        const {context} = this.props;
        const state = context.state;
        const setAppState = context.methods.setAppState;

        if ( !localStorage.getItem('cross_' + state.selectedSize + '_id-' + state.selectedCross + '_done' ) ) {

            // ЕСЛИ ВЫБРАНО: ЗАКРАСИТЬ КЛЕТКУ
            if ( state.paint ) {
                e.currentTarget.classList.add('paint');
                e.currentTarget.classList.remove('blank');
                e.currentTarget.setAttribute('data-type', 1);
                if ( state.selectedCrossChange === false ) {
                    this.clickStartTimer();
                    setAppState({
                        selectedCrossChange: true
                    })
                }
            }
            // END

            // ЕСЛИ ВЫБРАНО: ПОМЕТИТЬ КЛЕТКУ КАК ПУСТУЮ
            if ( state.blank ) {
                e.currentTarget.classList.add('blank');
                e.currentTarget.classList.remove('paint');
                e.currentTarget.setAttribute('data-type', 0);
                if ( state.selectedCrossChange === false ) {
                    this.clickStartTimer();
                    setAppState({
                        selectedCrossChange: true
                    })
                }
            }
            // END

            // ЕСЛИ ВЫБРАНО: ОЧИСТИТЬ КЛЕТКУ
            if ( state.delete ) {
                e.currentTarget.classList.remove('paint');
                e.currentTarget.classList.remove('blank');
                e.currentTarget.removeAttribute('data-type');
                if ( state.selectedCrossChange === false ) {
                    this.clickStartTimer();
                    setAppState({
                        selectedCrossChange: true
                    })
                }
            }
            // END

            let selectedCrossDataNew = [];

            // ЕСЛИ ВЫБРАНО ТРОЙНОЕ ДЕЙСТВИЕ: ЗАКРАСИТЬ, ПОМЕТИТЬ, УДАЛИТЬ
            // ВАРИАНТ 1
            if ( state.paintSuper ) {
                if ( state.selectedCrossChange === false ) {
                    this.clickStartTimer();
                    setAppState({
                        selectedCrossChange: true
                    })
                }
                selectedCrossDataNew = state.selectedCrossData;
                let rowIndexCross = e.currentTarget.parentNode.parentNode.getAttribute('data-index');
                let colIndexCross = e.currentTarget.getAttribute('data-index');
                switch (selectedCrossDataNew[rowIndexCross][colIndexCross]) {
                    case 1:
                        selectedCrossDataNew[rowIndexCross][colIndexCross] = 0;
                        break;
                    case 0:
                        selectedCrossDataNew[rowIndexCross][colIndexCross] = 2;
                        break;
                    case 2:
                        selectedCrossDataNew[rowIndexCross][colIndexCross] = 1;
                        break;
                    default:
                }
                setAppState({
                    selectedCrossData: selectedCrossDataNew
                });
                // console.log( selectedCrossDataNew );
            }

            /*
            // ВАРИАНТ 2
            if ( state.paintSuper ) {
                if ( state.selectedCrossChange === false ) {
                    this.clickStartTimer();
                    setAppState({
                        selectedCrossChange: true
                    })
                }
                let rowIndexCross = e.currentTarget.parentNode.parentNode.getAttribute('data-index');
                let colIndexCross = e.currentTarget.getAttribute('data-index');
                switch (state.selectedCrossData[rowIndexCross][colIndexCross]) {
                    case 1:
                        setAppState((item, i) => {
                            item.selectedCrossData[rowIndexCross][colIndexCross] = 0;
                            return (
                                item
                            )
                        });
                        break;
                    case 0:
                        setAppState((item, i) => {
                            item.selectedCrossData[rowIndexCross][colIndexCross] = 2;
                            return (
                                item
                            )
                        });
                        break;
                    case 2:
                        setAppState((item, i) => {
                            item.selectedCrossData[rowIndexCross][colIndexCross] = 1;
                            return (
                                item
                            )
                        });
                        break;
                    default:
                }
            }
            */
            // END


            // ЕСЛИ ВЫБРАНО НЕ ТРОЙНОЕ ДЕЙСТВИЕ, А ПООТДЕЛЬНОСТИ
            if ( state.paintSuper === false ) {
                selectedCrossDataNew = state.selectedCrossData;
                if ( state.paint ) {
                    let row = e.currentTarget.parentNode.parentNode.getAttribute('data-index');
                    let col = e.currentTarget.getAttribute('data-index');
                    selectedCrossDataNew[row][col] = 1;
                }
                if ( state.blank ) {
                    let row = e.currentTarget.parentNode.parentNode.getAttribute('data-index');
                    let col = e.currentTarget.getAttribute('data-index');
                    selectedCrossDataNew[row][col] = 0;
                }
                if ( state.delete ) {
                    let row = e.currentTarget.parentNode.parentNode.getAttribute('data-index');
                    let col = e.currentTarget.getAttribute('data-index');
                    selectedCrossDataNew[row][col] = 2;
                }
                setAppState({
                    selectedCrossData: selectedCrossDataNew
                });
            }
            // END

            // Warn if overriding existing method
            if (Array.prototype.equals) {
                console.warn("Overriding existing Array.prototype.equals. Possible causes: New API defines the method, there's a framework conflict or you've got double inclusions in your code.");
            }
            // attach the .equals method to Array's prototype to call it on any array
            Array.prototype.equals = function (array) {
                // if the other array is a falsy value, return
                if (!array)
                return false;
                // compare lengths - can save a lot of time
                if (this.length !== array.length)
                return false;
                for (var i = 0, l=this.length; i < l; i++) {
                    // Check if we have nested arrays
                    if (this[i] instanceof Array && array[i] instanceof Array) {
                        // recurse into the nested arrays
                        if (!this[i].equals(array[i]))
                        return false;
                    }
                    else if (this[i] !== array[i]) {
                        // Warning - two different object instances will never be equal: {x:20} != {x:20}
                        return false;
                    }
                }
                return true;
            }
            // Hide method from for-in loops
            Object.defineProperty(Array.prototype, "equals", {enumerable: false});

            // *********************************************************************
            // let selectedCrossDataNewForCheck = state.selectedCrossData;
            let selectedCrossDataNewForCheck = selectedCrossDataNew;
            let tempMiniArr = [];
            let countTrue = 0;
            // console.log( selectedCrossDataNewForCheck );
            selectedCrossDataNewForCheck.map((rowNew, i) => {
                // console.group('rowNew-'+i);
                // console.log('строка: ' + rowNew);
                rowNew.map((value, j) => {
                    if ( value === 2 ) {
                        // console.log('ОПА ДВОЙКА');
                        tempMiniArr.push(0);
                        // console.log(tempMiniArr);
                    } else {
                        tempMiniArr.push(value);
                        // console.log(tempMiniArr);
                    }
                    return tempMiniArr;
                });
                // console.log('строка новая: ' + tempMiniArr);
                // console.log( tempMiniArr.equals(state[state.selectedSize][state.selectedCross].arr[i]) );
                if ( tempMiniArr.equals(state[state.selectedSize][state.selectedCross].arr[i]) ) {
                    countTrue++;
                }
                tempMiniArr = [];
                // console.groupEnd();
            });
            if ( state[state.selectedSize][state.selectedCross].height === countTrue ) {
                setAppState({
                    result: true
                });
                this.clickSave();
                localStorage.setItem('cross_' + state.selectedSize + '_id-' + state.selectedCross + '_done', true );
                document.querySelector('.grid__result').classList.add('active')
                setTimeout(
                    function() {
                        document.querySelector('.grid__result').classList.remove('active')
                    }, 2000
                );
            }
            // console.log(countTrue);
            countTrue = 0;
            // *********************************************************************

            /*
            // ПРОВЕРКА РЕШЕННОСТИ
            let arrCellTrue = 0;
            let arrCellFalse = 0;
            state[state.selectedSize][state.selectedCross].arr.map((row, i) => {
                row.map((value, j) => {
                    if ( value === 1 ) {
                        arrCellTrue++;
                    }
                    if ( value === 0 ) {
                        arrCellFalse++;
                    }
                    return true;
                });
                return true;
            });
            console.log( 'true=' + arrCellTrue + ' | false=' + arrCellFalse );

            let myArrCellTrue = 0;
            let myArrCellFalse = 0;
            state.selectedCrossData.map((row, i) => {
                row.map((value, j) => {
                    // if ( value === state[state.selectedSize][state.selectedCross].arr[i][j] ) {
                        if ( value === 1 ) {
                            myArrCellTrue++;
                            console.log( '[' + i + ',' + j + '] ' + value + ' ' + state[state.selectedSize][state.selectedCross].arr[i][j] + ' совпадает' );
                        }
                        if ( value === 0 || value === 2 ) {
                            myArrCellFalse++;
                            console.log( '[' + i + ',' + j + '] ' + value + ' ' + state[state.selectedSize][state.selectedCross].arr[i][j] + ' ПУСТАЯ КЛЕТКА' );
                            document.querySelector('h1').innerText = '-';
                        }
                        return true;
                    // }
                });
                return true;
            });
            console.log( 'true=' + myArrCellTrue + ' | false=' + myArrCellFalse );

            if ( myArrCellTrue===arrCellTrue && myArrCellFalse===arrCellFalse ) {
                document.querySelector('h1').innerText = '+';
                // setAppState({
                //     result: true
                // });
                // this.clickSave();
                // localStorage.setItem('cross_' + state.selectedSize + '_id-' + state.selectedCross + '_done', true );
                document.querySelector('.grid__result').classList.add('active')
                setTimeout(
                    function() {
                        document.querySelector('.grid__result').classList.remove('active')
                    }, 2000
                );
            }
            // END
            */

        }

    }

    render() {
        const {context} = this.props;
        const state = context.state;
        let crossList = state.selectedCrossData.map(function(row, i) {
            return (
                <div className='cross__row' key={i} data-index={i}>
                    <div className='cross__row-inner'>
                        {
                            row.map(function(cell, j) {
                                return (
                                    <div
                                        onClick={this.clickCell}
                                        className={
                                            (cell === 1 && 'cross__cell paint') ||
                                            (cell === 0 && 'cross__cell blank') ||
                                            (cell === 2 && 'cross__cell')
                                        }
                                        data-type={
                                            (cell === 1 && '1') ||
                                            (cell === 0 && '0') ||
                                            (cell === 2 && '2')
                                        }
                                        data-index={j}
                                        key={j}
                                    >
                                    </div>
                                );
                            }, this)
                        }
                    </div>
                </div>
            );
        }, this)

        return (
            <div className="grid">
                <div className='grid__name'>{state.selectedCrossName}</div>
                {
                    !localStorage.getItem('cross_' + state.selectedSize + '_id-' + state.selectedCross + '_done' )
                    &&
                        <div className='grid__time'>{String(state.selectedCrossTime.h).padStart(2, "0") + ':' + String(state.selectedCrossTime.m).padStart(2, "0") + ':' + String(state.selectedCrossTime.s).padStart(2, "0")}</div>
                }
                <div className='grid__num-top'>
                    <NumTop context={context} />
                </div>
                <div className='grid__num-left'>
                    <NumLeft context={context} />
                </div>
                <div className='grid__content'>
                    <div className={'cross' + (localStorage.getItem('cross_' + state.selectedSize + '_id-' + state.selectedCross + '_done') ? ' cross_done':'')}>
                        {crossList}
                    </div>
                    <div className='grid__result'>
                        {
                            state.result
                            ?
                            'Отлично'
                            :
                            'Не верно'
                        }
                    </div>
                </div>
                <div className='grid__btns-control'>
                    {
                        !localStorage.getItem('cross_' + state.selectedSize + '_id-' + state.selectedCross + '_done' )
                        &&
                            <div className='btns'>
                                {/*<button className='btn btn_check' title='Проверить решение' onClick={this.check}>CHECK</button>*/}
                                <button className='btn btn_save' title='Сохранить изменения' onClick={this.clickSave}>Сохранить изменения</button>
                                <button className={'btn btn_paint-super' + (state.paintSuper?' active':'')} title='Закрасить, пометить, удалить' onClick={this.clickPaintSuper}>Закрасить, пометить, удалить</button>
                                <button className={'btn btn_paint' + (state.paint?' active':'')} title='Закрасить клетку' onClick={this.clickPaint}>Закрасить клетку</button>
                                <button className={'btn btn_blank' + (state.blank?' active':'')} title='Пометить клетку как пустую' onClick={this.clickBlank}>Пометить клетку как пустую</button>
                                <button className={'btn btn_delete' + (state.delete?' active':'')} title='Очистить клетку' onClick={this.clickDelete}>Очистить клетку</button>
                            </div>
                    }
                </div>

            </div>
        )
    }

    componentDidMount() {
        const {context} = this.props;
        const state = context.state;
        if ( !localStorage.getItem('cross_' + state.selectedSize + '_id-' + state.selectedCross + '_done' ) ) {
            document.querySelectorAll('.cross__cell').forEach(item=>{
                item.addEventListener('mouseenter', () => {
                    let rowId = item.parentNode.parentNode.getAttribute('data-index');
                    let colId = item.getAttribute('data-index');
                    document.querySelectorAll('.cross__row')[rowId].querySelectorAll('.cross__cell').forEach(colItem=>{
                        colItem.classList.add('hover');
                    });
                    document.querySelectorAll('.cross__row').forEach((row, i)=>{
                        row.querySelectorAll('.cross__cell')[parseInt(colId)].classList.add('hover');
                    });
                });
                item.addEventListener('mouseleave', () => {
                    let rowId = item.parentNode.parentNode.getAttribute('data-index');
                    let colId = item.getAttribute('data-index');
                    document.querySelectorAll('.cross__row')[rowId].querySelectorAll('.cross__cell').forEach(colItem=>{
                        colItem.classList.remove('hover');
                    });
                    document.querySelectorAll('.cross__row').forEach((row, i)=>{
                        row.querySelectorAll('.cross__cell')[parseInt(colId)].classList.remove('hover');
                    });
                });
            })
        }
    }

    componentWillUnmount() {
        const {context} = this.props;
        const state = context.state;
        if ( state.selectedCrossChange ) {
            clearInterval(timer);
            localStorage.setItem('cross_' + state.selectedSize + '_id-' + state.selectedCross, JSON.stringify( state.selectedCrossData ) );
            localStorage.setItem('cross_' + state.selectedSize + '_id-' + state.selectedCross + '_time', JSON.stringify( state.selectedCrossTime ) );
        }
    }


}
