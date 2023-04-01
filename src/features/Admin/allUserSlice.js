import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "../../api/index";
import { useCookies } from "react-cookie";


const INITIAL_STATE = {
    users: [],
    status: 'idle', // 'idle' | 'pending' | 'succeeded' | 'failed'
    error: null

}


export const fetchUser = createAsyncThunk('user/fetchUser', async (cookie) => {
    try {
        const response = await axios.get('http://localhost:4000/api/admin/getAllUser', {
            headers: {
                authorization: `Bearer ${cookie}`
            }
        })
        return { ...response }
    } catch (error) {
        return error.message
    }
})


const AllUsers = createSlice({
    name: 'allUser',
    initialState: INITIAL_STATE,
    reducers: {},
    extraReducers(builders) {
        builders
            .addCase(fetchUser.pending, (state, action) => {
                state.status = 'Loading'
                console.log('loading')
            })
            .addCase(fetchUser.fulfilled, (state, action) => {
                state.status = 'succeeded'
                console.log('success')
                const loadedUsers = action.payload.data.users
                state.users = loadedUsers;
            })
            .addCase(fetchUser.rejected, (state, payload) => {
                state.status = 'failed'
                state.error = 'action.error.message'
                console.log(action.error.message)
            })
    }
})


export const selectAllUser = (state) => state.users.users
export const selectAllUserStatus = (state) => state.users.status
export default AllUsers.reducer