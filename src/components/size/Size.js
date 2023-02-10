import React, { useState, useEffect } from 'react';
import { useStore, useSelector, useDispatch } from 'react-redux';

import './Size.scss';

export function Size() {
    const files = useSelector((state) => state.list.current);
    const dispatch = useDispatch();
    const store = useStore();

    const [active, setActive] = useState(false);

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
            <div data-name="all" className="size__item active" onClick={(e) => dispatch(setActive(e))}>
                <span className="size__name">Все</span>
                <span className="size__count" title="количество">({store.getState().list.all.length})</span>
            </div>
            <div data-name="small" className="size__item" onClick={(e) => dispatch(setActive(e))}>
                <span className="size__name">Маленькие</span>
                <span className="size__count" title="количество">({store.getState().list.small.length})</span>
            </div>
            <div data-name="medium" className="size__item" onClick={(e) => dispatch(setActive(e))}>
                <span className="size__name">Средние</span>
                <span className="size__count" title="количество">({store.getState().list.medium.length})</span>
            </div>
            <div data-name="big" className="size__item" onClick={(e) => dispatch(setActive(e))}>
                <span className="size__name">Большие</span>
                <span className="size__count" title="количество">({store.getState().list.big.length})</span>
            </div>
        </div>
    )
}
