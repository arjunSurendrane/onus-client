import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../api/index";


const INITIAL_STATE = {
    workspace: {},
    status: 'idle',
    error: null
}


export const registerWorkspace = createAsyncThunk('user/registerWorkspace', async ({ data, cookie }) => {
    try {
        console.log({ data, cookie })
        const response = await axios.post('/workspace/create', { name: data }, {
            headers: {
                authorization: `Bearer ${cookie}`
            }
        })
        console.log({ response })
        return { ...response }
    } catch (error) {
        return error.message;
    }

})




const WorkspaceSlice = createSlice({
    name: 'workspace',
    initialState: INITIAL_STATE,
    reducers: {
        createWorkspace(state, action) {
            console.log({ data: action.payload })
            state.workspace["name"] = action.payload;
        },
        updateDepartment(state, action) {
            state.workspace["departmentName"] = action.payload
        },
        updateProject(state, action) {
            state.workspace["projectName"] = action.payload
        }
    },
    extraReducers(builders) {
        builders.addCase(registerWorkspace.pending, (state, action) => {
            state.status = "loading"
            console.log('loading')
        })
        builders.addCase(registerWorkspace.fulfilled, (state, action) => {
            state.status = 'success'
            state.workspace = action.payload.data.data
        })
        builders.addCase(registerWorkspace.rejected, (state, action) => {
            state.status = 'failed'
            console.log('error')
            state.error = action.error.message
        })

    }

})



export const { createWorkspace, updateDepartment, updateProject } = WorkspaceSlice.actions
export const workspaceDate = (state) => state.workspace.workspace
export const fetchWorkspaceStatus = (state) => state.workspace.status
export default WorkspaceSlice.reducer