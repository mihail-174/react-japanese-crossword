import React, { Component } from 'react';
import './Settings.css';
import '../Modal/Modal.css';

export default class Settings extends Component {

    constructor(props) {
        super(props);
        this.clickClose = this.clickClose.bind(this);
        this.clickGuideLines = this.clickGuideLines.bind(this);
        this.clickHideNames = this.clickHideNames.bind(this);
        this.clickMarkerEmptyCells = this.clickMarkerEmptyCells.bind(this);
        this.clickQuickDraw = this.clickQuickDraw.bind(this);
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
        const state = context.state;
        const setAppState = context.methods.setAppState;
        setAppState({
            settingGuideLines: !state.settingGuideLines
        });

        // НАПРАВЛЯЮЩИЕ ЛИНИИ
        function guideLinesMouseEnter(cell) {
            // console.log("MOUSEENTER");
            let rowId = cell.parentNode.parentNode.getAttribute('data-index');
            let colId = cell.getAttribute('data-index');
            document.querySelectorAll('.cross__row')[rowId].querySelectorAll('.cross__cell').forEach(colItem=>{
                colItem.classList.add('hover');
            });
            document.querySelectorAll('.cross__row').forEach((row, i)=>{
                row.querySelectorAll('.cross__cell')[parseInt(colId)].classList.add('hover');
            });
        }
        function guideLinesMouseLeave(cell) {
            // console.log("MOUSELEAVE");
            let rowId = cell.parentNode.parentNode.getAttribute('data-index');
            let colId = cell.getAttribute('data-index');
            document.querySelectorAll('.cross__row')[rowId].querySelectorAll('.cross__cell').forEach(colItem=>{
                colItem.classList.remove('hover');
            });
            document.querySelectorAll('.cross__row').forEach((row, i)=>{
                row.querySelectorAll('.cross__cell')[parseInt(colId)].classList.remove('hover');
            });
        }

        document.querySelectorAll('.cross__cell').forEach(item=>{
            item.addEventListener('mouseenter', () => {
                if ( state.settingGuideLines ) {
                    guideLinesMouseLeave(item);
                    // console.log( 'БЫЛО ЕСТЬ' );
                } else {
                    guideLinesMouseEnter(item);
                    // console.log( 'БЫЛО НЕТ' );
                }
            });
            item.addEventListener('mouseleave', () => {
                if ( state.settingGuideLines ) {
                    // console.log( 'БЫЛО ЕСТЬ' );
                } else {
                    guideLinesMouseLeave(item);
                    // console.log( 'БЫЛО НЕТ' );
                }
            });
        });
        // КОНЕЦ

    }

    clickHideNames(e) {
        const {context} = this.props;
        const state = context.state;
        const setAppState = context.methods.setAppState;
        setAppState({
            settingHideNames: !state.settingHideNames
        });
    }

    clickMarkerEmptyCells(e) {
        const {context} = this.props;
        const state = context.state;
        const setAppState = context.methods.setAppState;
        setAppState({
            settingMarkerEmptyCells: !state.settingMarkerEmptyCells
        });
    }

    clickQuickDraw(e) {
        const {context} = this.props;
        const state = context.state;
        const setAppState = context.methods.setAppState;
        setAppState({
            settingQuickDraw: !state.settingQuickDraw
        });
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
                                        defaultChecked={state.settingGuideLines}
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
                                        defaultChecked={state.settingHideNames}
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
                                        defaultChecked={state.settingQuickDraw}
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
