import React, { Component } from 'react';
import './Settings.css';
import '../Modal/Modal.css';

export default class Settings extends Component {

    constructor(props) {
        super(props);
        this.clickClose = this.clickClose.bind(this);
        this.clickGuideLines = this.clickGuideLines.bind(this);
        this.clickHideNames = this.clickHideNames.bind(this);
        // this.clickMarkerEmptyCells = this.clickMarkerEmptyCells.bind(this);
        this.clickQuickDraw = this.clickQuickDraw.bind(this);

        const {context} = this.props;
        const state = context.state;
        if ( localStorage.getItem('cross_setting_guide-lines') === null ) {
            localStorage.setItem('cross_setting_guide-lines', state.settingGuideLines );
        }
        if ( localStorage.getItem('cross_setting_quick-draw') === null ) {
            localStorage.setItem('cross_setting_quick-draw', state.settingQuickDraw );
        }
        if ( localStorage.getItem('cross_setting_hide-names') === null ) {
            localStorage.setItem('cross_setting_hide-names', state.settingHideNames );
        }
    }

    clickClose(e) {
        const {context} = this.props;
        const setAppState = context.methods.setAppState;
        setAppState({
            modal: false
        });
        this.refs.modal.classList.remove('active');
    }

    clickGuideLines(e) {
        const {context} = this.props;
        const setAppState = context.methods.setAppState;
        localStorage.setItem('cross_setting_guide-lines', e.currentTarget.checked );
        setAppState({
            settingGuideLines: e.currentTarget.checked
        });

        // НАПРАВЛЯЮЩИЕ ЛИНИИ
        function guideLinesMouseLeave() {
            document.querySelectorAll('.cross__cell').forEach(item=>{
                let rowId = item.parentNode.parentNode.getAttribute('data-index');
                let colId = item.getAttribute('data-index');
                document.querySelectorAll('.cross__row')[rowId].querySelectorAll('.cross__cell').forEach(colItem=>{
                    colItem.classList.remove('hover');
                });
                document.querySelectorAll('.cross__row').forEach((row, i)=>{
                    row.querySelectorAll('.cross__cell')[parseInt(colId)].classList.remove('hover');
                });
            });
        }

        if ( JSON.parse(localStorage.getItem('cross_setting_guide-lines')) ) {
            // console.log( 'ВКЛЮЧИЛИ НАПРАВЛЯЮЩИЕ' );
            guideLinesMouseLeave();
        } else {
            // console.log( 'ОТКЛЮЧИЛИ НАПРАВЛЯЮЩИЕ' );
            guideLinesMouseLeave();
        }

    }

    clickHideNames(e) {
        const {context} = this.props;
        // const state = context.state;
        const setAppState = context.methods.setAppState;
        localStorage.setItem('cross_setting_hide-names', e.currentTarget.checked );
        setAppState({
            settingHideNames: e.currentTarget.checked
        });
    }

    // clickMarkerEmptyCells(e) {
    //     const {context} = this.props;
    //     const state = context.state;
    //     const setAppState = context.methods.setAppState;
    //     setAppState({
    //         settingMarkerEmptyCells: !state.settingMarkerEmptyCells
    //     });
    // }

    clickQuickDraw(e) {
        const {context} = this.props;
        const setAppState = context.methods.setAppState;
        localStorage.setItem('cross_setting_quick-draw', e.currentTarget.checked );
        setAppState({
            settingQuickDraw: e.currentTarget.checked
        });
        if ( JSON.parse(localStorage.getItem('cross_setting_quick-draw')) ) {
            setAppState({
                btnDrawQuick: true,
                btnDraw: false,
                btnEmpty: false,
                btnClean: false
            });
        } else {
            setAppState({
                btnDrawQuick: false,
                btnDraw: false,
                btnEmpty: false,
                btnClean: false
            });
        }
    }

    render() {
        const {context} = this.props;
        const state = context.state;
        return (
            <div className={"modal" + (state.modal ? ' active':'')} ref='modal'>
                <div className="modal__overlay" onClick={this.clickClose}></div>
                <div className="modal__inner">
                    <div className="modal__close" onClick={this.clickClose}>Закрыть</div>
                    <div className="modal__hd">
                        <div className="modal__title">Настройки</div>
                    </div>
                    <div className="modal__content">

                        <div className="settings">
                            <div className="settings__item settings__guide-lines">
                                <label className='settings__label' htmlFor='guide-lines'>
                                    <input
                                        id='guide-lines'
                                        type='checkbox'
                                        onChange={this.clickGuideLines}
                                        defaultChecked={JSON.parse(localStorage.getItem('cross_setting_guide-lines'))}
                                        name=''
                                    />
                                    Показывать направляющие линии
                                </label>
                            </div>
                            <div className="settings__item settings__hide-names">
                                <label className='settings__label' htmlFor='hide-names'>
                                    <input
                                        id='hide-names'
                                        type='checkbox'
                                        onChange={this.clickHideNames}
                                        defaultChecked={JSON.parse(localStorage.getItem('cross_setting_hide-names'))}
                                        name=''
                                    />
                                    Скрыть названия
                                </label>
                            </div>
                            {/*
                                <div className="settings__item settings__marker-empty-cells">
                                <label className='settings__label' htmlFor='marker-empty-cells'>
                                    <input
                                        id='marker-empty-cells'
                                        type='checkbox'
                                        onChange={this.clickMarkerEmptyCells}
                                        defaultChecked={state.settingMarkerEmptyCells}
                                        name=''
                                    />
                                    Символ-маркер пустой ячейки
                                </label>
                            </div>
                            */}
                            <div className="settings__item settings__quick-draw">
                                <label className='settings__label' htmlFor='quick-draw'>
                                    <input
                                        id='quick-draw'
                                        type='checkbox'
                                        onChange={this.clickQuickDraw}
                                        defaultChecked={JSON.parse(localStorage.getItem('cross_setting_quick-draw'))}
                                        name=''
                                    />
                                    Разрешить быстрое рисование в ячейке
                                </label>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        )
    }

    componentDidMount() {}

    componentWillUnmount() {}

}
