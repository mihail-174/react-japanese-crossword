import React, { Component } from 'react';
import Cell from '../Cell';
import NumTop from '../NumTop';
import NumLeft from '../NumLeft';
import './Cross.css';

export default class Cross extends Component {

    constructor(props) {
        super(props);
        this.check = this.check.bind(this);
        this.clickCell = this.clickCell.bind(this);
        this.clickPaint = this.clickPaint.bind(this);
        this.clickBlank = this.clickBlank.bind(this);
        this.clickDelete = this.clickDelete.bind(this);
    }

    clickPaint(e) {
        const {context} = this.props;
        const state = context.state;
        const setAppState = context.methods.setAppState;
        setAppState({
            paint: true,
            blank: false,
            delete: false,
        });
    }

    clickBlank(e) {
        const {context} = this.props;
        const state = context.state;
        const setAppState = context.methods.setAppState;
        setAppState({
            paint: false,
            blank: true,
            delete: false,
        });
    }

    clickDelete(e) {
        const {context} = this.props;
        const state = context.state;
        const setAppState = context.methods.setAppState;
        setAppState({
            paint: false,
            blank: false,
            delete: true,
        });
    }

    clickCell(e) {
        const {context} = this.props;
        const state = context.state;
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
    }

    check (e) {
        const {context} = this.props;
        const state = context.state;
        const setAppState = context.methods.setAppState;

        console.clear();
        var result = false;
        // console.log( e.currentTarget );
        var rows = document.querySelectorAll('.cross__row');
        // console.log( rows );
        outer: for (var i = 0; i < rows.length; i++) {
            var cells = rows[i].querySelectorAll('.cross__cell');
            for (var j = 0; j < cells.length; j++) {
                    // console.log( cells[j] );
                    if ( parseInt(cells[j].getAttribute('data-type'), 0) === state.selectedCross.arr[i][j] ) {
                        if ( cells[j].classList.contains('paint') ) {
                            // console.log( 'row ' + i + ' | cell ' + j + ' — ' + this.state.pic1.arr[i][j] + ' | ' + parseInt(cells[j].getAttribute('data-type'), 0) + ' = ура' );
                            setAppState({
                                result: true
                            });
                        }
                    } else {
                        // console.log( 'row ' + i + ' | cell ' + j + ' — ' + this.state.pic1.arr[i][j] + ' | ' + parseInt(cells[j].getAttribute('data-type'), 0) + ' = ура' );
                        setAppState({
                            result: false
                        });
                        break outer;
                    }
            }
        }
        document.querySelector('.grid__result').classList.add('active')
        setTimeout(
            function() {
                document.querySelector('.grid__result').classList.remove('active')
            }, 2000
        );
    }

    render() {
        const {context} = this.props;
        const state = context.state;
        return (
            <div className="grid">
                <div className='grid__name'>{state.selectedCross.name}</div>
                <div className='grid__num-top'>
                    <NumTop context={context} />
                </div>
                <div className='grid__num-left'>
                    <NumLeft context={context} />
                </div>
                <div className='grid__content'>
                    <div className='cross'>
                        {
                            state.selectedCross.arr.map(function(row, i) {
                                return (
                                    <div className='cross__row' key={i} data-index={i}>
                                        <div className='cross__row-inner'>
                                            {
                                                row.map(function(cell, j) {
                                                    return (
                                                        <div onClick={this.clickCell} className='cross__cell' data-type='0' data-index={j} key={j}></div>
                                                    );
                                                }, this)
                                            }
                                        </div>
                                    </div>
                                );
                            }, this)
                        }
                    </div>
                    <div className='btns'>
                        <button className='btn btn_check' title='Проверить решение' onClick={this.check}>CHECK</button>
                        <button className='btn btn_paint' title='Закрасить ячейку' onClick={this.clickPaint}>Закрасить</button>
                        <button className='btn btn_blank' title='Пометить ячейку как пустую' onClick={this.clickBlank}>Крестик</button>
                        <button className='btn btn_delete' title='Очистить ячейку' onClick={this.clickDelete}>удалить</button>
                    </div>
                    <div className='grid__result'>
                        {
                            state.result
                            ?
                            'Отлично'
                            :
                            'Вы дно!'
                        }
                    </div>
                </div>
            </div>
        )
    }

}
