import { createSlice } from "@reduxjs/toolkit";



const INITIAL_STATE = {
    projectID: localStorage.getItem('ProjectId') || "",
    members: []
}

const projectSlice = createSlice({
    name: 'Project',
    initialState: INITIAL_STATE,
    reducers: {
        createProjectId: (state, action) => {
            state.projectID = action.payload
            localStorage.setItem('ProjectId', action.payload)
        },
        addMembers: (state, action) => {
            state.members = [...action.payload]
            localStorage.setItem('Members', JSON.stringify({ ...action.payload }))
        }
    }
})

export const { createProjectId, addMembers } = projectSlice.actions;
export default projectSlice.reducer
export const fetchProductId = (state) => state.project.projectID
export const fetchProductMembers = (state) => state.project.members