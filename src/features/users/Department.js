import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../api/index";


const INITIAL_STATE = {
    department: {},
    status: 'idle',
    error: null
}




const DepartmentSlice = createSlice({
    name: 'department',
    initialState: INITIAL_STATE,
    reducers: {

    },
    extraReducers(builders) {

    }
})