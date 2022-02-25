import {createSlice} from "@reduxjs/toolkit";
import {RootState} from "../../store";

interface State {
    projectModalOpen: boolean
}

const initialState: State = {
    projectModalOpen: false
}

// redux + immer => 数据就不可变了
export const projectListSlice = createSlice({
    name: 'projectListSlice',
    initialState,
    reducers: {
        openProjectModal(state){
            state.projectModalOpen = true
        },
        closeProjectModal(state){
            state.projectModalOpen = false
        }
    }
})

export const projectListActions = projectListSlice.actions

export const selectProjectModalOpen = (state: RootState) => state.projectList