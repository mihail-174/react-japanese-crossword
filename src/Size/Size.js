import React, { Component } from 'react';
import './Size.css';

export default class Size extends Component {
    constructor(props) {
        super(props);
        this.click = this.click.bind(this);
    }

    click(e){
        const {context} = this.props;
        const state = context.state;
        const setAppState = context.methods.setAppState;
        setAppState({
            selectedSize: e.currentTarget.getAttribute('data-name'),
            selectedCross: null,
            numTop: null,
            numLeft: null
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
                <div key={i} data-name={item.systemName} className='size__item' onClick={newthis.click}>
                    {item.name}
                </div>
            )
        })
        return (
            <div className='size'>
                {list}
            </div>
        )
    }

    componentDidMount() {
        document.querySelectorAll('.size__item')[0].classList.add('active');
    }

}
