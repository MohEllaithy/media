import { createSlice } from "@reduxjs/toolkit";
import { fetchUsers } from "../thunks/fetchUsers";

const usersSlice = createSlice({
    name: "users",
    initialState: {
        data: [],
        isLoading: false,
        error: null
    },
    extraReducers(builder){
        builder.addCase(fetchUsers.pending, (state, action) => {});
        builder.addCase(fetchUsers.fulfilled, (state, action) => {});
        builder.addCase(fetchUsers.rejected, (state, action) => {});
    }
});

export const {a,b} = usersSlice.actions;
export const usersReducer = usersSlice.reducer;
