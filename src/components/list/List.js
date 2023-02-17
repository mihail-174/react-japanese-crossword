import React, { /*useState,*/ useEffect } from 'react';
import { /*useStore,*/ useSelector, useDispatch } from 'react-redux';

import { getAll, getSmall, getMedium, getBig } from './listSlice';

import './List.scss';

export function List() {
    const files = useSelector((state) => state.list.current);
    const dispatch = useDispatch();
    // const store = useStore();

    useEffect(() => {
        dispatch(getSmall());
        dispatch(getMedium());
        dispatch(getBig());
        dispatch(getAll());
        // setLoaded(true);
    }, [dispatch]);

    // const status = (() => {
    //     console.log('sssss')
    //     return <div className='status status_done'></div>
    //     return <div className='status status_not-resolved'></div>
    //     return <div className='status status_edit'></div>
    // });

    const list = files.map((item, i) => {
        if (item.type === 'small' && item.id === 0) {
            console.group(item.id + ' / ' + item.type)
            console.log('cross_' + item.type + '_id-' + item.id + '_done')
            console.log(JSON.parse(localStorage.getItem('cross_' + item.type + '_id-' + item.id + '_progress')))
            console.groupEnd()
        }
        return (
            <div key={i} data-id={item.id} data-type={item.type} className='list__item'>
                <div className="list__status status">
                    {/*{ status }*/}
                </div>
                <div className='list__info'>
                    <div className='list__name'>
                        {item.name}
                    </div>
                    <div className='list__size'>
                        {item.width}x{item.height}
                    </div>
                </div>
            </div>
        )
    });

    return (
        <div className='list'>
            { list }
        </div>
    )

}
