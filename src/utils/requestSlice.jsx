import { createSlice } from '@reduxjs/toolkit';

const requestSlice = createSlice({
    name: "requests",
    initialState: null,
    reducers: {
        addRequests: (state, action) => action.payload,
        // Remove request from redux state when request is accepted or rejected so that it doesn't show up anymore
        removeRequest: (state, action) => {
            const newArray = state.filter((item) => item._id !== action.payload);
            return newArray;
        }
    },
});

export const { addRequests, removeRequest } = requestSlice.actions;
export default requestSlice.reducer; 