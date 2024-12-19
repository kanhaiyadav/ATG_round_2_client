import { createAsyncThunk } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";

export const createPost = createAsyncThunk(
    "post/createPost",
    async (data, { rejectWithValue }) => {
        try {
            const response = await fetch("http://localhost:3000/api/post/", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${data.token}`,
                },
                body: JSON.stringify(data.formData),
            });
            if (!response.ok) {
                return rejectWithValue(await response.json());
            }
            const result = await response.json();
            return result;
        } catch (error) {
            console.log(error);
            return error;
        }
    }
);

const initialState = {
    myPosts: [],
    otherPosts: [],
};

const postSlice = createSlice({
    name: "post",
    initialState,
    reducers: {
        addPost: (state, action) => {
            state.posts.push(action.payload);
        },
        removePost: (state, action) => {
            state.posts = state.posts.filter((post) => post._id !== action.payload);
        },
    },
    extraReducers: (builder) => {
        builder.addCase(createPost.fulfilled, (state, action) => {
            state.myPosts.push(action.payload.data.post);
        });
    },
});

export const { addPost, removePost } = postSlice.actions;
export default postSlice.reducer;

