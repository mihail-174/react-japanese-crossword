import React, { useState, useEffect } from 'react';
import { /*useStore,*/ useSelector, useDispatch } from 'react-redux';

import { setCurrent } from './../list/listSlice';

import './Size.scss';

export function Size() {
    const state = useSelector((state) => state.list);
    const dispatch = useDispatch();
    // const store = useStore();

    const [active, setActive] = useState(false);

    function chooseSize(e, size) {
        dispatch(setCurrent(size));
        setActive(e);
    }

    useEffect(() => {
        if (active) {
            document.querySelectorAll('.size__item').forEach(item => {
                item.classList.remove('active');
            });
            active.target.parentElement.classList.add('active');
        }
    }, [active]);

    return (
        <div className="size">
            <div data-name="all" className="size__item active" onClick={(e) => chooseSize(e, 'all')}>
                <span className="size__name">Все</span>
                <span className="size__count" title="количество">({state.all.length})</span>
            </div>
            <div data-name="small" className="size__item" onClick={(e) => chooseSize(e, 'small')}>
                <span className="size__name">Маленькие</span>
                <span className="size__count" title="количество">({state.small.length})</span>
            </div>
            <div data-name="medium" className="size__item" onClick={(e) => chooseSize(e, 'medium')}>
                <span className="size__name">Средние</span>
                <span className="size__count" title="количество">({state.medium.length})</span>
            </div>
            <div data-name="big" className="size__item" onClick={(e) => chooseSize(e, 'big')}>
                <span className="size__name">Большие</span>
                <span className="size__count" title="количество">({state.big.length})</span>
            </div>
        </div>
    )
}
