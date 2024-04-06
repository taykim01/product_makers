import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    questions: [],
}

export const finalQuestionsSlice: any = createSlice({
    name: 'finalQuestions',
    initialState,
    reducers: {
        applyInput: (state, action) => {
            state.questions = action.payload
        }
    }
})

export const { applyInput } = finalQuestionsSlice.actions
export default finalQuestionsSlice.reducer