import React, { Component } from 'react';
import './Size.css';

export default class Size extends Component {
    constructor(props) {
        super(props);
        this.click = this.click.bind(this);
    }

    click(e){
        const {context} = this.props;
        const setAppState = context.methods.setAppState;
        setAppState({
            selectedSize: e.currentTarget.getAttribute('data-name'),
            selectedCross: null,
            selectedCrossName: null,
            selectedCrossData: null,
            numTop: [],
            numLeft: []
        });
        document.querySelectorAll('.size__item').forEach(function(item, i) {
            item.classList.remove('active')
        });
        e.currentTarget.classList.add('active');
    }

    render() {
        const {context} = this.props;
        const state = context.state;
        const newthis = this;
        const list = state.size.map(function(item, i) {
            return (
                <div
                    key={i}
                    data-name={item.systemName}
                    className={
                        state.selectedSize === item.systemName ? 'size__item active' : 'size__item'
                    }
                    onClick={newthis.click}
                >
                    <span className='size__name'>{item.name}</span>
                    <span className='size__count' title='количество'>({state[item.systemName].length})</span>
                </div>
            )
        })
        return (
            <div className='size'>
                {list}
            </div>
        )
    }

}
