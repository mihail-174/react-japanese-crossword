import React, { Component } from 'react';
import NumTop from '../Num/NumTop';
import NumLeft from '../Num/NumLeft';
import './Cross.css';
import '../Num/Num.css';

export default class Cross extends Component {

    constructor(props) {
        super(props);
        // this.check = this.check.bind(this);
        this.clickCell = this.clickCell.bind(this);
        this.clickPaint = this.clickPaint.bind(this);
        this.clickBlank = this.clickBlank.bind(this);
        this.clickDelete = this.clickDelete.bind(this);
        this.clickSave = this.clickSave.bind(this);
    }

    clickPaint(e) {
        const {context} = this.props;
        const setAppState = context.methods.setAppState;
        document.querySelectorAll('.btns .btn').forEach(item => {
            item.classList.remove('active');
        })
        e.currentTarget.classList.add('active');
        setAppState({
            paint: true,
            blank: false,
            delete: false,
        });
    }

    clickBlank(e) {
        const {context} = this.props;
        const setAppState = context.methods.setAppState;
        setAppState({
            paint: false,
            blank: true,
            delete: false,
        });
        document.querySelectorAll('.btns .btn').forEach(item => {
            item.classList.remove('active');
        })
        e.currentTarget.classList.add('active');
    }

    clickDelete(e) {
        const {context} = this.props;
        const setAppState = context.methods.setAppState;
        setAppState({
            paint: false,
            blank: false,
            delete: true,
        });
        document.querySelectorAll('.btns .btn').forEach(item => {
            item.classList.remove('active');
        })
        e.currentTarget.classList.add('active');
    }

    clickSave() {
        const {context} = this.props;
        const state = context.state;
        localStorage.setItem('cross_' + state.selectedSize + '_id-' + state.selectedCross, JSON.stringify( state.selectedCrossData ) );
    }

    clickCell(e) {
        const {context} = this.props;
        const state = context.state;
        const setAppState = context.methods.setAppState;
        if ( state.paint ) {
            e.currentTarget.classList.add('paint');
            e.currentTarget.classList.remove('blank');
            e.currentTarget.setAttribute('data-type', 1);
        }
        if ( state.blank ) {
            e.currentTarget.classList.add('blank');
            e.currentTarget.classList.remove('paint');
            e.currentTarget.setAttribute('data-type', 0);
        }
        if ( state.delete ) {
            e.currentTarget.classList.remove('paint');
            e.currentTarget.classList.remove('blank');
            e.currentTarget.removeAttribute('data-type');
        }

        let selectedCrossDataNew = state.selectedCrossData;
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
        // console.log( 'true=' + arrCellTrue + ' | false=' + arrCellFalse );

        let myArrCellTrue = 0;
        let myArrCellFalse = 0;
        state.selectedCrossData.map((row, i) => {
            row.map((value, j) => {
                // if ( value === state[state.selectedSize][state.selectedCross].arr[i][j] ) {
                    if ( value === 1 ) {
                        myArrCellTrue++;
                        // console.log( '[' + i + ',' + j + '] ' + value + ' ' + state[state.selectedSize][state.selectedCross].arr[i][j] + ' совпадает' );
                    }
                    if ( value === 0 || value === 2 ) {
                        myArrCellFalse++;
                        // console.log( '[' + i + ',' + j + '] ' + value + ' ' + state[state.selectedSize][state.selectedCross].arr[i][j] + ' ПУСТАЯ КЛЕТКА' );
                        // document.querySelector('h1').innerText = '-';
                    }
                    return true;
                // }
            });
            return true;
        });
        // console.log( 'true=' + myArrCellTrue + ' | false=' + myArrCellFalse );

        if ( myArrCellTrue===arrCellTrue && myArrCellFalse===arrCellFalse ) {
            // document.querySelector('h1').innerText = '+';
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

    }

    // check (e) {
    //     const {context} = this.props;
    //     const state = context.state;
    //     const setAppState = context.methods.setAppState;
    //     console.clear();
    //     // console.log( e.currentTarget );
    //     var rows = document.querySelectorAll('.cross__row');
    //     // console.log( rows );
    //     outer: for (var i = 0; i < rows.length; i++) {
    //         var cells = rows[i].querySelectorAll('.cross__cell');
    //         for (var j = 0; j < cells.length; j++) {
    //                 // console.log( cells[j] );
    //                 if ( parseInt(cells[j].getAttribute('data-type'), 0) === state.selectedCrossData[i][j] ) {
    //                     if ( cells[j].classList.contains('paint') ) {
    //                         // console.log( 'row ' + i + ' | cell ' + j + ' — ' + this.state.pic1.arr[i][j] + ' | ' + parseInt(cells[j].getAttribute('data-type'), 0) + ' = ура' );
    //                         setAppState({
    //                             result: true
    //                         });
    //                     }
    //                 } else {
    //                     // console.log( 'row ' + i + ' | cell ' + j + ' — ' + this.state.pic1.arr[i][j] + ' | ' + parseInt(cells[j].getAttribute('data-type'), 0) + ' = ура' );
    //                     setAppState({
    //                         result: false
    //                     });
    //                     break outer;
    //                 }
    //         }
    //     }
    //     document.querySelector('.grid__result').classList.add('active')
    //     setTimeout(
    //         function() {
    //             document.querySelector('.grid__result').classList.remove('active')
    //         }, 2000
    //     );
    // }

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
                                        data-type='0'
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
                <div className='grid__num-top'>
                    <NumTop context={context} />
                </div>
                <div className='grid__num-left'>
                    <NumLeft context={context} />
                </div>
                <div className='grid__content'>
                    <div className='cross'>
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
                                <button className='btn btn_paint' title='Закрасить ячейку' onClick={this.clickPaint}>Закрасить</button>
                                <button className='btn btn_blank' title='Пометить ячейку как пустую' onClick={this.clickBlank}>Крестик</button>
                                <button className='btn btn_delete' title='Очистить ячейку' onClick={this.clickDelete}>удалить</button>
                            </div>
                    }
                </div>

            </div>
        )
    }

    componentDidMount() {

        document.querySelectorAll('.cross__cell').forEach(item=>{
            item.addEventListener('mouseenter', () => {
                let row = item.parentNode.parentNode.getAttribute('data-index');
                let col = item.getAttribute('data-index');
                console.log(row + ' | ' + col);
                item.classList.add('hover');
            });
        })

        // document.querySelectorAll('.cross__cell')[0].addEventListener("click", handler);

    }

}
