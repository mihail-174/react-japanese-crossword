import React, { Component } from 'react';
import NumTop from '../Num/NumTop';
import NumLeft from '../Num/NumLeft';
import Cross from '../Cross/Cross';
import './Grid.css';
import '../Num/Num.css';

export default class Grid extends Component {

    constructor(props) {
        super(props);
        // this.clickDrawQuick = this.clickDrawQuick.bind(this);
        this.clickDraw = this.clickDraw.bind(this);
        this.clickEmpty = this.clickEmpty.bind(this);
        this.clickClean = this.clickClean.bind(this);
        this.clickSave = this.clickSave.bind(this);
    }

    // clickDrawQuick(e) {
    //     const {context} = this.props;
    //     const setAppState = context.methods.setAppState;
    //     setAppState({
    //         // btnDrawQuick: true,
    //         btnDraw: false,
    //         btnEmpty: false,
    //         btnClean: false,
    //     });
    // }
    clickDraw(e) {
        const {context} = this.props;
        const setAppState = context.methods.setAppState;
        setAppState({
            // btnDrawQuick: false,
            btnDraw: true,
            btnEmpty: false,
            btnClean: false,
        });
    }

    clickEmpty(e) {
        const {context} = this.props;
        const setAppState = context.methods.setAppState;
        setAppState({
            // btnDrawQuick: false,
            btnDraw: false,
            btnEmpty: true,
            btnClean: false,
        });
    }

    clickClean(e) {
        const {context} = this.props;
        const setAppState = context.methods.setAppState;
        setAppState({
            // btnDrawQuick: false,
            btnDraw: false,
            btnEmpty: false,
            btnClean: true,
        });
    }

    clickSave() {
        const {context} = this.props;
        const state = context.state;
        localStorage.setItem('cross_' + state.selectedType + '_id-' + state.selectedCross, JSON.stringify( state.selectedCrossData ) );
        localStorage.setItem('cross_' + state.selectedType + '_id-' + state.selectedCross + '_time', JSON.stringify( state.selectedCrossTime ) );
        // localStorage.setItem('cross_' + state.selectedSize + '_id-' + state.selectedCross, JSON.stringify( state.selectedCrossData ) );
        // localStorage.setItem('cross_' + state.selectedSize + '_id-' + state.selectedCross + '_time', JSON.stringify( state.selectedCrossTime ) );
    }

    render() {
        const {context} = this.props;
        const state = context.state;

        return (
            <div className="grid">
                <div className='grid__num-top'>
                    <NumTop context={context} />
                </div>
                <div className='grid__num-left'>
                    <NumLeft context={context} />
                </div>
                <div className='grid__content'>
                    <div className={'cross' + (localStorage.getItem('cross_' + state.selectedSize + '_id-' + state.selectedCross + '_done') ? ' cross_done':'')}>
                        <Cross context={context} />
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
                                <button className='btn btn_save' title='Сохранить изменения' onClick={this.clickSave}>Сохранить изменения</button>
                                {
                                    JSON.parse(localStorage.getItem('cross_setting_quick-draw'))
                                    &&
                                        <button className='btn btn_draw-quick active' title='Закрасить, пометить, удалить' onClick={this.clickDrawQuick}>Быстрое рисование</button>
                                }
                                {
                                    !JSON.parse(localStorage.getItem('cross_setting_quick-draw'))
                                    &&
                                        <div>
                                            <button className={'btn btn_draw' + (state.btnDraw?' active':'')} title='Закрасить клетку' onClick={this.clickDraw}>Закрасить клетку</button>
                                            <button className={'btn btn_empty' + (state.btnEmpty?' active':'')} title='Пометить клетку как пустую' onClick={this.clickEmpty}>Пометить клетку как пустую</button>
                                            <button className={'btn btn_clean' + (state.btnClean?' active':'')} title='Очистить клетку' onClick={this.clickClean}>Очистить клетку</button>
                                        </div>
                                }
                            </div>
                    }
                </div>

            </div>
        )
    }

}
