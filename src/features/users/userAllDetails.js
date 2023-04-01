import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../api/index";



const fetchDetails = createAsyncThunk('/user/fetchDetails', async ({ cookie }) => {
    try {
        const userDetails = axios.get('/userDetails', {
            headers: {
                authorization: `Bearer ${cookie}`
            }
        })
        return userDetails.data.data
    } catch (error) {
        return error.response.message
    }
})


const INITIAL_STATE = {
    userDetails: {},
    status: 'idle',
    error: null
}

const userDetailSlice = createSlice({
    name: 'UserDetails',
    initialState: INITIAL_STATE,
    reducers: {
        createWorkspace(state, action) {
            console.log({ data: action.payload })
            state.userDetails = action.payload;
        },
    },
    extraReducers(builders) {
        builders.addCase(fetchDetails.pending, (state, action) => {
            state.status = 'Loading'
        })
        builders.addCase(fetchDetails.fulfilled, (state, action) => {
            state.status = 'success',
                state.userDetails = action.payload.data.data
        })
        builders.addCase(fetchDetails.rejected, (state, action) => {
            state.status = 'failed'
            state.error = action.error.message
        })

    }
})

export const { createWorkspace } = userDetailSlice.actions
export const userDetailsStatus = (state) => { state.UserDetails.status }
export const userDetailsData = (state) => { state.UserDetails.userDetails }
export default userDetailSlice.reducer;