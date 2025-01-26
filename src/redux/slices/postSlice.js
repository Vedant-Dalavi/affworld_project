import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    allPost:[],
};

const postSlice = createSlice({

    name: "posts",
    initialState,
    reducers: {

        setPosts: (state, action) => {
            state.allPost = action.payload;
            // localStorage.setItem("allPosts", JSON.stringify(state.allPost));

        },
        newPost: (state, action) => {
            state.allPost.push(action.payload)
            // localStorage.setItem("allPosts", JSON.stringify(state.allPost));
        }

    }

})

export const { setPosts, newPost } = postSlice.actions;

export default postSlice.reducer;

