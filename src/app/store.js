import { configureStore } from '@reduxjs/toolkit';
// import counterReducer from '../features/counter/counterSlice';
import listReducer from '../components/list/listSlice';

export default configureStore({
    reducer: {
        // counter: counterReducer,
        list: listReducer,
    },
})
