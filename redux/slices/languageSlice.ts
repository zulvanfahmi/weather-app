import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const languageSlice = createSlice({
    name: "language",
    initialState: {
        languageGlobal: 'English' as 'English' | 'Indonesia',
        APILanguageCode: 'en' as 'en' | 'id',
    },
    reducers: {
        setLanguageGlobal(
            state, 
            action: PayloadAction<'English' | 'Indonesia'>) {
            state.languageGlobal = action.payload;

            if (action.payload === 'English') {
                state.APILanguageCode = 'en'
            } else {
                state.APILanguageCode = 'id'
            }
        },
    }
})

export const { setLanguageGlobal } = languageSlice.actions;
export default languageSlice.reducer;
