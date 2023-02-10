import {createSlice, current} from '@reduxjs/toolkit'

function importFilesCross(r) {
    return r.keys().map(r);
}

export const listSlice = createSlice({
    name: 'list',
    initialState: {
        current: [],
        all: [],
        small: [],
        medium: [],
        big: [],
    },
    reducers: {
        getAll: (state, action) => {
            state.all = importFilesCross( require.context('../../files', true, /\.json$/) );
            state.current = importFilesCross( require.context('../../files', true, /\.json$/) );
        },
        getSmall: (state, action) => {
            state.small = importFilesCross( require.context('../../files/small', false, /\.json$/) );
            state.current = importFilesCross( require.context('../../files/small', false, /\.json$/) );
        },
        getMedium: (state, action) => {
            state.medium = importFilesCross( require.context('../../files/medium', false, /\.json$/) );
            state.current = importFilesCross( require.context('../../files/medium', false, /\.json$/) );
        },
        getBig: (state, action) => {
            state.big = importFilesCross( require.context('../../files/big', false, /\.json$/) );
            state.current = importFilesCross( require.context('../../files/big', false, /\.json$/) );
        },
        setCurrent: (state, action) => {
            state.current = state[action.payload];
        },
    },
})

// Action creators are generated for each case reducer function
export const { getAll, getSmall, getMedium, getBig, setCurrent } = listSlice.actions

export default listSlice.reducer