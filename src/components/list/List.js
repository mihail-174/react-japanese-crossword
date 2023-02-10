import React, { useState, useEffect } from 'react';
import { useStore, useSelector, useDispatch } from 'react-redux';

import { getAll, getSmall, getMedium, getBig, setCurrent } from './listSlice';

import './Grid.scss';
import './List.scss';

export function List() {
    const files = useSelector((state) => state.list.current);
    const dispatch = useDispatch();
    const store = useStore();

    useEffect(() => {
        dispatch(getSmall());
        dispatch(getMedium());
        dispatch(getBig());
        dispatch(getAll());
    }, [dispatch]);


    const list = files.map((item, i) => {
        return (
            <div key={i} className='list__item'>
                <div className='list__info'>
                    <div className='list__name'>
                        {item.name}
                    </div>
                    <div className='list__size'>{item.width}x{item.height}</div>
                </div>
            </div>
            )
    });

    return (
        <div className='list'>
            {/*<div className="size">*/}
            {/*    <div data-name="all" className="size__item active" onClick={(e) => dispatch(setCurrent('all'), setActive(e))}>*/}
            {/*        <span className="size__name">Все</span>*/}
            {/*        <span className="size__count" title="количество">({store.getState().list.all.length})</span>*/}
            {/*    </div>*/}
            {/*    <div data-name="small" className="size__item" onClick={(e) => dispatch(setCurrent('small'), setActive(e))}>*/}
            {/*        <span className="size__name">Маленькие</span>*/}
            {/*        <span className="size__count" title="количество">({store.getState().list.small.length})</span>*/}
            {/*    </div>*/}
            {/*    <div data-name="medium" className="size__item" onClick={(e) => dispatch(setCurrent('medium'), setActive(e))}>*/}
            {/*        <span className="size__name">Средние</span>*/}
            {/*        <span className="size__count" title="количество">({store.getState().list.medium.length})</span>*/}
            {/*    </div>*/}
            {/*    <div data-name="big" className="size__item" onClick={(e) => dispatch(setCurrent('big'), setActive(e))}>*/}
            {/*        <span className="size__name">Большие</span>*/}
            {/*        <span className="size__count" title="количество">({store.getState().list.big.length})</span>*/}
            {/*    </div>*/}
            {/*</div>*/}
            { list }
        </div>
    )
}
