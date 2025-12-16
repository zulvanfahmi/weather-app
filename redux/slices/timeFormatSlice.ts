import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const timeFormatSlice = createSlice({
    name: "timeFormat",
    initialState: {
        timeFormatGlobal: '24Hours' as '24Hours' | '12Hours',
    },
    reducers: {
        setTimeFormatGlobal(
            state, 
            action: PayloadAction<'24Hours' | '12Hours'>) {
            state.timeFormatGlobal = action.payload;
        },
    }
})

export const { setTimeFormatGlobal } = timeFormatSlice.actions;
export default timeFormatSlice.reducer;
